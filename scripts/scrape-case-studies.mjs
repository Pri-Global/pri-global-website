import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SLUGS = [
  "financial-technology",
  "healthcare-fortune-500",
  "pharmaceutical-fortune-1000",
  "pri-global-transforms-data-integrity-for-leading-financial-services-client-with-next-gen-technologies",
  "fintechs-journey-with-pri-global",
  "empowering-college-students-for-cybersecurity-excellence",
  "application-functionality-enhancements",
  "successful-peoplesoft-implementation",
  "streamlined-migration-cloud-integration",
  "streamlines-operations-for-financial-services",
  "streamlining-it-solutions-with-bpm-best-practices",
  "revolutionizing-healthcare-with-robust-prpc-application",
  "it-solutions-transforming-the-future-of-healthcare",
  "transform-data-integrity",
];

const IMAGE_MAP = {
  "financial-technology": "/case-studies/case-study-1.png",
  "healthcare-fortune-500": "/case-studies/case-study-2.png",
  "pharmaceutical-fortune-1000": "/case-studies/case-study-3.png",
  "pri-global-transforms-data-integrity-for-leading-financial-services-client-with-next-gen-technologies":
    "/case-studies/case-study-4.png",
  "fintechs-journey-with-pri-global": "/case-studies/case-study-5.png",
  "empowering-college-students-for-cybersecurity-excellence": "/case-studies/case-study-6.png",
  "application-functionality-enhancements": "/case-studies/case-study-7.png",
  "successful-peoplesoft-implementation": "/case-studies/case-study-8.png",
  "streamlined-migration-cloud-integration": "/case-studies/case-study-9.png",
  "streamlines-operations-for-financial-services": "/case-studies/case-study-rw.png",
  "streamlining-it-solutions-with-bpm-best-practices": "/case-studies/case-study-1.png",
  "revolutionizing-healthcare-with-robust-prpc-application": "/case-studies/case-study-2.png",
  "it-solutions-transforming-the-future-of-healthcare": "/case-studies/case-study-3.png",
  "transform-data-integrity": "/case-studies/case-study-4.png",
};

function decodeHtml(s) {
  return s
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8221;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const FOOTER_HEADINGS = new Set([
  "ABOUT US",
  "INDUSTRIES",
  "SOLUTIONS",
  "Core Partners",
  "United States",
  "Philippines",
  "India",
  "Canada",
]);

function parsePage(html, slug) {
  const titleMatch =
    html.match(/<h1[^>]*class="entry-title"[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, "")) : slug;

  let content = html;
  const cut = html.search(/Let(?:&#8217;|')s start growing your business/i);
  if (cut > 0) content = html.slice(0, cut);

  const contentMatch = content.match(
    /<div class="et_pb_section[^"]*et_section_regular[^"]*"[^>]*>([\s\S]*)$/i
  );
  content = contentMatch ? contentMatch[1] : content;

  const sections = [];
  const h4Regex = /<h4[^>]*>([\s\S]*?)<\/h4>/gi;
  const parts = content.split(h4Regex);
  // parts[0] is before first h4, then alternating heading/content

  if (parts.length > 1) {
    for (let i = 1; i < parts.length; i += 2) {
      const heading = decodeHtml(parts[i].replace(/<[^>]+>/g, ""));
      const body = parts[i + 1] || "";
      if (!heading || heading === "Contact Us" || FOOTER_HEADINGS.has(heading)) continue;

      const paragraphs = [];
      const list = [];
      const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let pm;
      while ((pm = pRegex.exec(body)) !== null) {
        const text = decodeHtml(pm[1].replace(/<[^>]+>/g, ""));
        if (
          text &&
          !/Let's start growing|Schedule an introductory|Design by Black Raven|Copyright ©/i.test(text)
        ) {
          paragraphs.push(text);
        }
      }
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let lm;
      while ((lm = liRegex.exec(body)) !== null) {
        const text = decodeHtml(lm[1].replace(/<[^>]+>/g, ""));
        if (text && text !== "Contact Us") list.push(text);
      }

      const section = { heading };
      if (paragraphs.length) section.paragraphs = paragraphs;
      if (list.length) section.list = list;
      if (paragraphs.length || list.length) sections.push(section);
    }
  }

  return { title, sections };
}

async function main() {
  const results = [];
  for (const slug of SLUGS) {
    const url = `https://priglobal.com/success-stories/${slug}/`;
    const res = await fetch(url);
    const html = await res.text();
    const parsed = parsePage(html, slug);
    results.push({ slug, imageUrl: IMAGE_MAP[slug], ...parsed });
    console.log(`OK ${slug}: ${parsed.sections.length} sections`);
  }
  writeFileSync(join(ROOT, "scripts/case-studies-scraped.json"), JSON.stringify(results, null, 2));
}

main().catch(console.error);
