import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseStudies, featuredCaseStudies } from "../../data/caseStudies";
import SectionHeading from "../ui/SectionHeading";
import CaseStudyMetric from "../caseStudies/CaseStudyMetric";
import CaseStudyImage from "../caseStudies/CaseStudyImage";
import { useInView } from "../../hooks/useInView";

const EASE = [0.22, 1, 0.36, 1];

const contentStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const metricStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const metricItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
};

export function CaseStudyCard({ study, index = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:border-royal/50 dark:hover:border-royaldark/50 hover:shadow-xl hover:shadow-royal/8 transition-colors duration-300 h-full"
    >
      <Link to={`/case-studies/${study.slug}`} className="block shrink-0 overflow-hidden">
        <CaseStudyImage study={study} variant="card" />
      </Link>

      <motion.div
        variants={contentStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="px-6 pb-6 pt-5 flex flex-col flex-1"
      >
        <motion.div variants={contentItem}>
          <Link to={`/case-studies/${study.slug}`}>
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] line-clamp-2 mb-4 group-hover:text-royal dark:group-hover:text-royaldark transition-colors">
              {study.title}
            </h3>
          </Link>
        </motion.div>

        <motion.div
          variants={contentItem}
          className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 mb-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-royal dark:text-royaldark mb-1.5">
            Challenge
          </p>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
            {study.challenge}
          </p>
        </motion.div>

        <motion.div
          variants={metricStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-2.5 mb-5"
        >
          {study.results.map((r) => (
            <motion.div
              key={r.label}
              variants={metricItem}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl bg-royal/[0.04] dark:bg-royaldark/[0.06] border border-royal/10 dark:border-royaldark/15 p-3 min-h-[5.5rem] flex items-center"
            >
              <CaseStudyMetric
                metric={r.cardMetric ?? r.metric}
                label={r.label}
                animate={inView}
                size="sm"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={contentItem} className="flex flex-wrap gap-1.5 mb-6">
          {study.tags.slice(0, 3).map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + ti * 0.05, type: "spring", stiffness: 400, damping: 20 }}
              className="px-2.5 py-0.5 rounded-full text-[11px] bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)]"
            >
              {tag}
            </motion.span>
          ))}
          {study.tags.length > 3 && (
            <span className="px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
              +{study.tags.length - 3}
            </span>
          )}
        </motion.div>

        <motion.div variants={contentItem} className="mt-auto">
          <Link
            to={`/case-studies/${study.slug}`}
            className="group/btn inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-royal/25 dark:border-royaldark/30 text-sm font-semibold text-royal dark:text-royaldark hover:bg-royal hover:text-white dark:hover:bg-royaldark dark:hover:text-white transition-colors"
          >
            Read Case Study
            <motion.span
              className="inline-flex"
              initial={false}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function CaseStudiesGrid({ studies = caseStudies, className = "" }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${className}`}>
      {studies.map((study, i) => (
        <CaseStudyCard key={study.id} study={study} index={i} />
      ))}
    </div>
  );
}

function CaseStudiesViewAll({ total = caseStudies.length, shown }) {
  if (shown >= total) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE }}
      className="mt-10 text-center"
    >
      <Link
        to="/resources"
        state={{ tab: "Case Studies" }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-royal dark:text-royaldark hover:underline"
      >
        View all {total} success stories
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

function CaseStudiesCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mt-14 text-center max-w-lg mx-auto p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[var(--text-secondary)] text-sm mb-1"
      >
        Explore our full library of client success stories.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="font-heading font-semibold text-[var(--text-primary)] mb-6"
      >
        Have a project to discuss?
      </motion.p>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/get-pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm shadow-royal/20"
        >
          Let&apos;s Talk <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function CaseStudiesContent({ showCta = false, studies = caseStudies }) {
  return (
    <>
      <CaseStudiesGrid studies={studies} />
      {showCta && <CaseStudiesCta />}
    </>
  );
}

export default function CaseStudies({
  showHeader = true,
  showResourcesCta = false,
  limit,
  studies = limit ? featuredCaseStudies.slice(0, limit) : caseStudies,
  showViewAll = Boolean(limit),
}) {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] relative overflow-hidden">
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-royal/5 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showHeader && (
          <SectionHeading
            label="Success Stories"
            heading="Real Results for Real Businesses"
            subheading="See how PRI Global delivers measurable outcomes across industries."
            className="mb-12"
          />
        )}
        <CaseStudiesGrid studies={studies} />
        {showViewAll && <CaseStudiesViewAll shown={studies.length} />}
        {showResourcesCta && <CaseStudiesCta />}
      </div>
    </section>
  );
}
