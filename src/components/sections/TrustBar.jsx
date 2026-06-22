import { Award, Globe, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedIcon from "../ui/AnimatedIcon";

const items = [
  { icon: Award, label: "28+ years", sub: "In business since 1997" },
  { icon: Globe, label: "6 global offices", sub: "USA, India, Philippines, Canada" },
  { icon: Users, label: "12,700+ placements", sub: "IT professionals placed" },
  { icon: Shield, label: "96% retention", sub: "Client satisfaction rate" },
];

export default function TrustBar() {
  return (
    <section className="py-8 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3"
            >
              <div className="w-10 h-10 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0">
                <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{label}</p>
                <p className="text-[11px] text-[var(--text-muted)] leading-snug truncate">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
