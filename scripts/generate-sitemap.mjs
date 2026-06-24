#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from static routes and content data.
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE_URL = "https://pri-global.vercel.app";
const TODAY = new Date().toISOString().slice(0, 10);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function extractSlugs(filePath) {
  const content = readFileSync(join(root, filePath), "utf8");
  return [...content.matchAll(/"slug":\s*"([^"]+)"/g)].map((match) => match[1]);
}

function extractDates(filePath) {
  const content = readFileSync(join(root, filePath), "utf8");
  const entries = [...content.matchAll(/"slug":\s*"([^"]+)"[\s\S]*?"date":\s*"([^"]+)"/g)];
  return Object.fromEntries(entries.map(([, slug, date]) => [slug, date.slice(0, 10)]));
}

const staticRoutes = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/services", priority: "0.9", changefreq: "monthly" },
  { loc: "/talent-solutions", priority: "0.9", changefreq: "monthly" },
  { loc: "/ai-innovation", priority: "0.9", changefreq: "monthly" },
  { loc: "/ai-services", priority: "0.9", changefreq: "monthly" },
  { loc: "/industries", priority: "0.8", changefreq: "monthly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact", priority: "0.7", changefreq: "monthly" },
  { loc: "/why-pri-global", priority: "0.8", changefreq: "monthly" },
  { loc: "/resources", priority: "0.8", changefreq: "weekly" },
  { loc: "/careers", priority: "0.7", changefreq: "weekly" },
  { loc: "/careers/mobile-app", priority: "0.7", changefreq: "monthly" },
  { loc: "/candidate-jobs", priority: "0.7", changefreq: "daily" },
  { loc: "/job-seeker-faq", priority: "0.7", changefreq: "monthly" },
  { loc: "/working-at-pri", priority: "0.7", changefreq: "monthly" },
  { loc: "/get-pricing", priority: "0.8", changefreq: "monthly" },
  { loc: "/roi-calculator", priority: "0.7", changefreq: "monthly" },
  { loc: "/quiz", priority: "0.6", changefreq: "monthly" },
  { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
];

function urlEntry({ loc, priority, changefreq, lastmod = TODAY }) {
  return `  <url><loc>${BASE_URL}${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

const newsSlugs = [
  ...new Set([
    ...extractSlugs("src/data/news.js"),
    ...extractSlugs("src/data/newsBlog.js"),
  ]),
];
const newsDates = {
  ...extractDates("src/data/news.js"),
  ...extractDates("src/data/newsBlog.js"),
};

const caseStudySlugs = [
  ...new Set([
    ...extractSlugs("src/data/caseStudies.js"),
    ...extractSlugs("src/data/caseStudiesMore.js"),
  ]),
];
const caseStudyDates = {
  ...extractDates("src/data/caseStudies.js"),
  ...extractDates("src/data/caseStudiesMore.js"),
};

const newsUrls = newsSlugs.map((slug) =>
  urlEntry({
    loc: `/resources/${slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: newsDates[slug] || TODAY,
  })
);

const caseStudyUrls = caseStudySlugs.map((slug) =>
  urlEntry({
    loc: `/case-studies/${slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: caseStudyDates[slug] || TODAY,
  })
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(urlEntry).join("\n")}
${newsUrls.join("\n")}
${caseStudyUrls.join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml, "utf8");
console.log(
  `Wrote ${staticRoutes.length + newsUrls.length + caseStudyUrls.length} URLs to public/sitemap.xml`
);
