import { services } from "../../data/services";
import { industries } from "../../data/industries";
import { offices } from "../../data/offices";
import { JOB_SEEKER_FAQ_ITEMS } from "../../data/jobSeekerFaq";
import { BOOKING_URL } from "../../constants/links";

const COMPANY_STATS =
  "28+ years in business · 12,700+ professionals placed · 96% client retention · 300+ projects delivered";

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function includesAny(text, terms) {
  return terms.some((t) => text.includes(t));
}

function scoreTerms(text, terms) {
  return terms.reduce((score, term) => (text.includes(term) ? score + 1 : score), 0);
}

function matchService(text) {
  return services.find((svc) => {
    const haystack = normalize(`${svc.title} ${svc.id} ${svc.tagline} ${svc.bullets.join(" ")}`);
    const words = normalize(text).split(" ").filter((w) => w.length > 3);
    return words.some((w) => haystack.includes(w));
  });
}

function matchIndustry(text) {
  return industries.find((ind) => {
    const haystack = normalize(`${ind.title} ${ind.id} ${ind.description}`);
    return haystack.split(" ").some((w) => w.length > 4 && text.includes(w));
  });
}

function matchFaq(text) {
  let best = null;
  let bestScore = 0;
  for (const item of JOB_SEEKER_FAQ_ITEMS) {
    const q = normalize(item.question);
    const score = q.split(" ").filter((w) => w.length > 4 && text.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore >= 2 ? best : null;
}

function servicesOverview() {
  const list = services.map((s) => `• ${s.title} — ${s.tagline}`).join("\n");
  return `PRI Global offers nine integrated service lines:\n\n${list}\n\nExplore details at /services, PRI AI Pods at /ai-services, or tell me which area interests you (staffing, cloud, cybersecurity, PR1SM.AI, etc.).`;
}

function aiPodsAnswer() {
  return `PRI AI Pods™ are pre-built AI delivery teams — deploy in weeks, not months.

Three engagement tiers:
• Flex — POCs, early builds, testing use cases
• Scale — active builds and multiple use cases
• Dedicated — enterprise AI programs and productized platforms

Learn more at /ai-services or book a strategy call: ${BOOKING_URL}`;
}

function prismAnswer() {
  return `PR1SM.AI is PRI Global's AI intelligence layer — it sits on top of your existing systems (no rip-and-replace).

Key capabilities:
• Plain-English queries — no SQL or analyst queue
• Enterprise-grade security — your data stays yours
• Decisions in seconds across ERP, CRM, and fragmented tools
• Deploy in weeks, not months

Learn more at /ai-innovation or book a demo: ${BOOKING_URL}`;
}

function contactAnswer() {
  return `Here's how to reach PRI Global:

• General inquiries: info@priglobal.com
• PR1SM.AI / demos: ajay@pr1sm.ai or liezl.moss@PR1SM.AI
• HQ phone: 636.256.7172 (Ellisville, MO)
• Book a discovery call: ${BOOKING_URL}
• Custom pricing: /get-pricing

Response time for proposals: within 24 business hours.`;
}

function jobsAnswer() {
  return `Looking for IT roles? You can:

• Browse live openings: /candidate-jobs (powered by JobDiva)
• Sign in to the Candidate Portal: /candidate-login
• Careers overview: /careers
• Job seeker FAQ: /job-seeker-faq

PRI places contract, contract-to-hire, and direct-hire talent across the USA and globally.`;
}

function portalsAnswer() {
  return `PRI Global has dedicated portals:

• Candidates — /candidate-login (applications, saved jobs, profile)
• Clients — /customer-login (pipeline, projects, PR1SM.AI access)
• Employees — /employee-login

Need access? Clients can request it at /customer-register. Candidates can register at /candidate-register.`;
}

function officesAnswer() {
  const list = offices
    .map((o) => `• ${o.label} — ${o.address}${o.email ? ` · ${o.email}` : ""}`)
    .join("\n");
  return `PRI Global operates globally with offices in:\n\n${list}\n\nHQ: Ellisville, Missouri (founded 1997). See /about for our full story.`;
}

function aboutAnswer() {
  return `PRI Global is a technology consulting, talent, and AI company founded in 1997 in Ellisville, Missouri.

${COMPANY_STATS}

Six offices across the USA, India, Philippines, and Canada. We serve Financial Services, Healthcare, Manufacturing, Retail, Public Sector, and more.

Why clients choose us: one partner for staffing + managed services + cloud + AI (PR1SM.AI). Learn more at /why-pri-global or /about.`;
}

function pricingAnswer() {
  return `Pricing depends on scope — staffing, managed services, project work, or PR1SM.AI licensing.

• Request a custom quote: /get-pricing
• Estimate ROI: /roi-calculator
• Book a call: ${BOOKING_URL}

We typically respond with a tailored proposal within 24 business hours. No obligation.`;
}

function leadershipAnswer(text) {
  if (includesAny(text, ["ajay"])) {
    return "Ajay Patel is Chairman of PRI Global and Chairman & Founder of PR1SM.AI. Reach him at ajay@pr1sm.ai. More on /about.";
  }
  if (includesAny(text, ["keenan"])) {
    return "Keenan Patel is CEO of PRI Global (and CEO of PR1SM.AI). General inquiries: info@priglobal.com.";
  }
  if (includesAny(text, ["liezl"])) {
    return "Liezl Moss leads Growth Strategy at PR1SM.AI. Contact: liezl.moss@PR1SM.AI.";
  }
  return "PRI leadership includes Ajay Patel (Chairman), Keenan Patel (CEO), Marla Dicandia (CFO), and Suresh Karampudi (Managing Director, India). PR1SM.AI team details are on /about.";
}

function greetingAnswer() {
  return "Hello! I'm PriVa — I answer questions about PRI Global using our website content. Ask about services, PR1SM.AI, careers, offices, pricing, or how to get started.";
}

function fallbackAnswer() {
  return `I'm not sure about that yet — I'm running on local site knowledge until our full AI chatbot launches.

Try asking about:
• Our 9 services, PRI AI Pods™, or PR1SM.AI
• IT jobs and the candidate portal
• Offices and company background
• Pricing or booking a call

Or email info@priglobal.com and our team will help directly.`;
}

/** Generate a reply from on-site data — no external API */
export function generatePrivaReply(userMessage) {
  const text = normalize(userMessage);
  if (!text) return greetingAnswer();

  if (includesAny(text, ["hi", "hello", "hey", "good morning", "good afternoon", "guten tag"])) {
    return greetingAnswer();
  }

  if (includesAny(text, ["thank", "thanks", "danke"])) {
    return "You're welcome! If you have more questions about PRI Global, just ask — or book a call anytime.";
  }

  const faq = matchFaq(text);
  if (faq) return faq.answer;

  const serviceScores = [
    { id: "pods", terms: ["ai pod", "pods", "pri ai pod", "ai pods", "flex pod", "scale pod", "dedicated pod", "ai team", "hire ai team", "build ai team"], fn: aiPodsAnswer },
    { id: "prism", terms: ["prism", "pr1sm", "pr 1sm", "ai platform", "intelligence layer", "plain english", "talk to your data"], fn: prismAnswer },
    { id: "jobs", terms: ["job", "jobs", "career", "careers", "hiring", "apply", "opening", "position", "recruit", "talent role"], fn: jobsAnswer },
    { id: "portal", terms: ["portal", "login", "sign in", "dashboard", "candidate portal", "client portal", "employee portal"], fn: portalsAnswer },
    { id: "pricing", terms: ["price", "pricing", "cost", "quote", "budget", "how much"], fn: pricingAnswer },
    { id: "contact", terms: ["contact", "email", "call", "reach", "talk to", "speak with", "phone", "book"], fn: contactAnswer },
    { id: "office", terms: ["office", "location", "where are you", "global", "hyderabad", "pune", "manila", "ottawa", "ellisville", "st louis"], fn: officesAnswer },
    { id: "about", terms: ["about", "who is pri", "who are you", "company", "history", "founded", "years", "retention", "placed"], fn: aboutAnswer },
    { id: "industry", terms: ["industry", "industries", "healthcare", "financial", "manufacturing", "retail", "public sector", "cpg"], fn: null },
    { id: "service", terms: ["service", "services", "staffing", "managed it", "cyber", "cloud", "consulting", "network", "msp"], fn: null },
    { id: "leadership", terms: ["ajay", "keenan", "marla", "suresh", "liezl", "leadership", "team", "ceo", "chairman"], fn: () => leadershipAnswer(text) },
    { id: "demo", terms: ["demo", "get started", "started", "begin"], fn: () => `Great next step — schedule a discovery call: ${BOOKING_URL}\n\nOr explore PR1SM.AI at /ai-innovation and request pricing at /get-pricing.` },
  ];

  let best = { score: 0, fn: null };
  for (const entry of serviceScores) {
    const score = scoreTerms(text, entry.terms);
    if (score > best.score) best = { score, fn: entry.fn, id: entry.id };
  }

  if (best.score > 0 && best.fn) return best.fn();

  if (best.id === "industry" || includesAny(text, ["industry", "industries", "sector"])) {
    const ind = matchIndustry(text);
    if (ind) {
      return `${ind.title}: ${ind.description}\n\nHighlights:\n${ind.highlights.map((h) => `• ${h}`).join("\n")}\n\nSee all industries at /industries.`;
    }
    const names = industries.map((i) => i.title).join(", ");
    return `We serve: ${names}. Details at /industries — tell me your sector for specifics.`;
  }

  const svc = matchService(text);
  if (svc) {
    const more = svc.id === "ai-services" ? "/ai-services" : "/services";
    return `${svc.title}\n${svc.description}\n\nIncludes:\n${svc.bullets.map((b) => `• ${b}`).join("\n")}\n\nMore at ${more}.`;
  }

  if (includesAny(text, ["service", "services", "offer", "what do you do", "help with"])) {
    return servicesOverview();
  }

  return fallbackAnswer();
}

/** Small delay so replies feel natural in the UI */
export function privaReplyDelayMs(message) {
  const len = message?.length ?? 0;
  return Math.min(900, 320 + len * 8);
}
