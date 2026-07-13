/**
 * Build-time prerendering for SEO.
 *
 * After `vite build`, this script serves `dist/`, loads every public route
 * from the sitemap in headless Chrome, and writes the fully rendered HTML to
 * `dist/<route>/index.html`. Crawlers (Google, Bing, AI answer engines) then
 * receive real content and meta tags instead of an empty SPA shell.
 *
 * The untouched SPA shell is kept as `dist/spa.html` — vercel.json rewrites
 * unknown routes there so they never serve prerendered homepage markup.
 *
 * Fail-soft: any error skips prerendering and exits 0 so a deploy is never
 * blocked; the site then simply ships as a plain SPA.
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4173;
const CONCURRENCY = 4;
const PAGE_TIMEOUT_MS = 30000;

let SHELL_DESCRIPTION = "";

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function sitemapRoutes() {
  const xml = readFileSync(join(DIST, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

function serveDist() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = join(DIST, urlPath);
    if (!extname(file)) file = join(DIST, "index.html");
    try {
      const body = readFileSync(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function launchBrowser() {
  const puppeteer = (await import("puppeteer-core")).default;
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  for (const executablePath of candidates) {
    if (existsSync(executablePath)) {
      return puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
    }
  }
  // CI / Vercel build: use the bundled serverless Chromium.
  const chromium = (await import("@sparticuz/chromium")).default;
  return puppeteer.launch({
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: true,
  });
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });
    // Mark prerender context so client code can skip pop-ups if it wants to.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle2",
      timeout: PAGE_TIMEOUT_MS,
    });
    await page.waitForSelector("#root > *", { timeout: PAGE_TIMEOUT_MS });
    // Let helmet flush meta tags and lazy sections settle.
    await new Promise((r) => setTimeout(r, 500));
    const html = await page.evaluate((shellDescription) => {
      // Helmet adds its own title/description next to the static fallbacks
      // from index.html — collapse each to exactly one tag for crawlers.
      const effectiveTitle = document.title;
      document.head.querySelectorAll("title").forEach((el) => el.remove());
      const title = document.createElement("title");
      title.textContent = effectiveTitle;
      document.head.prepend(title);

      // Route transitions can leave stale helmet tags behind (default SEO from
      // the layout, then the lazy-loaded page's own). The most recently added
      // tag per key is the current page's — keep only that one. The static
      // shell description is dropped first so it never wins.
      document.head
        .querySelectorAll('meta[name="description"]')
        .forEach((el) => el.content === shellDescription && el.remove());
      const byKey = new Map();
      const managed = document.head.querySelectorAll(
        'meta[name], meta[property], link[rel="canonical"]'
      );
      managed.forEach((el) => {
        const key =
          el.tagName === "LINK"
            ? "canonical"
            : `${el.getAttribute("name") || el.getAttribute("property")}`;
        if (key === "viewport" || key === "theme-color" || key === "charset") return;
        if (byKey.has(key)) byKey.get(key).remove();
        byKey.set(key, el);
      });
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    }, SHELL_DESCRIPTION);
    const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    console.log(`  ✓ ${route}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = sitemapRoutes();
  const shell = readFileSync(join(DIST, "index.html"), "utf8");
  if (shell.includes("data-rh")) {
    throw new Error("dist/index.html is already prerendered — run a fresh `vite build` first");
  }
  SHELL_DESCRIPTION = shell.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  // Preserve the untouched SPA shell for unknown routes (vercel.json rewrite).
  copyFileSync(join(DIST, "index.html"), join(DIST, "spa.html"));

  const server = await serveDist();
  const browser = await launchBrowser();
  console.log(`Prerendering ${routes.length} routes…`);

  const queue = [...routes];
  const failures = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift();
        try {
          await renderRoute(browser, route);
        } catch (err) {
          failures.push(route);
          console.warn(`  ✗ ${route}: ${err.message}`);
        }
      }
    })
  );

  await browser.close();
  server.close();

  if (failures.length) console.warn(`Prerender finished with ${failures.length} failed route(s).`);
  else console.log("Prerender complete.");
}

main().catch((err) => {
  console.warn(`[prerender] Skipped — ${err.message}. Site ships as plain SPA.`);
  process.exit(0);
});
