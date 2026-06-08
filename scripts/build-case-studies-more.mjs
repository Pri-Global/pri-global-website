import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scraped = JSON.parse(readFileSync(join(__dirname, "case-studies-scraped.json"), "utf8"));

const META = {
  "financial-technology": {
    title: "We Enabled Transactions on Billions of Accounts for a Leading Fintech Company",
    industry: "Financial Services",
    industryIcon: "Landmark",
    date: "2023-12-30",
    challenge:
      "A leading fintech needed to enhance its payment platform, expand into new geographies, and build cloud-ready applications to keep pace with business demand.",
    solution:
      "PRI onboarded a full development team, delivered cloud-ready components, integrated with client CI/CD pipelines, and provided ongoing architecture and agile delivery leadership.",
    results: [
      { metric: "Billions", label: "Accounts enabled for secure payments" },
      { metric: "Real-time", label: "Near-instant fund transfers globally" },
      { metric: "Global", label: "Rollout across new geographic areas" },
      { metric: "Cloud", label: "Refactored cloud-ready applications" },
    ],
    tags: ["Fintech", "Cloud", "Payments", "Agile Delivery"],
  },
  "healthcare-fortune-500": {
    title: "We Developed a Managed Care Platform for a Fortune 500 Healthcare Company",
    industry: "Healthcare",
    industryIcon: "HeartPulse",
    date: "2023-12-31",
    challenge:
      "Complex insurance and claims data sharing between healthcare organizations was hindering patient experience, visibility, and outcomes.",
    solution:
      "PRI built MuleSoft ESB solutions for enterprise workflows and external service integrations including USPS, CAQH, and NPPES.",
    results: [
      { metric: "Faster", label: "Development & operational productivity" },
      { metric: "Lower", label: "IT costs across the enterprise" },
      { metric: "Unified", label: "Compatibility enterprise-wide" },
      { metric: "Scalable", label: "Flexible, loosely coupled architecture" },
    ],
    tags: ["Healthcare", "MuleSoft", "ESB", "Integration"],
  },
  "pharmaceutical-fortune-1000": {
    title: "PRI Global Transforms Pharmaceutical Patient Care with Enhanced Medication Management Mobile App",
    industry: "Healthcare",
    industryIcon: "Pill",
    date: "2023-12-31",
    challenge:
      "Patients lacked an efficient mobile system to manage medications, access information on the go, and communicate with healthcare providers.",
    solution:
      "PRI enhanced the client's mobile app with reminders, tracking, comprehensive drug information, and a secure patient-provider messaging platform.",
    results: [
      { metric: "Higher", label: "Medication adherence rates" },
      { metric: "Empowered", label: "Patients managing their own health" },
      { metric: "Streamlined", label: "Patient-provider communication" },
      { metric: "Scalable", label: "Platform built for future growth" },
    ],
    tags: ["Pharma", "Mobile App", "Patient Care", "Healthcare"],
  },
  "pri-global-transforms-data-integrity-for-leading-financial-services-client-with-next-gen-technologies": {
    title:
      "PRI Global Transforms Data Integrity for Leading Financial Services Client with Next-Gen Technologies",
    industry: "Financial Services",
    industryIcon: "Landmark",
    date: "2024-01-04",
    challenge:
      "Outdated, fragmented systems couldn't support real-time transaction monitoring, authorization, or clearing and debit processes at scale.",
    solution:
      "PRI implemented next-gen data integrity technologies including real-time monitoring, automated authorization, and advanced clearing and debit systems.",
    results: [
      { metric: "Real-time", label: "Transaction monitoring & anomaly detection" },
      { metric: "Automated", label: "Authorization processes" },
      { metric: "Accurate", label: "Clearing & debit operations" },
      { metric: "Compliant", label: "Regulatory adherence & auditability" },
    ],
    tags: ["Data Integrity", "Financial Services", "Automation", "Compliance"],
  },
  "fintechs-journey-with-pri-global": {
    title: "Transforming Data Integration and Transformation: A Fintech's Journey with PRI Global",
    industry: "Financial Services",
    industryIcon: "Database",
    date: "2023-12-31",
    challenge:
      "An outdated Enterprise Warehouse ETL system caused slow processing, frequent errors, and limited scalability for a leading fintech.",
    solution:
      "PRI evaluated five market-leading ETL tools, ran lab tests, recommended the best fit, and led implementation, migration, and team training.",
    results: [
      { metric: "Faster", label: "Data processing & insights" },
      { metric: "Accurate", label: "Reliable analytics & reporting" },
      { metric: "Scalable", label: "Growing data volumes supported" },
      { metric: "Lower", label: "Maintenance & operational costs" },
    ],
    tags: ["ETL", "Data Integration", "Fintech", "Modernization"],
  },
  "empowering-college-students-for-cybersecurity-excellence": {
    title: "PRI Global: Empowering Community College Students for Cybersecurity Excellence",
    industry: "Education & Cybersecurity",
    industryIcon: "Shield",
    date: "2023-12-31",
    challenge:
      "Community college students lacked hands-on industry experience and pathways into cybersecurity careers.",
    solution:
      "PRI ran a four-week cybersecurity boot camp with mentorship, hands-on projects, and part-time job offers for top performers.",
    results: [
      { metric: "20", label: "Students trained in cybersecurity" },
      { metric: "10", label: "Part-time positions offered" },
      { metric: "4 weeks", label: "Intensive boot camp program" },
      { metric: "Industry", label: "Recognized talent pipeline" },
    ],
    tags: ["Cybersecurity", "Training", "Talent Development", "Community"],
  },
  "application-functionality-enhancements": {
    title: "Application Functionality Enhancements for Specialty Medication Management",
    industry: "Healthcare",
    industryIcon: "Pill",
    date: "2023-12-31",
    challenge:
      "Patients with acute specialty medication needs required a mobile platform with richer functionality than existing pharmacy solutions.",
    solution:
      "PRI enhanced the platform with order tracking, refills, dosage reminders, and direct customer service access via mobile app.",
    results: [
      { metric: "Mobile", label: "Self-service medication management" },
      { metric: "Track", label: "Orders & shipments in real time" },
      { metric: "Reminders", label: "Dosage alerts & refill support" },
      { metric: "Support", label: "Direct customer service access" },
    ],
    tags: ["Mobile App", "Pharma", "Patient Experience", "Healthcare"],
  },
  "successful-peoplesoft-implementation": {
    title: "Transforming Retail Operations: PRI Global's Successful Peoplesoft Implementation",
    industry: "Retail",
    industryIcon: "ShoppingBag",
    date: "2023-12-31",
    challenge:
      "Fragmented procurement, poor supplier management, and limited supply chain traceability across a multi-region retail network.",
    solution:
      "PRI implemented Peoplesoft eSupplier, eProcurement, and Purchasing modules with Trace Gain integration and full data migration.",
    results: [
      { metric: "Unified", label: "Supplier management & procurement" },
      { metric: "Real-time", label: "Inventory visibility" },
      { metric: "Traceable", label: "End-to-end supply chain" },
      { metric: "Lower", label: "Operational costs & manual errors" },
    ],
    tags: ["Peoplesoft", "ERP", "Retail", "Supply Chain"],
  },
  "streamlined-migration-cloud-integration": {
    title: "Transforming Healthcare: Streamlined Migration and Cloud Integration",
    industry: "Healthcare",
    industryIcon: "Cloud",
    date: "2023-12-31",
    challenge:
      "A healthcare organization on end-of-life Windows 7 needed a secure Windows 10 migration and cloud data centralization without disrupting patient care.",
    solution:
      "PRI planned and executed Windows 10 migration, cloud infrastructure deployment, encrypted data migration, and staff training with ongoing support.",
    results: [
      { metric: "Secure", label: "Windows 10 & cloud data storage" },
      { metric: "Accessible", label: "Patient data from any device" },
      { metric: "Minimal", label: "Operational downtime during migration" },
      { metric: "Lower", label: "Infrastructure maintenance costs" },
    ],
    tags: ["Cloud Migration", "Healthcare", "Windows 10", "Infrastructure"],
  },
  "streamlines-operations-for-financial-services": {
    title: "PRI Global Drives Customer Engagement and Streamlines Operations for Financial Services Client",
    industry: "Financial Services",
    industryIcon: "Landmark",
    date: "2023-12-31",
    challenge:
      "Fragmented customer touchpoints, inconsistent information, and slow support processes hurt engagement and internal efficiency.",
    solution:
      "PRI built a unified customer portal, integrated data management, self-service knowledge base, and intelligent case management.",
    results: [
      { metric: "Unified", label: "Single front door for customers" },
      { metric: "Faster", label: "Support resolution times" },
      { metric: "Lower", label: "Support costs via self-service" },
      { metric: "Insights", label: "Data-driven customer decisions" },
    ],
    tags: ["Customer Experience", "Financial Services", "Portal", "Case Management"],
  },
  "streamlining-it-solutions-with-bpm-best-practices": {
    title: "Enhancing Efficiency and Collaboration in Healthcare: Streamlining IT Solutions with BPM Best Practices",
    industry: "Healthcare",
    industryIcon: "HeartPulse",
    date: "2023-12-31",
    challenge:
      "Fragmented workflows, manual data entry, and limited process visibility hindered productivity and patient care at a leading healthcare institution.",
    solution:
      "PRI applied BPM best practices, workflow automation, reusable modular features, and comprehensive training across the organization.",
    results: [
      { metric: "Streamlined", label: "Cross-department workflows" },
      { metric: "Automated", label: "Repetitive manual tasks" },
      { metric: "Compliant", label: "Data security & regulations" },
      { metric: "Reusable", label: "Modular features across apps" },
    ],
    tags: ["BPM", "Healthcare", "Automation", "Workflow"],
  },
  "revolutionizing-healthcare-with-robust-prpc-application": {
    title: "PRI Global's IT Solutions: Revolutionizing Healthcare with Robust PRPC Application Architecture",
    industry: "Healthcare",
    industryIcon: "HeartPulse",
    date: "2023-12-31",
    challenge:
      "A healthcare provider's PRPC architecture lacked scalability, flexibility, and clarity for evolving business and integration needs.",
    solution:
      "PRI redesigned the PRPC application architecture for scalability, customized integrations, and future-proof extensibility.",
    results: [
      { metric: "Agile", label: "Response to changing requirements" },
      { metric: "Scalable", label: "Architecture for growth" },
      { metric: "Efficient", label: "Streamlined internal processes" },
      { metric: "Integrated", label: "Connected healthcare systems" },
    ],
    tags: ["PRPC", "Healthcare", "Architecture", "Integration"],
  },
  "it-solutions-transforming-the-future-of-healthcare": {
    title: "Empowering Healthcare Excellence: PRI Global's IT Solutions Transforming the Future of Healthcare",
    industry: "Healthcare",
    industryIcon: "HeartPulse",
    date: "2023-12-31",
    challenge:
      "Outdated IT infrastructure caused data silos, manual processes, compliance risks, and limited visibility across departments.",
    solution:
      "PRI deployed Pega/PRPC solutions with process mapping, automation, compliance framework, and organization-wide user training.",
    results: [
      { metric: "50%", label: "Reduction in processing times" },
      { metric: "Real-time", label: "Data visibility across teams" },
      { metric: "Compliant", label: "Healthcare regulations met" },
      { metric: "Better", label: "Patient experiences & outcomes" },
    ],
    tags: ["Pega/PRPC", "Healthcare", "Automation", "Digital Transformation"],
  },
  "transform-data-integrity": {
    title: "Transforming Retail Operations: PRI Global's Successful Peoplesoft Implementation",
    industry: "Retail",
    industryIcon: "ShoppingBag",
    date: "2023-12-31",
    challenge:
      "Fragmented procurement, poor supplier management, and limited supply chain traceability across a multi-region retail network.",
    solution:
      "PRI implemented Peoplesoft eSupplier, eProcurement, and Purchasing modules with Trace Gain integration and full data migration.",
    results: [
      { metric: "Unified", label: "Supplier management & procurement" },
      { metric: "Real-time", label: "Inventory visibility" },
      { metric: "Traceable", label: "End-to-end supply chain" },
      { metric: "Lower", label: "Operational costs & manual errors" },
    ],
    tags: ["Peoplesoft", "ERP", "Retail", "Supply Chain"],
  },
};

function cleanSections(sections) {
  return sections
    .filter((s) => !FOOTER_HEADINGS.has(s.heading))
    .map((s) => {
      const out = { heading: s.heading };
      if (s.paragraphs?.length) out.paragraphs = s.paragraphs;
      if (s.list?.length) out.list = s.list;
      return out;
    })
    .filter((s) => s.paragraphs?.length || s.list?.length);
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

const studies = scraped.map((item) => {
  const meta = META[item.slug];
  const sections = cleanSections(item.sections);
  return {
    id: item.slug,
    slug: item.slug,
    title: meta.title,
    industry: meta.industry,
    industryIcon: meta.industryIcon,
    date: meta.date,
    challenge: meta.challenge,
    solution: meta.solution,
    results: meta.results,
    tags: meta.tags,
    imageUrl: item.imageUrl,
    sections,
  };
});

const js = `// Auto-generated from priglobal.com success stories — do not edit by hand; re-run scripts/build-case-studies-more.mjs\nexport const caseStudiesMore = ${JSON.stringify(studies, null, 2)};\n`;

writeFileSync(join(__dirname, "..", "src", "data", "caseStudiesMore.js"), js);
console.log(`Wrote ${studies.length} case studies to src/data/caseStudiesMore.js`);
