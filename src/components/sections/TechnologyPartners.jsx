import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const partners = [
  { name: "Amazon Web Services", tag: "Cloud & AI" },
  { name: "Microsoft Azure", tag: "Cloud & AI" },
  { name: "Google Cloud", tag: "Cloud & AI" },
  { name: "Databricks", tag: "Data & AI" },
];

export default function TechnologyPartners({ compact = false }) {
  return (
    <section className={compact ? "py-10" : "py-14 md:py-16 bg-[var(--bg-secondary)]"}>
      <div className="site-container">
        {!compact && (
          <SectionHeading
            label="Technology ecosystem"
            heading="Built on best-in-class platforms"
            subheading="We design and deliver on the cloud, data, and AI platforms your enterprise already trusts."
            className="mb-8"
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {partners.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-5 text-center"
            >
              <p className="font-heading font-bold text-sm text-[var(--text-primary)] mb-1">{p.name}</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{p.tag}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
