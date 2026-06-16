import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { serviceOutcomes } from "../../data/serviceOutcomes";
import { services } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";

const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));

export default function ServiceOutcomes() {
  return (
    <section className="py-14 md:py-18 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How we help"
          heading="Start with the outcome you need"
          subheading="Three paths into our nine integrated services — hire talent, run IT securely, or transform with cloud and AI."
          className="mb-10"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {serviceOutcomes.map((outcome, i) => (
            <motion.article
              key={outcome.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-royal dark:text-royaldark mb-3">
                {outcome.label}
              </span>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3">
                {outcome.headline}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                {outcome.description}
              </p>
              <ul className="space-y-2 mb-6">
                {outcome.serviceIds.map((id) => {
                  const svc = serviceById[id];
                  if (!svc) return null;
                  return (
                    <li key={id} className="text-sm text-[var(--text-secondary)]">
                      <span className="text-royal dark:text-royaldark mr-1.5">·</span>
                      {svc.title}
                    </li>
                  );
                })}
              </ul>
              <Link
                to={outcome.cta.to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal dark:text-royaldark hover:gap-2.5 transition-all"
              >
                {outcome.cta.label} <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
