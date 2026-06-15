import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import CandidateCareersNav from "../components/portal/CandidateCareersNav";
import Button from "../components/ui/Button";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import {
  WORKING_AT_PRI_HERO,
  WORKING_AT_PRI_TRAITS,
  WORKING_AT_PRI_TRAITS_FOOTER,
  WORKING_AT_PRI_BENEFITS,
  WORKING_AT_PRI_DEI,
  WORKING_AT_PRI_HQ,
} from "../data/workingAtPri";
import { scrollToPageTop } from "../utils/scrollToPageTop";
import { OFFICE_PHOTOS } from "../constants/links";

export default function WorkingAtPRI() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="Working at PRI"
        description="Experience industry-leading rewards, challenges, and benefits at PRI Global. Learning programs, EAP, referral bonuses, and an innovative St. Louis headquarters."
        url="/working-at-pri"
      />

      <section className="pt-24 sm:pt-32 pb-16 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              Grow With Us
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {WORKING_AT_PRI_HERO.title}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-4">{WORKING_AT_PRI_HERO.subtitle}</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">{WORKING_AT_PRI_HERO.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CandidateCareersNav />

          <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
              We Are Increasing Business Success With Technology
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Your growth is very important to us. We have become a premier professional technology
              and staffing services company by working hard to grow our employees and helping them
              with long-term career paths and good work-life balance.
            </p>
            <ul className="space-y-2 mb-4">
              {WORKING_AT_PRI_TRAITS.map((trait) => (
                <li key={trait} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  {trait}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-[var(--text-primary)]">{WORKING_AT_PRI_TRAITS_FOOTER}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {WORKING_AT_PRI_BENEFITS.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <AnimatedIcon Icon={item.icon} size={20} className="text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                {item.bullets && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.bullets.map((b) => (
                      <span key={b} className="text-xs px-2 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          <div className="mb-14">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Diversity & Inclusion</span>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mt-2 mb-4">
              {WORKING_AT_PRI_DEI.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{WORKING_AT_PRI_DEI.intro}</p>
            <div className="space-y-4">
              {WORKING_AT_PRI_DEI.points.map((point) => (
                <p key={point.slice(0, 40)} className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Corporate Headquarters</span>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mt-2 mb-3">
              {WORKING_AT_PRI_HQ.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{WORKING_AT_PRI_HQ.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OFFICE_PHOTOS.slice(0, 3).map((src, i) => (
                <div key={src} className="rounded-xl overflow-hidden aspect-video">
                  <img src={src} alt={`PRI Global office ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <p className="text-sm text-[var(--text-secondary)] mb-4">Ready to join the PRI Global team?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button to="/candidate-jobs" className="!bg-emerald-600 hover:!bg-emerald-700">
                Search Open Positions <ArrowRight size={16} />
              </Button>
              <Button to="/job-seeker-faq" variant="secondary">
                Job Seeker FAQ
              </Button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Questions? <Link to="/get-pricing" className="text-royal hover:underline">Contact our team</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
