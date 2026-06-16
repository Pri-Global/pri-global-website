import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Users, Layers, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import AnimatedIcon from "../ui/AnimatedIcon";

/** Excentor-style integrated service pillars — mapped to PRI offerings */
const pillars = [
  {
    icon: Briefcase,
    title: "IT Consulting & Advisory",
    description:
      "Strategy, architecture, and transformation roadmaps grounded in 28+ years of enterprise delivery — not slide decks.",
    to: "/services",
    cta: "Explore consulting",
  },
  {
    icon: Users,
    title: "Workforce & Contractor Management",
    description:
      "MSP programs, compliant contractor onboarding, payroll support, and contingent workforce oversight at scale.",
    to: "/talent-solutions",
    cta: "Workforce solutions",
  },
  {
    icon: Layers,
    title: "Talent Sourcing & Staffing",
    description:
      "Curated shortlists in 5 days across every IT discipline — contract, permanent, and executive search.",
    to: "/talent-solutions",
    cta: "Find talent",
  },
];

export default function CorePillars() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Integrated platform"
          heading="One partner. Three pillars. Full coverage."
          subheading="Like the best global staffing firms, we combine consulting, workforce management, and talent sourcing on a single integrated platform."
          className="mb-14"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-7 hover:border-royal/40 dark:hover:border-royaldark/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-5">
                <AnimatedIcon Icon={pillar.icon} size={22} className="text-royal dark:text-royaldark" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-6">
                {pillar.description}
              </p>
              <Link
                to={pillar.to}
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal dark:text-royaldark group-hover:gap-3 transition-all"
              >
                {pillar.cta} <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
