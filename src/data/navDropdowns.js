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
  Calculator,
  BookOpen,
  Building2,
  Target,
  Sparkles,
  Mail,
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
        { icon: BrainCircuit, label: "AI Services & PRI AI Pods™", desc: "Stop hiring AI teams — start building with one", to: "/ai-services" },
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
    { icon: BrainCircuit, label: "PRI AI Pods™", desc: "Ready-built AI teams — Flex, Scale, Dedicated", to: "/ai-services" },
    { icon: BrainCircuit, label: "AI Innovation Overview", desc: "Intelligent systems built for your business", to: "/ai-innovation" },
    { icon: Calculator, label: "ROI Calculator", desc: "See your return before you commit", to: "/roi-calculator" },
  ],
};

export const resourcesDropdown = {
  items: [
    { icon: BookOpen, label: "Resources & News", desc: "News, case studies, and insights", to: "/resources" },
    { icon: Sparkles, label: "Solution Finder Quiz", desc: "Find the right PRI service in 4 questions", to: "/quiz" },
  ],
};

export const companyDropdown = {
  items: [
    { icon: Building2, label: "About Us", desc: "Our story, team, and values", to: "/about" },
    { icon: Mail, label: "Contact", desc: "Get in touch with our team", to: "/contact" },
    { icon: Target, label: "Why PRI Global", desc: "Discover what sets us apart", to: "/why-pri-global" },
    { icon: Briefcase, label: "Industries", desc: "Sectors we serve worldwide", to: "/industries" },
    { icon: Users, label: "Careers", desc: "Join our growing team", to: "/careers" },
  ],
};
