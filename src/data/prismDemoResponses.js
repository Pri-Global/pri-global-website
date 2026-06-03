export const PRISM_DEMO_PRESETS = [
  "Show me revenue trends by region",
  "What are our top performing products this quarter?",
  "Why did customer churn increase last month?",
  "Summarize this week's operational bottlenecks",
  "Compare Q1 vs Q2 margin by product line",
];

export const PRISM_DEMO_RESPONSES = {
  "Show me revenue trends by region": `📊 Here's what I found:
- North America: +12.4% YoY — strongest growth in Q3
- APAC: +8.1% — driven by manufacturing sector
- Europe: -2.3% — headwinds in retail segment
Data pulled from: Salesforce, ERP, BI Dashboard
Last updated: 2 minutes ago`,

  "What are our top performing products this quarter?": `🏆 Top 3 Products — Q3 Performance:
1. Enterprise Suite — $2.4M revenue (+18%)
2. Cloud Migration Package — $1.8M (+31%)
3. AI Readiness Assessment — $940K (new product)
Insight: Cloud Migration is your fastest growing line.
Source: CRM + Finance System`,

  "Why did customer churn increase last month?": `🔍 Churn Analysis — Last 30 Days:
- Overall churn: 3.2% (↑0.8% vs prior month)
- Primary driver: Onboarding friction (42% of churned accounts)
- Secondary: Pricing concerns (31%)
- At-risk accounts identified: 14
Recommendation: Priority outreach to at-risk segment.
Source: CRM, Support Tickets, NPS Data`,

  "Summarize this week's operational bottlenecks": `⚠️ 3 Bottlenecks Identified This Week:
1. Warehouse dispatch delays — avg +2.1 hrs (affecting 34 orders)
2. AP invoice backlog — 47 invoices >5 days pending
3. Support ticket resolution — avg 28hrs vs 18hr SLA
All data pulled from: ERP, WMS, Finance, Helpdesk`,

  "Compare Q1 vs Q2 margin by product line": `📈 Margin Comparison — Q1 vs Q2:
Product Line        Q1      Q2    Δ
IT Staffing        18.2%   19.7%  +1.5%
Managed Services   24.1%   22.8%  -1.3%
Cloud Solutions    31.4%   34.2%  +2.8%
AI Services        41.0%   44.5%  +3.5%
Overall company margin improved +1.2 points.
Source: ERP + Finance System`,
};
