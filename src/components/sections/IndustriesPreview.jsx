import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Store,
  ArrowRight,
} from "lucide-react";
import { industries } from "../../data/industries";
import SectionHeading from "../ui/SectionHeading";
import AnimatedIcon from "../ui/AnimatedIcon";

const ICON_MAP = {
  Landmark,
  Factory,
  ShoppingBag,
  HeartPulse,
  Building2,
  Store,
};

/** Infosys-style industries & services entry point on homepage */
export default function IndustriesPreview() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeading
            label="Industries"
            heading="Deep expertise where it matters"
            subheading="We combine technology delivery with real domain knowledge across the sectors our clients operate in."
            align="left"
            className="max-w-2xl mb-0"
          />
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal dark:text-royaldark hover:underline shrink-0"
          >
            All industries <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {industries.map((ind, i) => {
            const Icon = ICON_MAP[ind.icon] || Landmark;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to="/industries"
                  className="group flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-royal/40 dark:hover:border-royaldark/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-[var(--text-primary)] group-hover:text-royal dark:group-hover:text-royaldark transition-colors mb-1">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {ind.highlights[0]}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
