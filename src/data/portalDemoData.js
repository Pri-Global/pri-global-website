import { BOOKING_URL } from "../constants/links";

export const RECRUITER = {
  name: "Karen Myers",
  title: "PRI Global Recruiter",
  photo: "/team/karen-myers.jpg",
};

export const RECRUITER_MESSAGE = `Hi Alex,

I came across your profile and I'm excited to reach out! We have an urgent contract opportunity with a leading financial services client in St. Louis (remote-friendly).

Role: Senior React Developer
Duration: 6 months (strong potential to extend)
Rate: $105-115/hr

Would you be available for a quick 15-minute call this week? I have openings Thursday and Friday afternoon.

Best,
Karen Myers
PRI Global Talent Team
636.256.7172`;

export const DEMO_APPLICATIONS = [
  { id: 1, role: "Senior React Developer", company: "Financial Services Client", status: "Interview Scheduled", statusColor: "green", applied: "3 days ago" },
  { id: 2, role: "Cloud Architect", company: "Healthcare Client", status: "Under Review", statusColor: "amber", applied: "1 week ago" },
  { id: 3, role: "Data Engineer", company: "Manufacturing Client", status: "Application Received", statusColor: "blue", applied: "2 weeks ago" },
];

export const INTERVIEW_PREP_LINKS = [
  { label: "Top IT Interview Questions 2025", href: "/job-seeker-faq", external: false },
  { label: "Resume Tips from PRI Recruiters", href: "/working-at-pri", external: false },
  { label: "Search All Open Positions", href: "/candidate-jobs", external: false },
];

export const HIRING_SHORTLIST = [
  { id: "a", name: "Candidate A", experience: "8 yrs experience", location: "Remote", skills: [{ name: "React", level: 5 }, { name: "TypeScript", level: 4 }, { name: "AWS", level: 4 }], status: "Available immediately" },
  { id: "b", name: "Candidate B", experience: "6 yrs experience", location: "St. Louis, MO", skills: [{ name: "React", level: 5 }, { name: "Node.js", level: 5 }, { name: "GCP", level: 3 }], status: "2 weeks notice" },
];

export const DEMO_SAVED_JOBS = [
  { id: 1, role: "Senior React Developer", company: "Financial Services Client", location: "Remote", saved: "2 days ago" },
  { id: 2, role: "DevOps Engineer", company: "Healthcare Client", location: "St. Louis, MO", saved: "5 days ago" },
];

export const HIRING_PIPELINE = [
  { stage: "Sourced", count: 12, color: "blue" },
  { stage: "Screening", count: 6, color: "amber" },
  { stage: "Client Review", count: 4, color: "purple" },
  { stage: "Interview", count: 2, color: "green" },
];

export const HIRING_INTERVIEWS = [
  { candidate: "Candidate A", role: "Senior React Developer", date: "Thu, Jun 5 · 2:00 PM", type: "Video", status: "Confirmed" },
  { candidate: "Candidate C", role: "Cloud Architect", date: "Fri, Jun 6 · 10:00 AM", type: "On-site", status: "Pending" },
];

export const HIRING_PLACEMENTS = [
  { name: "Jordan Lee", role: "Data Engineer", client: "Manufacturing Client", startDate: "May 12, 2026", type: "Contract" },
  { name: "Sam Rivera", role: "Security Analyst", client: "Financial Services Client", startDate: "Apr 3, 2026", type: "Direct Hire" },
];

export const DEMO_INVOICES = [
  { id: "INV-2026-041", amount: "$12,400", period: "May 2026", status: "Paid", due: "—" },
  { id: "INV-2026-052", amount: "$8,750", period: "Jun 2026", status: "Open", due: "Jun 15, 2026" },
];

export const HUBSPOT_URL = BOOKING_URL;

export const SKILL_OPTIONS = [
  "Software Engineering",
  "Cloud & DevOps",
  "Cybersecurity",
  "Data Engineering",
  "AI/ML",
  "Project Management",
  "Business Analysis",
  "Network Engineering",
  "Other",
];

export const EXPERIENCE_OPTIONS = ["0-1", "1-3", "3-5", "5-10", "10+"];

export const INDUSTRY_OPTIONS = [
  "Financial Services",
  "Manufacturing and Supply Chain",
  "Consumer Packaged Goods",
  "Healthcare",
  "Public Sector",
  "Retail",
];
