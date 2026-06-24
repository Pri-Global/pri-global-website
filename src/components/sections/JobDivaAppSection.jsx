import { motion } from "framer-motion";
import {
  Bell,
  ClipboardList,
  FileUp,
  MessageCircle,
  Search,
  UserCircle,
  Zap,
} from "lucide-react";
import AppStoreButtons from "../ui/AppStoreButtons";
import AnimatedIcon from "../ui/AnimatedIcon";
import Button from "../ui/Button";
import PriJobsMark from "../ui/PriJobsMark";
import JobdivaPhoneDemo from "../ui/JobdivaPhoneDemo";
import { PRI_JOBS_MOBILE_APP_URL } from "../../constants/links";

const EASE = [0.22, 1, 0.36, 1];

const highlights = [
  {
    icon: Bell,
    title: "Get notified",
    desc: "Personalized job alerts that match your skills and interests.",
  },
  {
    icon: Zap,
    title: "Apply instantly",
    desc: "Apply to PRI Global openings in seconds, right from your phone.",
  },
  {
    icon: MessageCircle,
    title: "Stay connected",
    desc: "Track applications and stay in touch with PRI recruiters on the go.",
  },
];

const features = [
  {
    icon: FileUp,
    title: "Upload your resume",
    desc: "Create your profile and upload your resume in minutes.",
  },
  {
    icon: Search,
    title: "Search & apply",
    desc: "Find roles that match your skills and apply with one tap.",
  },
  {
    icon: Bell,
    title: "Job alerts",
    desc: "Receive notifications when new opportunities fit your profile.",
  },
  {
    icon: ClipboardList,
    title: "Track applications",
    desc: "See application status and next steps in real time.",
  },
  {
    icon: MessageCircle,
    title: "Communicate",
    desc: "Connect directly with PRI Global recruiters and hiring teams.",
  },
  {
    icon: UserCircle,
    title: "Manage your profile",
    desc: "Update experience, preferences, and availability anytime.",
  },
];

function PriJobsHeroBlock({ showPortalNote = true, className = "" }) {
  return (
    <div className={`grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-12 items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="min-w-0"
      >
        <PriJobsMark size="hero" variant="onDark" className="mb-6" />
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight mb-3">
          Your career. Anytime. Anywhere.
        </h2>
        <p className="text-white/70 leading-relaxed mb-6 max-w-lg text-sm sm:text-base">
          Manage your PRI Global job search from your phone — create a profile, upload your resume,
          apply to open roles, get matched job alerts, and track recruiter conversations without
          waiting until you&apos;re back at a desk.
        </p>
        <p className="text-sm font-medium text-white/90 mb-3">Download PRI Jobs</p>
        <AppStoreButtons />
        {showPortalNote && (
          <p className="text-xs text-white/45 mt-5 leading-relaxed max-w-lg">
            Works alongside the PRI Global candidate portal on the web — search, apply, and stay
            updated wherever you are.
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        className="hidden md:block"
      >
        <JobdivaPhoneDemo hintClassName="text-white/45" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        className="space-y-5"
      >
        {highlights.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center shrink-0">
              <AnimatedIcon Icon={item.icon} size={18} className="text-[#6BA3F5]" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-white">{item.title}</p>
              <p className="text-xs text-white/55 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PriJobsHeroLight({ showPortalNote = true, showPhoneDemo = true, className = "" }) {
  return (
    <div className={`grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="min-w-0"
      >
        <div className="inline-flex items-center rounded-2xl bg-[#0d0f14] px-4 py-3 mb-6">
          <PriJobsMark size="lg" variant="onDark" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2B6FD4] dark:text-[#6BA3F5] mb-2">
          PRI Jobs mobile app
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-3">
          PRI Jobs
        </h2>
        <p className="text-lg font-semibold bg-gradient-to-r from-[#2B6FD4] to-[#D91E5A] bg-clip-text text-transparent mb-4">
          Your career. Anytime. Anywhere.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-6 max-w-lg">
          Manage your PRI Global job search from your phone — alerts, one-tap applications, and
          recruiter updates on iOS and Android.
        </p>
        <AppStoreButtons />
        {showPortalNote && (
          <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed max-w-lg">
            Search and apply on the go — the same PRI Global openings you see on our job board.
          </p>
        )}
      </motion.div>

      {showPhoneDemo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="hidden sm:block"
        >
          <JobdivaPhoneDemo />
        </motion.div>
      )}
    </div>
  );
}

export function PriJobsAppCompact({ className = "" }) {
  return (
    <aside
      className={`relative overflow-hidden rounded-2xl border border-[#2B6FD4]/20 bg-gradient-to-br from-[#2B6FD4]/[0.06] via-[var(--bg-card)] to-[#D91E5A]/[0.05] p-6 sm:p-8 ${className}`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#D91E5A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0">
          <div className="rounded-xl bg-[#0d0f14] px-3 py-2.5 shrink-0">
            <PriJobsMark size="md" variant="onDark" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2B6FD4] dark:text-[#6BA3F5] mb-1">
              PRI Jobs mobile app
            </p>
            <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
              Search jobs anytime, anywhere
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Download PRI Jobs for job alerts, one-tap applications, and recruiter updates.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
          <AppStoreButtons compact />
          <Button to={PRI_JOBS_MOBILE_APP_URL} variant="secondary" size="sm">
            Learn more
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default function PriJobsAppSection({
  showPortalNote = true,
  theme = "light",
  showHighlights = true,
  showPhoneDemo = true,
  showHero = true,
}) {
  const isDark = theme === "dark";

  return (
    <div>
      {isDark ? (
        showHero && <PriJobsHeroBlock showPortalNote={showPortalNote} className="mb-16 lg:mb-20" />
      ) : (
        <>
          {showHero && (
            <PriJobsHeroLight
              showPortalNote={showPortalNote}
              showPhoneDemo={showPhoneDemo}
              className="mb-12 lg:mb-16"
            />
          )}
          {showHero && showHighlights && (
            <div className="grid sm:grid-cols-3 gap-4 mb-16 lg:mb-20">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2B6FD4]/10 flex items-center justify-center mb-3">
                    <AnimatedIcon Icon={item.icon} size={18} className="text-[#2B6FD4] dark:text-[#6BA3F5]" />
                  </div>
                  <p className="font-heading font-bold text-sm text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center mb-3">
          Everything you need to advance your career
        </h3>
        <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 text-sm sm:text-base">
          Never miss an opportunity. Stay connected to PRI Global and receive roles that match your
          skills and career goals.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-[#2B6FD4]/30 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2B6FD4]/15 to-[#D91E5A]/10 flex items-center justify-center mb-4 group-hover:from-[#2B6FD4]/20 group-hover:to-[#D91E5A]/15 transition-colors">
                <AnimatedIcon Icon={item.icon} size={22} className="text-[#2B6FD4] dark:text-[#6BA3F5]" />
              </div>
              <h4 className="font-heading font-bold text-[var(--text-primary)] mb-2">{item.title}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mt-12 relative overflow-hidden rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, #0d0f14 0%, #1a2a4a 45%, #3d1a3a 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B6FD4]/20 via-transparent to-[#D91E5A]/20 pointer-events-none" />
        <div className="relative flex items-start gap-4 text-white max-w-xl">
          <div className="rounded-xl bg-white/[0.08] px-2.5 py-2 shrink-0">
            <PriJobsMark size="md" variant="onDark" />
          </div>
          <div>
            <p className="font-heading text-xl sm:text-2xl font-bold leading-snug mb-2">
              Opportunities are just a tap away.
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Download PRI Jobs and take the next step toward your future with PRI Global.
            </p>
          </div>
        </div>
        <AppStoreButtons className="relative md:justify-end" />
      </motion.div>
    </div>
  );
}

export { PriJobsHeroBlock, JobdivaPhoneDemo as PriJobsPhoneDemo };

/** @deprecated Use PriJobsAppCompact */
export const JobDivaAppCompact = PriJobsAppCompact;
