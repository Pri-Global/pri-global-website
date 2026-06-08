import { HUBSPOT_MEETING_URL, JOBDIVA_PORTAL_URL } from "../constants/links";

export const RECRUITER_MESSAGE = `Hi Alex,

I came across your profile and I'm excited to reach out! We have an urgent contract opportunity with a leading financial services client in St. Louis (remote-friendly).

Role: Senior React Developer
Duration: 6 months (strong potential to extend)
Rate: $105-115/hr

Would you be available for a quick 15-minute call this week? I have openings Thursday and Friday afternoon.

Best,
Sarah M.
PRI Global Talent Team
636.256.7172`;

export const DEMO_APPLICATIONS = [
  { id: 1, role: "Senior React Developer", company: "Financial Services Client", status: "Interview Scheduled", statusColor: "green", applied: "3 days ago" },
  { id: 2, role: "Cloud Architect", company: "Healthcare Client", status: "Under Review", statusColor: "amber", applied: "1 week ago" },
  { id: 3, role: "Data Engineer", company: "Manufacturing Client", status: "Application Received", statusColor: "blue", applied: "2 weeks ago" },
];

export const RECOMMENDED_JOBS = [
  { id: "rec-1", title: "Senior Full Stack Developer", type: "Contract", location: "Remote", rate: "$95-115/hr", skills: ["React", "Node.js", "AWS"] },
  { id: "rec-2", title: "Cloud Solutions Architect", type: "Contract-to-Hire", location: "St. Louis, MO (Hybrid)", rate: "$120-140/hr", skills: ["AWS", "Azure", "Terraform"] },
  { id: "rec-3", title: "AI/ML Engineer", type: "Full-time", location: "Remote", rate: "$130,000-160,000/yr", skills: ["Python", "TensorFlow", "LLMs"] },
];

export const ALL_JOBS = [
  { id: "job-1", title: "Senior React Developer", type: "Contract", location: "Remote", rate: "$95-115/hr", skills: ["React", "TypeScript", "Node.js", "AWS"], category: "Software Engineering" },
  { id: "job-2", title: "Cloud Architect", type: "Contract-to-Hire", location: "St. Louis, MO (Hybrid)", rate: "$120-140/hr", skills: ["AWS", "Azure", "Terraform", "Docker"], category: "Cloud & DevOps" },
  { id: "job-3", title: "AI/ML Engineer", type: "Full-time", location: "Remote", rate: "$130-160K/yr", skills: ["Python", "TensorFlow", "PyTorch", "LLMs"], category: "AI/ML" },
  { id: "job-4", title: "Cybersecurity Analyst", type: "Contract", location: "Remote", rate: "$85-100/hr", skills: ["SIEM", "SOC", "Zero Trust", "CISSP preferred"], category: "Cybersecurity" },
  { id: "job-5", title: "Data Engineer", type: "Contract", location: "Chicago, IL", rate: "$90-110/hr", skills: ["Databricks", "Spark", "Python", "SQL"], category: "Data Engineering" },
  { id: "job-6", title: "DevOps Engineer", type: "Contract-to-Hire", location: "Remote", rate: "$100-120/hr", skills: ["Kubernetes", "CI/CD", "GitHub Actions", "AWS"], category: "Cloud & DevOps" },
  { id: "job-7", title: "Project Manager (IT)", type: "Full-time", location: "St. Louis, MO", rate: "$95-120K/yr", skills: ["Agile", "PMP", "Jira", "Stakeholder Management"], category: "Project Management" },
  { id: "job-8", title: "Business Analyst", type: "Contract", location: "Remote", rate: "$75-90/hr", skills: ["Requirements", "SQL", "Tableau", "Agile"], category: "Business Analysis" },
];

export const INTERVIEW_PREP_LINKS = [
  { label: "Top IT Interview Questions 2025", href: "https://priglobal.com/job-seeker-faq/", external: true },
  { label: "Resume Tips from PRI Recruiters", href: "https://priglobal.com/working-at-pri/", external: true },
  { label: "Search All Open Positions", href: JOBDIVA_PORTAL_URL, external: true },
];

export const HIRING_SHORTLIST = [
  { id: "a", name: "Candidate A", experience: "8 yrs experience", location: "Remote", skills: [{ name: "React", level: 5 }, { name: "TypeScript", level: 4 }, { name: "AWS", level: 4 }], status: "Available immediately" },
  { id: "b", name: "Candidate B", experience: "6 yrs experience", location: "St. Louis, MO", skills: [{ name: "React", level: 5 }, { name: "Node.js", level: 5 }, { name: "GCP", level: 3 }], status: "2 weeks notice" },
];

export const HUBSPOT_URL = HUBSPOT_MEETING_URL;

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
