import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import mastercardLogo from "../../assets/partners/Mastercard-logo.svg";

export default function MastercardPartnership() {
  return (
    <section className="py-6 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4 md:px-6 md:py-5"
        >
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={mastercardLogo}
              alt="Mastercard"
              className="h-8 w-auto shrink-0 dark:brightness-110"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                26+ year partnership with Mastercard
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                Trusted staffing, SOW delivery, and technology talent at global scale — including
                20 engineers placed across three cities in 30 days.
              </p>
            </div>
          </div>
          <Link
            to="/talent-solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal dark:text-royaldark hover:gap-2.5 transition-all shrink-0"
          >
            Our talent solutions <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
