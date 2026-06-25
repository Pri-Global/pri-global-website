import {
  Home,
  User,
  Search,
  FileText,
  Bookmark,
  MessageSquare,
  Star,
  Settings,
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  UserCheck,
  Receipt,
  Ticket,
  BarChart3,
  BrainCircuit,
  Megaphone,
  Shield,
  Video,
  Building2,
} from "lucide-react";

export function getEmployeeNav({ announcementCount = 0 } = {}) {
  return [
    { label: "Home", to: "/employee-dashboard", icon: Home },
    {
      label: "Announcements",
      to: "/employee-dashboard#announcements",
      icon: Megaphone,
      badge: announcementCount > 0 ? String(announcementCount) : undefined,
    },
    { label: "Quick Links", to: "/employee-dashboard#links", icon: LayoutDashboard },
    { label: "Integrations", to: "/employee-dashboard#integrations", icon: BrainCircuit },
    { label: "HR & Policies", to: "/employee-dashboard#policies", icon: Shield },
    { label: "Directory", to: "/employee-dashboard#directory", icon: Building2 },
    { label: "Training", to: "/employee-dashboard#videos", icon: Video },
  ];
}

/** @deprecated Use getEmployeeNav() for dynamic badges */
export const EMPLOYEE_NAV = getEmployeeNav({ announcementCount: 3 });

export function getCandidateNav({ applicationCount = 0 } = {}) {
  return [
    { label: "Dashboard", to: "/candidate-dashboard", icon: Home },
    { label: "My Profile", to: "/candidate-profile", icon: User },
    { label: "Job Search", to: "/candidate-jobs", icon: Search },
    {
      label: "My Applications",
      to: "/candidate-dashboard#applications",
      icon: FileText,
      badge: applicationCount > 0 ? String(applicationCount) : undefined,
    },
    { label: "Saved Jobs", to: "/candidate-dashboard#saved", icon: Bookmark },
    { label: "Interview Prep", to: "/candidate-dashboard#prep", icon: Star },
    { label: "Settings", to: "/candidate-profile#settings", icon: Settings },
  ];
}

/** @deprecated Use getCandidateNav() for dynamic badges */
export const CANDIDATE_NAV = getCandidateNav();

export const HIRING_NAV = [
  { label: "Dashboard", to: "/customer-dashboard", icon: LayoutDashboard },
  { label: "Talent Pipeline", to: "/customer-dashboard#pipeline", icon: Users },
  { label: "Active Searches", to: "/customer-dashboard#searches", icon: Search },
  { label: "Candidate Shortlists", to: "/customer-dashboard#shortlist", icon: UserCheck },
  { label: "Interviews", to: "/customer-dashboard#interviews", icon: Calendar },
  { label: "Placements", to: "/customer-dashboard#placements", icon: Briefcase },
  { label: "Invoices", to: "/customer-dashboard#invoices", icon: Receipt },
  { label: "Messages", to: "/customer-dashboard#messages", icon: MessageSquare },
];

export const SERVICES_NAV = [
  { label: "Dashboard", to: "/customer-dashboard", icon: LayoutDashboard },
  { label: "PR1SM.AI Access", to: "/customer-dashboard#prism", icon: BrainCircuit },
  { label: "Active Projects", to: "/customer-dashboard#projects", icon: Briefcase },
  { label: "Service Tickets", to: "/customer-dashboard#tickets", icon: Ticket },
  { label: "Reports", to: "/customer-dashboard#reports", icon: BarChart3 },
  { label: "Invoices", to: "/customer-dashboard#invoices", icon: Receipt },
  { label: "Messages", to: "/customer-dashboard#messages", icon: MessageSquare },
];
