import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ExternalLink, ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PortalCard from "../../components/portal/PortalCard";
import Button from "../../components/ui/Button";
import {
  DEMO_APPLICATIONS,
  DEMO_SAVED_JOBS,
  RECRUITER,
  RECRUITER_MESSAGE,
  INTERVIEW_PREP_LINKS,
} from "../../data/portalDemoData";
import { STATUS_STYLES } from "../../components/portal/portalStyles";
import { Briefcase, FileText, MessageSquare, BookmarkIcon } from "lucide-react";

export default function CandidateDashboard() {
  const [messageOpen, setMessageOpen] = useState(false);

  return (
    <>
      <SEO title="Candidate Dashboard" description="PRI Global candidate dashboard." url="/candidate-dashboard" noindex />
        {/* Status banner */}
        <section className="mb-8 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Profile Active — Visible to Recruiters
          </span>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Your profile is 75% complete. Add your certifications to improve visibility.
          </p>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-3/4" />
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <PortalCard icon={FileText} value="3" label="Active Applications" color="green" />
          <PortalCard icon={Briefcase} value="Live" label="Open Positions on Job Board" color="green" />
          <PortalCard icon={MessageSquare} value="1" label="New Message from PRI Recruiter" color="green" />
          <PortalCard icon={BookmarkIcon} value="2" label="Saved Jobs" color="green" />
        </div>

        {/* Applications */}
        <section id="applications" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">My Applications</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  {["Role", "Company", "Status", "Applied", "Action"].map((h) => (
                    <th key={h} className="text-left p-3 font-semibold text-[var(--text-primary)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_APPLICATIONS.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}>
                    <td className="p-3 font-medium">{row.role}</td>
                    <td className="p-3 text-[var(--text-secondary)]">{row.company}</td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[row.statusColor]}`}>{row.status}</span>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">{row.applied}</td>
                    <td className="p-3"><button type="button" className="text-emerald-600 text-sm font-medium hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Saved jobs */}
        <section id="saved" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Saved Jobs</h2>
          <div className="space-y-3">
            {DEMO_SAVED_JOBS.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{job.role}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Saved {job.saved}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button to="/candidate-jobs" size="sm" variant="secondary">
                    View Job
                  </Button>
                  <button type="button" className="text-sm text-[var(--text-muted)] hover:text-red-500 px-2">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open positions */}
        <section className="mb-10">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Open Positions</h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-[var(--text-primary)]">Search live IT roles on PRI Global&apos;s job board</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Contract, contract-to-hire, and direct hire — updated daily via JobDiva.
              </p>
            </div>
            <Button to="/candidate-jobs" size="sm" className="!bg-emerald-600 hover:!bg-emerald-700 shrink-0">
              Search Jobs <ArrowRight size={16} />
            </Button>
          </div>
        </section>

        {/* Message */}
        <section id="messages" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Message from Recruiter</h2>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
            <img
              src={RECRUITER.photo}
              alt={RECRUITER.name}
              className="w-12 h-12 rounded-full object-cover object-top shrink-0 ring-2 ring-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)]">{RECRUITER.name}, {RECRUITER.title}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2">
                Hi Alex, I came across your profile and have an exciting opportunity that matches your React and AWS background...
              </p>
              <button type="button" onClick={() => setMessageOpen(true)} className="mt-3 text-sm font-semibold text-emerald-600 hover:underline">
                Read Message →
              </button>
            </div>
          </div>
        </section>

        {/* Interview prep */}
        <section id="prep" className="scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Interview Prep Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {INTERVIEW_PREP_LINKS.map((link) => {
              const className =
                "group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-emerald-500/40 transition-colors text-sm font-medium text-[var(--text-primary)]";
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {link.label} <ExternalLink size={14} className="text-[var(--text-muted)]" />
                  </a>
                );
              }
              return (
                <Link key={link.label} to={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </section>

        <AnimatePresence>
          {messageOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={() => setMessageOpen(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-[var(--bg-card)] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto border border-[var(--border)] shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading font-bold text-lg">Message from {RECRUITER.name}</h3>
                  <button type="button" onClick={() => setMessageOpen(false)} aria-label="Close"><X size={20} /></button>
                </div>
                <pre className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-sans leading-relaxed">{RECRUITER_MESSAGE}</pre>
                <Button href="mailto:info@priglobal.com" className="mt-6 !bg-emerald-600 hover:!bg-emerald-700 w-full sm:w-auto">
                  <Mail size={16} /> Reply
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}
