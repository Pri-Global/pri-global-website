import {
  Award,
  Bot,
  Building2,
  Factory,
  GraduationCap,
  Heart,
  HeartHandshake,
  Landmark,
  LayoutGrid,
  Lightbulb,
  Megaphone,
  Plane,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  Trophy,
  Users,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

const NEWS_CATEGORY_ICONS = {
  All: LayoutGrid,
  Community: Heart,
  Product: Sparkles,
  Company: Building2,
  Insights: Lightbulb,
};

const NEWS_TAG_ICONS = {
  All: Tag,
  "ENTERPRISE AI": Bot,
  "PRI CARES": HeartHandshake,
  SPONSORSHIP: Award,
  ANNOUNCEMENT: Megaphone,
  TEAM: Users,
  MILESTONE: Trophy,
  "APP MAINTENANCE": Wrench,
  INSIGHTS: Lightbulb,
  "MOBILE APPS": Smartphone,
};

const CASE_STUDY_INDUSTRY_ICONS = {
  All: LayoutGrid,
  Manufacturing: Factory,
  "Retail & Food Service": UtensilsCrossed,
  "Aerospace & Defense": Plane,
  "Financial Services": Landmark,
  Healthcare: Heart,
  "Education & Cybersecurity": GraduationCap,
  Retail: ShoppingBag,
};

const ICON_GROUPS = {
  newsCategory: NEWS_CATEGORY_ICONS,
  newsTag: NEWS_TAG_ICONS,
  caseStudyIndustry: CASE_STUDY_INDUSTRY_ICONS,
};

export function getResourceFilterIcon(group, option) {
  const map = ICON_GROUPS[group] || {};
  return map[option] || Tag;
}

export function ResourceFilterIcon({ group, option, size = 14, className = "" }) {
  const Icon = getResourceFilterIcon(group, option);
  return <Icon size={size} className={`shrink-0 ${className}`} aria-hidden />;
}
