import {
  Users,
  Server,
  Shield,
  Cloud,
  Database,
  Layers,
  Briefcase,
  Network,
  BrainCircuit,
  Zap,
  Calculator,
  Play,
  BookOpen,
  Heart,
  HelpCircle,
  Building2,
  Target,
  Newspaper,
} from "lucide-react";

export const servicesDropdown = {
  columns: [
    {
      title: "Core Services",
      items: [
        { icon: Users, label: "IT Staffing & Talent Solutions", desc: "High-impact technology talent on demand", to: "/talent-solutions" },
        { icon: Server, label: "Managed IT & Infrastructure", desc: "Reliable operations. Resilient systems.", to: "/services" },
        { icon: Shield, label: "Cybersecurity & Risk Management", desc: "Enterprise-grade protection and compliance", to: "/services" },
        { icon: Cloud, label: "Cloud & Digital Transformation", desc: "Modern platforms built for speed and scale", to: "/services" },
      ],
    },
    {
      title: "More Services",
      items: [
        { icon: Database, label: "Data Solutions & Integration", desc: "Actionable insight from connected data", to: "/services" },
        { icon: Layers, label: "Business Transformation", desc: "Engineering, modernization, and innovation", to: "/services" },
        { icon: Briefcase, label: "Strategic IT Consulting", desc: "Technology strategy that delivers results", to: "/services" },
        { icon: Network, label: "Network Services", desc: "Optimize communications, reduce cost", to: "/services" },
      ],
    },
  ],
  cta: {
    title: "Not sure where to start?",
    action: "Take our 4-question quiz →",
    to: "/quiz",
  },
};

export const aiDropdown = {
  items: [
    { icon: BrainCircuit, label: "AI Innovation Overview", desc: "Intelligent systems built for your business", to: "/ai-innovation" },
    { icon: Zap, label: "PR1SM.AI Platform", desc: "Your AI Intelligence Layer — Talk to your data", to: "https://www.pr1sm.ai", external: true },
    { icon: Calculator, label: "ROI Calculator", desc: "See your return before you commit", to: "/roi-calculator" },
    { icon: Play, label: "Live Demo", desc: "See PR1SM.AI answer real business questions", to: "/ai-innovation#demo" },
  ],
};

export const resourcesDropdown = {
  items: [
    { icon: BookOpen, label: "Resources Overview", desc: "News, insights, and company updates", to: "/resources" },
    { icon: Calculator, label: "ROI Calculator", desc: "Estimate your PR1SM.AI returns", to: "/roi-calculator" },
    { icon: Newspaper, label: "News & Updates", desc: "Latest from PRI Global", to: "/resources" },
    { icon: Heart, label: "PRI Cares", desc: "Community and giving back", to: "/resources#pri-cares" },
    { icon: HelpCircle, label: "FAQ", desc: "Answers to common questions", to: "/faq" },
  ],
};

export const companyDropdown = {
  items: [
    { icon: Building2, label: "About Us", desc: "Our story, team, and values", to: "/about" },
    { icon: Target, label: "Why PRI Global", desc: "Discover what sets us apart", to: "/why-pri-global" },
    { icon: Briefcase, label: "Industries", desc: "Sectors we serve worldwide", to: "/industries" },
    { icon: Users, label: "Careers", desc: "Join our growing team", to: "/careers" },
  ],
};
