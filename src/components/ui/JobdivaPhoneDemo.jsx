import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Check,
  ChevronRight,
  ClipboardList,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import PriJobsMark from "./PriJobsMark";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

const JOBS = [
  {
    id: "react",
    title: "Senior React Developer",
    location: "Remote · US",
    type: "Contract",
    salary: "$85–95/hr",
    tags: ["React", "TypeScript"],
    isNew: true,
    desc: "Build modern web apps for enterprise clients. 5+ years React experience.",
  },
  {
    id: "cloud",
    title: "Cloud Architect",
    location: "St. Louis, MO",
    type: "Full-time",
    salary: "$140k–165k",
    tags: ["AWS", "Azure"],
    isNew: true,
    desc: "Lead cloud migrations and architecture for Fortune 500 accounts.",
  },
  {
    id: "data",
    title: "Data Engineer",
    location: "Hybrid · Chicago",
    type: "Contract",
    salary: "$75–90/hr",
    tags: ["Python", "Spark"],
    isNew: false,
    desc: "Design pipelines and analytics platforms for PRI Global clients.",
  },
];

const ALERTS = [
  { id: "a1", jobId: "react", text: "New match: Senior React Developer", time: "2m ago" },
  { id: "a2", jobId: "cloud", text: "Cloud Architect — PRI Global posted", time: "1h ago" },
  { id: "a3", jobId: "data", text: "3 new roles in Data Engineering", time: "Today" },
];

const APPLICATIONS = [
  { id: "react", title: "Senior React Developer", status: "In Review", color: "#6BA3F5" },
  { id: "cloud", title: "Cloud Architect", status: "Submitted", color: "#4ade80" },
];

const TABS = [
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "alerts", label: "Alerts", icon: Bell, badge: true },
  { id: "apps", label: "Apps", icon: ClipboardList },
];

function JobCard({ job, onClick, selected }) {
  return (
    <button
      type="button"
      onClick={() => onClick(job)}
      className={`w-full text-left rounded-xl border p-3 flex items-start justify-between gap-2 transition-all duration-200 cursor-pointer ${
        selected
          ? "border-[#2B6FD4]/50 bg-[#2B6FD4]/10 ring-1 ring-[#2B6FD4]/30"
          : "border-white/[0.08] bg-white/[0.04] hover:border-[#2B6FD4]/35 hover:bg-white/[0.07] active:scale-[0.98]"
      }`}
    >
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-white leading-snug">{job.title}</p>
        <p className="text-[9px] text-white/40 mt-0.5">{job.location}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="text-[7px] font-medium text-white/50 bg-white/[0.06] px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {job.isNew && (
        <span className="text-[8px] font-bold uppercase text-[#4ade80] bg-[#4ade80]/10 px-1.5 py-0.5 rounded shrink-0">
          New
        </span>
      )}
    </button>
  );
}

function ScreenJobs({ onSelectJob, selectedId }) {
  return (
    <motion.div
      key="screen-jobs"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex flex-col h-full min-h-0"
    >
      <PriJobsMark size="md" variant="onDark" className="mb-3" />
      <p className="text-sm font-heading font-bold text-white mb-0.5">Welcome back!</p>
      <p className="text-[10px] text-white/45 mb-3">PRI Global job search</p>
      <div className="rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-[10px] text-white/40 mb-3 flex items-center gap-2">
        <Search size={11} className="shrink-0" />
        Search jobs, skills, keywords…
      </div>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-white/45 mb-2">
        Featured jobs · tap to view
      </p>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {JOBS.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={onSelectJob}
            selected={selectedId === job.id}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ScreenDetail({ job, onBack, onApply, applying }) {
  return (
    <motion.div
      key="screen-detail"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="flex flex-col h-full min-h-0"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-[10px] text-[#6BA3F5] mb-3 hover:text-white transition-colors shrink-0"
      >
        <ArrowLeft size={12} /> Back to jobs
      </button>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#6BA3F5] mb-1">
        {job.type}
      </p>
      <h3 className="text-[13px] font-heading font-bold text-white leading-snug mb-1">
        {job.title}
      </h3>
      <p className="text-[10px] text-white/45 flex items-center gap-1 mb-3">
        <MapPin size={10} /> {job.location}
      </p>
      <p className="text-[11px] font-semibold text-white mb-3">{job.salary}</p>
      <p className="text-[10px] text-white/55 leading-relaxed mb-4 flex-1">{job.desc}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="text-[8px] font-medium text-white/60 bg-white/[0.08] px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <motion.button
        type="button"
        onClick={onApply}
        disabled={applying}
        whileTap={{ scale: 0.96 }}
        animate={
          applying
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0 rgba(43,111,212,0.4)",
                  "0 0 0 8px rgba(43,111,212,0)",
                  "0 0 0 0 rgba(43,111,212,0)",
                ],
              }
        }
        transition={applying ? {} : { duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="w-full py-2.5 rounded-xl text-[11px] font-bold text-white bg-gradient-to-r from-[#2B6FD4] to-[#7B3FE4] disabled:opacity-70 cursor-pointer"
      >
        {applying ? "Submitting…" : "Apply in one tap →"}
      </motion.button>
    </motion.div>
  );
}

function ScreenApplied({ job, onViewApps }) {
  return (
    <motion.div
      key="screen-applied"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex flex-col items-center justify-center h-full min-h-0 text-center px-2"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
        className="w-14 h-14 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center mb-4"
      >
        <Check size={28} className="text-[#4ade80]" strokeWidth={2.5} />
      </motion.div>
      <p className="text-sm font-heading font-bold text-white mb-1">Application sent!</p>
      <p className="text-[10px] text-white/50 mb-1">{job.title}</p>
      <p className="text-[9px] text-white/40 mb-5 leading-relaxed">
        PRI recruiters will review your profile shortly.
      </p>
      <button
        type="button"
        onClick={onViewApps}
        className="text-[10px] font-semibold text-[#6BA3F5] hover:text-white transition-colors"
      >
        View my applications →
      </button>
    </motion.div>
  );
}

function ScreenAlerts({ onSelectJob }) {
  return (
    <motion.div
      key="screen-alerts"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex flex-col h-full min-h-0"
    >
      <p className="text-sm font-heading font-bold text-white mb-1 shrink-0">Job alerts</p>
      <p className="text-[10px] text-white/45 mb-4">Matches based on your profile</p>
      <div className="space-y-2 flex-1">
        {ALERTS.map((alert, i) => {
          const job = JOBS.find((j) => j.id === alert.jobId);
          return (
            <motion.button
              key={alert.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => job && onSelectJob(job)}
              className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 hover:border-[#2B6FD4]/35 hover:bg-white/[0.07] transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2B6FD4]/20 flex items-center justify-center shrink-0">
                  <Bell size={12} className="text-[#6BA3F5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium text-white leading-snug">{alert.text}</p>
                  <p className="text-[8px] text-white/35 mt-0.5">{alert.time}</p>
                </div>
                <ChevronRight size={12} className="text-white/25 shrink-0 mt-0.5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function ScreenApplications() {
  return (
    <motion.div
      key="screen-apps"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="flex flex-col h-full min-h-0"
    >
      <p className="text-sm font-heading font-bold text-white mb-1 shrink-0">My applications</p>
      <p className="text-[10px] text-white/45 mb-4">{APPLICATIONS.length} active</p>
      <div className="space-y-2 flex-1">
        {APPLICATIONS.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3"
          >
            <p className="text-[11px] font-semibold text-white">{app.title}</p>
            <p className="text-[9px] text-white/40 mt-0.5">PRI Global</p>
            <span
              className="inline-block mt-2 text-[8px] font-bold uppercase px-2 py-0.5 rounded-full"
              style={{ color: app.color, backgroundColor: `${app.color}18` }}
            >
              {app.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function PushToast({ job, onDismiss, onTap }) {
  return (
    <motion.button
      type="button"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      onClick={onTap}
      className="absolute top-9 left-2 right-2 z-20 rounded-xl bg-[#1a1a24]/95 border border-white/10 backdrop-blur-md p-2.5 flex items-center gap-2 shadow-lg text-left cursor-pointer hover:border-[#2B6FD4]/40 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-[#2B6FD4]/25 flex items-center justify-center shrink-0">
        <Bell size={14} className="text-[#6BA3F5]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold text-white/50 uppercase">Job alert</p>
        <p className="text-[10px] font-medium text-white truncate">{job.title}</p>
      </div>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            onDismiss();
          }
        }}
        className="text-white/30 hover:text-white text-[10px] px-1"
        aria-label="Dismiss notification"
      >
        ✕
      </span>
    </motion.button>
  );
}

/** Interactive PRI Jobs phone demo — tap jobs, apply, switch tabs, receive alerts. */
export default function JobdivaPhoneDemo({ className = "", showHint = true, hintClassName = "" }) {
  const reducedMotion = useReducedMotion();
  const [tab, setTab] = useState("jobs");
  const [screen, setScreen] = useState("list");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const toastShown = useRef(false);

  const markInteraction = useCallback(() => setHasInteracted(true), []);

  useEffect(() => {
    if (reducedMotion || toastShown.current || tab !== "jobs" || screen !== "list") return undefined;

    const timer = setTimeout(() => {
      if (!toastShown.current) {
        setShowToast(true);
        toastShown.current = true;
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [reducedMotion, tab, screen]);

  const selectJob = (job) => {
    markInteraction();
    setSelectedJob(job);
    setScreen("detail");
    setShowToast(false);
  };

  const handleApply = () => {
    markInteraction();
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setScreen("applied");
    }, reducedMotion ? 0 : 900);
  };

  const handleTab = (id) => {
    markInteraction();
    setTab(id);
    setScreen("list");
    setSelectedJob(null);
    setShowToast(false);
  };

  const renderContent = () => {
    if (screen === "detail" && selectedJob) {
      return (
        <ScreenDetail
          job={selectedJob}
          onBack={() => {
            setScreen("list");
            setSelectedJob(null);
          }}
          onApply={handleApply}
          applying={applying}
        />
      );
    }
    if (screen === "applied" && selectedJob) {
      return (
        <ScreenApplied
          job={selectedJob}
          onViewApps={() => {
            setTab("apps");
            setScreen("list");
          }}
        />
      );
    }
    if (tab === "alerts") {
      return <ScreenAlerts onSelectJob={selectJob} />;
    }
    if (tab === "apps") {
      return <ScreenApplications />;
    }
    return <ScreenJobs onSelectJob={selectJob} selectedId={selectedJob?.id} />;
  };

  return (
    <div className={`relative mx-auto w-[230px] sm:w-[250px] shrink-0 ${className}`}>
      <div className="absolute -inset-6 bg-gradient-to-br from-[#2B6FD4]/25 via-[#7B3FE4]/15 to-[#D91E5A]/20 rounded-[3rem] blur-2xl pointer-events-none" />

      <div
        className="relative rounded-[2.25rem] border-[7px] border-[#1a1a24] bg-[#1a1a24] shadow-2xl shadow-black/40 overflow-hidden flex flex-col"
        style={{ height: "492px" }}
        role="application"
        aria-label="Interactive PRI Jobs app demo — tap jobs and tabs to explore"
      >
        <div className="h-7 shrink-0 bg-[#1a1a24] flex items-center justify-center relative">
          <div className="w-20 h-1 rounded-full bg-white/15" />
        </div>

        <div className="relative bg-[#0d0f14] px-3.5 pt-3 flex flex-col flex-1 min-h-0">
          <AnimatePresence>
            {showToast && tab === "jobs" && screen === "list" && (
              <PushToast
                key="toast"
                job={JOBS[0]}
                onDismiss={() => setShowToast(false)}
                onTap={() => selectJob(JOBS[0])}
              />
            )}
          </AnimatePresence>

          <div className="flex-1 min-h-0 overflow-hidden pb-2">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>

          <nav
            className={`flex shrink-0 h-[52px] border-t border-white/[0.08] -mx-3.5 px-1 bg-[#0a0c10] transition-opacity ${
              screen === "list" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="App navigation demo"
            aria-hidden={screen !== "list"}
          >
            {TABS.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTab(id)}
                tabIndex={screen === "list" ? 0 : -1}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 rounded-lg transition-colors cursor-pointer ${
                  tab === id ? "text-[#6BA3F5]" : "text-white/35 hover:text-white/55"
                }`}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon size={15} strokeWidth={tab === id ? 2.2 : 1.6} />
                <span className="text-[8px] font-medium">{label}</span>
                {badge && tab !== "alerts" && (
                  <span className="absolute top-1 right-[22%] w-1.5 h-1.5 rounded-full bg-[#D91E5A]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {showHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-4 text-center text-[10px] flex items-center justify-center gap-1.5 ${hintClassName || "text-[var(--text-muted)]"}`}
        >
          <Sparkles size={11} className="text-[#2B6FD4] shrink-0" aria-hidden />
          {!hasInteracted ? "Tap a job or tab to explore" : "Interactive demo"}
        </motion.p>
      )}
    </div>
  );
}
