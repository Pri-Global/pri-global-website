export const EMPLOYEE_ANNOUNCEMENTS = [
  {
    id: "q2-kickoff",
    date: "Jun 2, 2026",
    title: "Q2 Company Kickoff — All Hands Recording",
    summary: "Missed the all-hands? Watch the recording and review Q2 priorities in the video library.",
    tag: "Company",
    href: "/employee-dashboard#videos",
  },
  {
    id: "benefits-open",
    date: "May 28, 2026",
    title: "Open Enrollment Reminder — US Benefits",
    summary: "Review your 2026 benefit elections in ADP by June 15. Contact HR with questions.",
    tag: "HR",
    href: "/about#contact",
  },
  {
    id: "referral-bonus",
    date: "May 20, 2026",
    title: "Employee Referral Program — Bonus Active",
    summary: "Refer qualified IT professionals and earn referral bonuses. Submit through the careers portal.",
    tag: "Talent",
    href: "/careers",
  },
];

export const EMPLOYEE_QUICK_LINKS = [
  {
    id: "pr1sm",
    title: "PR1SM.AI Platform",
    description: "Launch the internal AI intelligence layer and client demos.",
    href: "https://www.pr1sm.ai",
    external: true,
    cta: "Launch PR1SM.AI",
    priority: true,
  },
  {
    id: "adp",
    title: "Payroll & HR (ADP)",
    description: "Pay stubs, tax forms, PTO balances, and benefits enrollment.",
    href: "https://www.adp.com",
    external: true,
    cta: "Open ADP",
    priority: true,
  },
  {
    id: "it",
    title: "IT Help Desk",
    description: "636.256.7172 — laptop, VPN, email, and access issues.",
    href: "tel:6362567172",
    external: true,
    cta: "Call IT",
    priority: true,
  },
  {
    id: "hr",
    title: "HR & People Ops",
    description: "Payroll questions, policies, onboarding, and employee records.",
    href: "/about#contact",
    cta: "Contact HR",
    priority: true,
  },
  {
    id: "refer",
    title: "Refer a Candidate",
    description: "Submit referrals and track bonus eligibility through careers.",
    href: "/careers",
    cta: "View Careers",
  },
  {
    id: "brand",
    title: "Brand & Marketing Assets",
    description: "Logos, presentations, and approved PRI Global brand materials.",
    href: "/resources",
    cta: "Resources",
  },
];

export const EMPLOYEE_CONTACTS = [
  {
    name: "Marla Dicandia",
    role: "CFO / HR · People Operations",
    phone: null,
    topics: "Benefits, payroll, HR policies",
  },
  {
    name: "IT Support",
    role: "Technology & Access",
    phone: "636.256.7172",
    topics: "Laptop, VPN, email, portal access",
  },
  {
    name: "Karen Myers",
    role: "Strategic Client Growth",
    phone: null,
    topics: "Internal referrals, recruiting coordination",
  },
];

export const EMPLOYEE_POLICIES = [
  { label: "Code of Conduct & Ethics", href: "/legal" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Working at PRI — Culture & Benefits", href: "/working-at-pri" },
  { label: "Employee Handbook (PDF)", href: "/about#contact" },
];

export const EMPLOYEE_ONBOARDING = [
  { step: 1, title: "Complete ADP onboarding", detail: "Tax forms, direct deposit, and emergency contact." },
  { step: 2, title: "Set up email & MFA", detail: "Contact IT if you need Microsoft 365 or VPN access." },
  { step: 3, title: "Review handbook & policies", detail: "Code of conduct, PTO, and benefits overview." },
  { step: 4, title: "Meet your team lead", detail: "Schedule intro with your manager in week one." },
];

/** Planned HRIS / collaboration integrations for the employee portal. */
export const EMPLOYEE_INTEGRATIONS = [
  {
    id: "teams",
    title: "Microsoft Teams",
    status: "SSO Ready",
    description:
      "Sign in with your PRI Global Microsoft 365 account. Team channels and notifications via Microsoft Graph (Phase 2).",
    docsUrl: "https://learn.microsoft.com/en-us/graph/teams-concept-overview",
    features: ["Single sign-on with Microsoft 365", "Profile from Azure AD", "Team channels (coming next)"],
  },
  {
    id: "rippling",
    title: "Rippling",
    status: "OAuth Ready",
    description:
      "Sync employee records, PTO, org chart, and payroll data from Rippling so the portal reflects live HR information.",
    docsUrl: "https://developer.rippling.com",
    features: ["Employee profile sync", "PTO balances", "Org directory from HRIS"],
  },
];
