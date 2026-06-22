import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import CandidateCareersNav from "../components/portal/CandidateCareersNav";
import Button from "../components/ui/Button";
import { JOB_SEEKER_FAQ_ITEMS } from "../data/jobSeekerFaq";
import { scrollToPageTop } from "../utils/scrollToPageTop";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-[var(--border)] rounded-2xl bg-[var(--bg-card)] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-[var(--text-primary)] text-sm sm:text-base leading-snug">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function JobSeekerFAQ() {
  const [openId, setOpenId] = useState(JOB_SEEKER_FAQ_ITEMS[0]?.id ?? null);

  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="Job Seeker FAQ"
        description="Answers about benefits, vacation, visa sponsorship, referrals, and career growth at PRI Global. Can't find your answer? Contact our recruiting team today."
        keywords="PRI Global jobs FAQ, IT staffing benefits, job seeker questions, career at PRI Global"
        url="/job-seeker-faq"
        faq={JOB_SEEKER_FAQ_ITEMS}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
          { name: "Job Seeker FAQ", url: "/job-seeker-faq" },
        ]}
      />

      <section className="page-hero pb-16 md:pb-20 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Careers", url: "/careers" },
              { name: "Job Seeker FAQ", url: "/job-seeker-faq" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              Job Seekers
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
              Job Seeker FAQ
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Answers to your questions about working for PRI Global. If you don&apos;t find
              what you&apos;re looking for, please feel free to contact us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CandidateCareersNav />

          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {JOB_SEEKER_FAQ_ITEMS.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((v) => (v === item.id ? null : item.id))}
              />
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-center">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Still have questions? Our talent team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button href="mailto:info@priglobal.com" variant="secondary" size="md">
                <Mail size={16} /> Contact Us
              </Button>
              <Button to="/candidate-jobs" size="md" className="!bg-emerald-600 hover:!bg-emerald-700">
                Search Open Positions
              </Button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Or visit{" "}
              <Link to="/careers" className="text-royal hover:underline">
                Careers at PRI Global
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
