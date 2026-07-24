export const PRISM_DEMO_ROLES = [
  {
    title: "AI Assessment Specialist",
    description: "We evaluate your data, systems, and goals to determine AI readiness in minutes.",
    icon: "assessment",
  },
  {
    title: "AI Advisor",
    description: "We dive deep into your business to understand unique challenges and opportunities.",
    icon: "advisor",
  },
  {
    title: "Operational Intelligence",
    description: "We understand all your data and deliver insights you can act on — 24/7.",
    icon: "intelligence",
  },
];

export const PRISM_DEMO_PRESETS = [
  "How is our business performing today?",
  "Show me revenue trends by region",
  "What are our top performing products this quarter?",
  "Why did customer churn increase last month?",
  "Summarize this week's operational bottlenecks",
];

export const PRISM_DEMO_SCENARIOS = [
  {
    id: "performance",
    match: ["how is our business performing", "executive summary", "performing today"],
    question: "How is our business performing today?",
    summary: "Here's your executive summary for today.",
    kpis: [
      { label: "Revenue", value: "$24.6M", change: "8.5%", positive: true },
      { label: "Gross Margin", value: "42.3%", change: "3.1%", positive: true },
      { label: "Open Issues", value: "7", change: "2", positive: false, warn: true },
      { label: "At Risk Projects", value: "3", change: "1", positive: false, warn: true },
    ],
    insight:
      "Overall trajectory is positive. Cloud Services margin improved 2.8 pts. Three projects need executive attention this week.",
    expanded: [
      { label: "Cash Position", value: "$847K", note: "AR due <30d: $312K" },
      { label: "Pipeline Coverage", value: "3.2×", note: "vs quarterly target" },
      { label: "Team Utilization", value: "87%", note: "↑4 pts vs last month" },
    ],
    sources: ["ERP", "CRM", "Finance"],
  },
  {
    id: "revenue",
    match: ["revenue trends", "revenue by region", "region"],
    question: "Show me revenue trends by region",
    summary: "Regional revenue trends — trailing 12 months vs prior year.",
    kpis: [
      { label: "North America", value: "+12.4%", change: "YoY", positive: true },
      { label: "APAC", value: "+8.1%", change: "YoY", positive: true },
      { label: "Europe", value: "-2.3%", change: "YoY", positive: false, warn: true },
      { label: "LATAM", value: "+5.6%", change: "YoY", positive: true },
    ],
    insight:
      "North America leads growth on manufacturing wins. Europe retail softness is concentrated in two accounts — recovery plan drafted.",
    expanded: [
      { label: "Top Region", value: "North America", note: "$14.2M YTD" },
      { label: "Fastest Growth", value: "Cloud Services", note: "+31% QoQ" },
      { label: "Forecast", value: "On track", note: "98% of annual plan" },
    ],
    sources: ["Salesforce", "ERP", "BI Dashboard"],
  },
  {
    id: "products",
    match: ["top performing products", "products this quarter", "product"],
    question: "What are our top performing products this quarter?",
    summary: "Top product lines ranked by revenue and growth this quarter.",
    kpis: [
      { label: "Enterprise Suite", value: "$2.4M", change: "+18%", positive: true },
      { label: "Cloud Migration", value: "$1.8M", change: "+31%", positive: true },
      { label: "AI Readiness", value: "$940K", change: "New", positive: true },
      { label: "Managed IT", value: "$720K", change: "-4%", positive: false, warn: true },
    ],
    insight: "Cloud Migration is your fastest-growing line. AI Readiness Assessment launched strong — consider expanding sales focus.",
    expanded: [
      { label: "Win Rate", value: "34%", note: "↑6 pts vs Q1" },
      { label: "Avg Deal Size", value: "$186K", note: "Enterprise-led" },
      { label: "Cross-sell", value: "41%", note: "staffing + services" },
    ],
    sources: ["CRM", "Finance System"],
  },
  {
    id: "churn",
    match: ["churn", "customer churn", "retention"],
    question: "Why did customer churn increase last month?",
    summary: "Churn analysis for the last 30 days with root causes and at-risk accounts.",
    kpis: [
      { label: "Overall Churn", value: "3.2%", change: "+0.8%", positive: false, warn: true },
      { label: "Onboarding Issues", value: "42%", change: "of churn", positive: false, warn: true },
      { label: "Pricing Concerns", value: "31%", change: "of churn", positive: false, warn: true },
      { label: "At-Risk Accounts", value: "14", change: "flagged", positive: false, warn: true },
    ],
    insight:
      "Primary driver is onboarding friction in mid-market segment. Recommend proactive outreach to 14 at-risk accounts within 5 business days.",
    expanded: [
      { label: "NPS Trend", value: "47", note: "↓3 pts vs prior month" },
      { label: "Support Escalations", value: "+22%", note: "week 3 spike" },
      { label: "Save Plays", value: "6 active", note: "CS team assigned" },
    ],
    sources: ["CRM", "Support Tickets", "NPS"],
  },
  {
    id: "bottlenecks",
    match: ["bottleneck", "operational", "this week"],
    question: "Summarize this week's operational bottlenecks",
    summary: "Three operational bottlenecks detected across your connected systems.",
    kpis: [
      { label: "Dispatch Delays", value: "+2.1 hrs", change: "34 orders", positive: false, warn: true },
      { label: "AP Invoice Backlog", value: "47", change: ">5 days", positive: false, warn: true },
      { label: "Support Resolution", value: "28 hrs", change: "vs 18 SLA", positive: false, warn: true },
      { label: "Automation Saves", value: "12 hrs", change: "this week", positive: true },
    ],
    insight:
      "Warehouse dispatch and AP backlog are correlated with supplier delay on PO-8842. Support volume spike tied to one release.",
    expanded: [
      { label: "Recommended Action", value: "Expedite PO-8842", note: "supplier contact drafted" },
      { label: "Workflow Alert", value: "AP approvals", note: "2 approvers OOO" },
      { label: "Auto-report", value: "Scheduled", note: "Monday 8 AM exec brief" },
    ],
    sources: ["ERP", "WMS", "Finance", "Helpdesk"],
  },
];

export function findPrismDemoScenario(input) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return PRISM_DEMO_SCENARIOS[0];

  const exact = PRISM_DEMO_SCENARIOS.find(
    (s) => s.question.toLowerCase() === normalized || s.preset?.toLowerCase() === normalized
  );
  if (exact) return exact;

  const fuzzy = PRISM_DEMO_SCENARIOS.find((s) =>
    s.match.some((token) => normalized.includes(token))
  );
  if (fuzzy) return fuzzy;

  return {
    ...PRISM_DEMO_SCENARIOS[0],
    question: input.trim(),
    summary:
      "I can analyze that across your connected systems. In a live deployment, PR1SM.AI pulls from your CRM, ERP, finance, and operations data in real time.",
    kpis: PRISM_DEMO_SCENARIOS[0].kpis,
    insight:
      "Connect your systems to see governed answers with source attribution, alerts, and recommended next steps.",
    expanded: PRISM_DEMO_SCENARIOS[0].expanded,
    sources: ["CRM", "ERP", "Finance"],
  };
}

/** @deprecated Use PRISM_DEMO_SCENARIOS */
export const PRISM_DEMO_RESPONSES = Object.fromEntries(
  PRISM_DEMO_SCENARIOS.map((s) => [s.question, s.summary])
);
