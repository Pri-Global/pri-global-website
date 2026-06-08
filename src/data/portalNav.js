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
} from "lucide-react";

export const CANDIDATE_NAV = [
  { label: "Dashboard", to: "/candidate-dashboard", icon: Home },
  { label: "My Profile", to: "/candidate-profile", icon: User },
  { label: "Job Search", to: "/candidate-jobs", icon: Search },
  { label: "My Applications", to: "/candidate-dashboard#applications", icon: FileText, badge: "3" },
  { label: "Saved Jobs", to: "/candidate-dashboard#saved", icon: Bookmark },
  { label: "Messages", to: "/candidate-dashboard#messages", icon: MessageSquare, badge: "1" },
  { label: "Interview Prep", to: "/candidate-dashboard#prep", icon: Star },
  { label: "Settings", to: "#", icon: Settings, comingSoon: true },
];

export const HIRING_NAV = [
  { label: "Dashboard", to: "/customer-dashboard", icon: LayoutDashboard },
  { label: "Talent Pipeline", to: "/customer-dashboard#pipeline", icon: Users },
  { label: "Active Searches", to: "/customer-dashboard#searches", icon: Search },
  { label: "Candidate Shortlists", to: "/customer-dashboard#shortlist", icon: UserCheck },
  { label: "Interviews", to: "/customer-dashboard#interviews", icon: Calendar },
  { label: "Placements", to: "/customer-dashboard#placements", icon: Briefcase, comingSoon: true },
  { label: "Invoices", to: "#", icon: Receipt, comingSoon: true },
  { label: "Messages", to: "/customer-dashboard#messages", icon: MessageSquare },
];

export const SERVICES_NAV = [
  { label: "Dashboard", to: "/customer-dashboard", icon: LayoutDashboard },
  { label: "PR1SM.AI Access", to: "/customer-dashboard#prism", icon: BrainCircuit },
  { label: "Active Projects", to: "/customer-dashboard#projects", icon: Briefcase },
  { label: "Service Tickets", to: "/customer-dashboard#tickets", icon: Ticket },
  { label: "Reports", to: "#", icon: BarChart3, comingSoon: true },
  { label: "Invoices", to: "#", icon: Receipt, comingSoon: true },
  { label: "Messages", to: "/customer-dashboard#messages", icon: MessageSquare },
];
