import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SLUGS = [
  "application-support-everything-you-need-to-know",
  "how-application-and-maintenance-support-can-help-your-company-through-the-recession",
  "3-ways-to-simplify-application-maintenance",
  "what-is-the-real-roi-from-software-development",
  "do-core-values-really-matter",
  "what-is-the-best-approach-to-creating-an-enterprise-data-model",
  "5-benefits-no-code-app-builder",
  "mobile-app-development-coding",
  "why-is-systems-integration-a-competitive-weapon",
  "picking-the-right-software-development-technology-partner",
  "delivering-on-speed-value-and-quality-2",
];

const CATEGORY_MAP = {
  "Application Maintenance": { category: "Insights", tag: "APP MAINTENANCE" },
  "Mobile App Development": { category: "Insights", tag: "MOBILE APPS" },
  Uncategorized: { category: "Insights", tag: "INSIGHTS" },
};

function decodeHtml(s) {
  return s
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8221;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"');
}

function stripTags(s) {
  return decodeHtml(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function htmlToMarkdown(html) {
  let h = html;
  h = h.replace(/<h[1-6][^>]*>/gi, "\n\n**");
  h = h.replace(/<\/h[1-6]>/gi, "**\n\n");
  h = h.replace(/<strong[^>]*>/gi, "**");
  h = h.replace(/<\/strong>/gi, "**");
  h = h.replace(/<em[^>]*>/gi, "*");
  h = h.replace(/<\/em>/gi, "*");
  h = h.replace(/<li[^>]*>/gi, "\n- ");
  h = h.replace(/<\/li>/gi, "");
  h = h.replace(/<p[^>]*>/gi, "\n\n");
  h = h.replace(/<\/p>/gi, "");
  h = h.replace(/<br\s*\/?>/gi, "\n");
  h = h.replace(/<[^>]+>/g, "");
  h = decodeHtml(h);
  h = h.replace(/\*{3,}/g, "**");
  h = h.replace(/\n{3,}/g, "\n\n");
  return h.trim();
}

function cleanBody(body) {
  let b = body.trim();
  const markers = [
    /Design by Black Raven/i,
    /Copyright © 2025/i,
    /Interested in more information/i,
    /Previous Post/i,
    /Recent Posts/i,
    /About PRI/i,
    /Leading the way with technology and innovation/i,
    /et_pb_post_content/i,
  ];
  for (const marker of markers) {
    const idx = b.search(marker);
    if (idx > 80) {
      b = b.slice(0, idx).trim();
      break;
    }
  }
  return b.replace(/\t+/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

function extractFromPostContent(html) {
  const start = html.indexOf("et_pb_post_content");
  if (start < 0) return "";
  const endMarkers = ["Previous Post", "Next Post", "Let's start growing your business"];
  let end = html.length;
  for (const marker of endMarkers) {
    const idx = html.indexOf(marker, start + 100);
    if (idx > start && idx < end) end = idx;
  }
  const chunk = html.slice(start, end);
  const parts = [];
  for (const m of chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = stripTags(m[1]);
    if (t.length > 20) parts.push(m[1]);
  }
  for (const m of chunk.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    parts.push(`<li>${m[1]}</li>`);
  }
  return cleanBody(htmlToMarkdown(parts.join("\n\n")));
}

function extractPostContent(html) {
  const postStart = html.indexOf('class="et-l et-l--post"');
  if (postStart >= 0) {
    const chunk = html.slice(postStart, postStart + 80000);
    const blocks = [...chunk.matchAll(/class="et_pb_text_inner">([\s\S]*?)<\/div>/g)].map(
      (m) => m[1]
    );
    const articleBlocks = blocks.filter(
      (b) =>
        b.length > 200 &&
        !/Recent Posts|Leading the way with technology|sidebar/i.test(b)
    );
    if (articleBlocks.length) {
      return cleanBody(articleBlocks.map(htmlToMarkdown).join("\n\n"));
    }
  }

  return extractFromPostContent(html);
}

async function fetchPostMeta(slug) {
  const res = await fetch(`https://priglobal.com/wp-json/wp/v2/posts?slug=${slug}`);
  const data = await res.json();
  if (!data.length) throw new Error(`Missing post: ${slug}`);
  const post = data[0];

  let wpCategory = "Uncategorized";
  if (post.categories?.length) {
    const catRes = await fetch(
      `https://priglobal.com/wp-json/wp/v2/categories/${post.categories[0]}`
    );
    const cat = await catRes.json();
    wpCategory = cat.name;
  }

  const pageRes = await fetch(`https://priglobal.com/${slug}/`);
  const html = await pageRes.text();
  const body = extractPostContent(html);
  const mapped = CATEGORY_MAP[wpCategory] || CATEGORY_MAP.Uncategorized;

  return {
    id: slug,
    slug,
    title: stripTags(post.title.rendered),
    date: post.date.slice(0, 10),
    category: mapped.category,
    tag: mapped.tag,
    excerpt: stripTags(post.excerpt.rendered).replace(/\[\s*&hellip;\s*\]/gi, "…"),
    body,
    image: post.featured_media ? null : null,
    posterImage: null,
    featured: false,
    link: null,
    wpCategory,
  };
}

const items = [];
for (const slug of SLUGS) {
  const item = await fetchPostMeta(slug);
  console.log(`OK ${slug} (${item.body.length} chars)`);
  items.push(item);
}

writeFileSync(join(ROOT, "scripts/news-scraped.json"), JSON.stringify(items, null, 2));

const js = `// Auto-generated from priglobal.com/news-and-blog — re-run scripts/scrape-news.mjs\nexport const newsBlogItems = ${JSON.stringify(
  items.map(({ wpCategory, ...rest }) => rest),
  null,
  2
)};\n`;

writeFileSync(join(ROOT, "src/data/newsBlog.js"), js);
console.log(`Wrote ${items.length} articles to src/data/newsBlog.js`);
