import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Calculator, Layers, Briefcase, Users } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedIcon from "../ui/AnimatedIcon";

const links = [
  {
    icon: Users,
    title: "PRI AI Pods™",
    description: "Deploy a ready-built AI team in weeks — Flex, Scale, or Dedicated.",
    to: "/ai-services",
  },
  {
    icon: BrainCircuit,
    title: "AI & PR1SM.AI",
    description: "Your intelligence layer — talk to your data in plain English.",
    to: "/ai-innovation",
  },
  {
    icon: Calculator,
    title: "ROI Calculator",
    description: "Estimate savings from unified data and faster decisions.",
    to: "/roi-calculator",
  },
  {
    icon: Layers,
    title: "Services",
    description: "Staffing, cloud, cybersecurity, managed IT, and more.",
    to: "/services",
  },
  {
    icon: Briefcase,
    title: "Case Studies",
    description: "Real client outcomes across manufacturing, healthcare, and more.",
    to: "/resources",
    state: { tab: "Case Studies" },
  },
];

export default function ExploreMore() {
  return (
    <section className="py-12 md:py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Explore"
          heading="Go deeper when you're ready"
          subheading="Quick paths to our AI platform, tools, and latest work — without scrolling through everything here."
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {links.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="min-w-0"
            >
              <Link
                to={item.to}
                state={item.state}
                className="group flex flex-col h-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 lg:p-5 hover:border-royal/40 dark:hover:border-royaldark/40 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-3 lg:mb-4">
                  <AnimatedIcon Icon={item.icon} size={17} className="text-royal dark:text-royaldark" />
                </div>
                <h3 className="font-heading font-bold text-sm lg:text-base text-[var(--text-primary)] group-hover:text-royal dark:group-hover:text-royaldark transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs lg:text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-royal dark:text-royaldark group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
