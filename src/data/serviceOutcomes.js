/** Buyer-outcome groupings for Services page (inspired by TEKsystems outcome-led IA). */
export const serviceOutcomes = [
  {
    id: "hire",
    label: "Hire & Scale",
    headline: "Get the right talent, faster",
    description:
      "Contract, permanent, and executive placement — plus PRI AI Pods™ when you need a ready-built AI team instead of a long hiring cycle.",
    serviceIds: ["it-staffing", "ai-services"],
    cta: { label: "Explore talent solutions", to: "/talent-solutions" },
  },
  {
    id: "run",
    label: "Run & Protect",
    headline: "Reliable operations and enterprise-grade security",
    description:
      "Managed IT, cybersecurity, and network services that keep your business running — with proactive support and resilient infrastructure.",
    serviceIds: ["managed-it", "cybersecurity", "network-services"],
    cta: { label: "Talk to an expert", to: "/get-pricing" },
  },
  {
    id: "transform",
    label: "Transform & Innovate",
    headline: "Modernize platforms and unlock your data",
    description:
      "Cloud migration, data integration, business transformation, and strategic consulting — with PR1SM.AI as your intelligence layer when you're ready.",
    serviceIds: ["cloud-digital", "data-solutions", "business-transformation", "it-consulting", "ai-services"],
    cta: { label: "Explore PR1SM.AI", to: "/ai-innovation" },
  },
];
