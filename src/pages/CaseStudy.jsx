import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  UtensilsCrossed,
  Plane,
  Landmark,
  HeartPulse,
  Pill,
  Shield,
  Database,
  ShoppingBag,
  Cloud,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import { getCaseStudyBySlug } from "../data/caseStudies";
import CaseStudyBody from "../components/caseStudies/CaseStudyBody";
import CaseStudyImage from "../components/caseStudies/CaseStudyImage";
import CaseStudyMetric from "../components/caseStudies/CaseStudyMetric";
import { formatNewsDate } from "../utils/formatNewsDate";
import { scrollToPageTop } from "../utils/scrollToPageTop";
import Button from "../components/ui/Button";

const ICON_MAP = {
  Factory,
  UtensilsCrossed,
  Plane,
  Landmark,
  HeartPulse,
  Pill,
  Shield,
  Database,
  ShoppingBag,
  Cloud,
  CreditCard,
  GraduationCap,
};
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const study = slug ? getCaseStudyBySlug(slug) : null;
  const Icon = study ? ICON_MAP[study.industryIcon] || Factory : Factory;

  useEffect(() => {
    scrollToPageTop();
  }, [slug]);

  if (!study) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <article className="pb-24 md:pb-28">
      <section className="pt-28 md:pt-32 pb-12 relative overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-royal/6 rounded-full blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/resources"
              state={{ tab: "Case Studies" }}
              className="inline-flex items-center gap-2 text-sm font-medium text-royal dark:text-royaldark hover:underline mb-8 group"
            >
              <motion.span whileHover={{ x: -4 }} transition={{ type: "spring", stiffness: 400 }}>
                <ArrowLeft size={16} />
              </motion.span>
              Back to Case Studies
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-[minmax(220px,280px)_1fr] lg:grid-cols-[minmax(260px,320px)_1fr] gap-8 lg:gap-10 items-start">
            <div className="mx-auto md:mx-0 w-full max-w-[320px] md:max-w-none">
              <CaseStudyImage study={study} variant="featured" showBadge={false} />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="min-w-0"
            >
              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 mb-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-royal/10 text-royal dark:bg-royaldark/15 dark:text-royaldark border border-royal/20"
                >
                  <Icon size={14} />
                  {study.industry}
                </motion.span>
                {study.date && (
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatNewsDate(study.date)}
                  </span>
                )}
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[var(--text-primary)] leading-tight"
              >
                {study.title}
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-[var(--border)] border border-[var(--border)] shadow-lg mb-10"
        >
          {study.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
              whileHover={{ scale: 1.02 }}
              className={`p-5 md:p-6 text-center transition-colors ${
                i === 0 ? "bg-navy text-white" : "bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              <CaseStudyMetric
                metric={r.metric}
                label={r.label}
                size="lg"
                variant={i === 0 ? "onDark" : "default"}
                animate
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-royal dark:text-royaldark mb-2">
              Challenge
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.challenge}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-royal/20 dark:border-royaldark/25 bg-royal/[0.04] dark:bg-royaldark/[0.06] p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-royal dark:text-royaldark mb-2">
              PRI Solution
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{study.solution}</p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap gap-2 mb-12"
        >
          {study.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={staggerItem}
              whileHover={{ scale: 1.06, y: -2 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <CaseStudyBody sections={study.sections} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-16 relative rounded-2xl overflow-hidden px-8 py-12 md:px-12 md:py-14 text-center"
        >
          <div className="absolute inset-0 bg-navy" />
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-royal/30 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-royaldark/20 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <motion.p variants={staggerItem} className="text-white/70 text-sm uppercase tracking-widest mb-3">
              Next Step
            </motion.p>
            <motion.h2 variants={staggerItem} className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to achieve similar results?
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/60 text-sm max-w-md mx-auto mb-8">
              Tell us about your challenge and we&apos;ll scope a solution tailored to your business.
            </motion.p>
            <motion.div variants={staggerItem} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button to="/get-pricing" size="lg" className="bg-white text-navy hover:bg-white/90">
                Discuss Your Project <ArrowRight size={18} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}
