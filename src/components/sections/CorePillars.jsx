import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Server,
  BrainCircuit,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedIcon from "../ui/AnimatedIcon";

const pillars = [
  {
    icon: Users,
    title: "IT Staffing & Talent",
    description:
      "Contract, permanent, and executive search — curated shortlists in as few as 5 business days across every IT discipline.",
    to: "/talent-solutions",
    cta: "Start hiring",
  },
  {
    icon: FileText,
    title: "SOW & Project Delivery",
    description:
      "Statement-of-work engagements and dedicated project teams — from scoped deliverables to multi-year programs with Fortune 500 clients.",
    to: "/talent-solutions#sow-delivery",
    cta: "Explore SOW delivery",
  },
  {
    icon: Server,
    title: "Managed IT & Infrastructure",
    description:
      "24/7 monitoring, service desk, network operations, and resilient infrastructure — so your teams focus on growth, not firefighting.",
    to: "/services",
    cta: "Managed services",
  },
  {
    icon: BrainCircuit,
    title: "PR1SM.AI & AI Pods™",
    description:
      "Operational intelligence in plain English plus ready-built AI delivery teams — Flex, Scale, or Dedicated pods in weeks.",
    to: "/ai-innovation",
    cta: "Explore AI",
  },
  {
    icon: Briefcase,
    title: "IT Consulting & Advisory",
    description:
      "Strategy, architecture, and transformation roadmaps grounded in 28+ years of enterprise delivery.",
    to: "/services",
    cta: "Consulting",
  },
];

export default function CorePillars() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="site-container">
        <SectionHeading
          label="What we deliver"
          heading="Staffing. SOW. Managed services. AI."
          subheading="One established partner for clients who need credible delivery at scale — and candidates who want a team that invests in their careers."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:border-royal/40 dark:hover:border-royaldark/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-4">
                <AnimatedIcon Icon={pillar.icon} size={20} className="text-royal dark:text-royaldark" />
              </div>
              <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-5">
                {pillar.description}
              </p>
              <Link
                to={pillar.to}
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal dark:text-royaldark group-hover:gap-3 transition-all"
              >
                {pillar.cta} <ArrowRight size={15} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
