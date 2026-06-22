import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { HUBSPOT_MEETING_URL } from "../../constants/links";

/** WePro-style prominent free consultation CTA */
export default function FreeConsultationBanner() {
  return (
    <section className="py-10 md:py-12 bg-[var(--bg-primary)]">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-royal/25 dark:border-royaldark/30 bg-gradient-to-r from-royal/8 via-[var(--bg-card)] to-royal/5 dark:from-royaldark/10 dark:to-royaldark/5 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-royal dark:bg-royaldark flex items-center justify-center shrink-0">
              <Calendar size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-royal dark:text-royaldark mb-1">
                Free consultation
              </p>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                Not sure where to start? Let&apos;s talk.
              </h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
                Book a no-obligation call — staffing, SOW delivery, managed services, or PR1SM.AI.
                Custom proposal within 24 business hours.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              href={HUBSPOT_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book Free Consultation <ArrowRight size={18} />
            </Button>
            <Button to="/get-pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              Get Pricing
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
