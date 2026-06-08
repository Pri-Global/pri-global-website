import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ExternalLink, Lock } from "lucide-react";
import SEO from "../../components/SEO";
import PortalLayout from "../../components/portal/PortalLayout";
import PortalCard from "../../components/portal/PortalCard";
import Button from "../../components/ui/Button";
import BrandLogo from "../../components/ui/BrandLogo";
import { AUTH_KEYS, usePortalAuth } from "../../hooks/usePortalAuth";
import { HIRING_NAV, SERVICES_NAV } from "../../data/portalNav";
import { HIRING_SHORTLIST, HUBSPOT_URL } from "../../data/portalDemoData";
import { Briefcase, Users, Calendar, Ticket, BrainCircuit } from "lucide-react";
import pr1smLogo from "../../assets/pr1sm-logo.png";

function SkillDots({ level }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < level ? "bg-royal" : "bg-[var(--border)]"}`} />
      ))}
    </span>
  );
}

function HiringDashboard({ session }) {
  const [interviewModal, setInterviewModal] = useState(null);
  const [jobModal, setJobModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <PortalCard icon={Briefcase} value="2" label="Active Searches" color="royal" />
        <PortalCard icon={Users} value="8" label="Candidates in Pipeline" color="royal" />
        <PortalCard icon={Calendar} value="1" label="Interview Scheduled" color="royal" />
      </div>

      <section id="searches" className="mb-10 scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Active Job Searches</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-[var(--bg-secondary)]">
              <tr>{["Role", "Status", "Candidates", "Started", "Recruiter"].map((h) => <th key={h} className="text-left p-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                { role: "Senior React Developer", candidates: "4 candidates shortlisted", started: "1 week ago" },
                { role: "Cloud Architect", candidates: "3 candidates in review", started: "2 weeks ago" },
              ].map((row, i) => (
                <tr key={row.role} className={i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}>
                  <td className="p-3 font-medium">{row.role}</td>
                  <td className="p-3"><span className="text-xs text-emerald-600 font-semibold">● Active</span></td>
                  <td className="p-3 text-[var(--text-secondary)]">{row.candidates}</td>
                  <td className="p-3 text-[var(--text-muted)]">{row.started}</td>
                  <td className="p-3">Sarah M.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="shortlist" className="mb-10 scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Shortlist: Senior React Developer</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {HIRING_SHORTLIST.map((c) => (
            <div key={c.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-heading font-bold text-[var(--text-primary)]">{c.name}</h3>
              <p className="text-sm text-[var(--text-muted)]">{c.experience} · {c.location}</p>
              <div className="mt-3 space-y-1.5">
                {c.skills.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <span>{s.name}</span><SkillDots level={s.level} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-emerald-600 mt-3 font-medium">{c.status}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button type="button" className="text-xs font-semibold text-royal hover:underline">View Full Profile</button>
                <button type="button" onClick={() => setInterviewModal(c)} className="text-xs font-semibold text-royal hover:underline">Schedule Interview</button>
                <button type="button" className="text-xs text-[var(--text-muted)] hover:underline">Pass</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="messages" className="mb-10 scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Messages</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Hi, we&apos;ve shortlisted 4 strong React candidates. Candidate A has 8 years of financial services experience which matches your requirements exactly. Shall we schedule interviews for Thursday?
          </p>
          <Button href="mailto:info@priglobal.com" size="sm" variant="secondary" className="mt-4"><Mail size={14} /> Reply →</Button>
        </div>
      </section>

      <section>
        <h2 className="font-heading font-bold text-lg mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => setJobModal(true)}>Submit a New Job Request</Button>
          <Button href={HUBSPOT_URL} target="_blank" rel="noopener noreferrer" size="sm" variant="secondary">Book a Call with Recruiter</Button>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] opacity-60"><Lock size={14} /> View All Placements — coming soon</span>
        </div>
      </section>

      <AnimatePresence>
        {interviewModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={() => setInterviewModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-[var(--bg-card)] rounded-2xl p-6 max-w-sm w-full border border-[var(--border)]">
              <h3 className="font-heading font-bold mb-4">Schedule Interview — {interviewModal.name}</h3>
              <input type="date" className="w-full mb-4 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-sm" />
              <p className="text-sm text-[var(--text-muted)] mb-2">Time slot</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {["9 AM", "11 AM", "2 PM", "4 PM"].map((t) => (
                  <button key={t} type="button" className="py-2 rounded-lg border border-[var(--border)] text-sm hover:border-royal">{t}</button>
                ))}
              </div>
              <Button href={`mailto:info@priglobal.com?subject=${encodeURIComponent(`Interview Request: ${interviewModal.name}`)}`} className="w-full">Book Interview</Button>
            </motion.div>
          </motion.div>
        )}
        {jobModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={() => setJobModal(false)}>
            <motion.div onClick={(e) => e.stopPropagation()} className="bg-[var(--bg-card)] rounded-2xl p-6 max-w-md w-full border border-[var(--border)]">
              <div className="flex justify-between mb-4"><h3 className="font-heading font-bold">New Job Request</h3><button type="button" onClick={() => setJobModal(false)}><X size={18} /></button></div>
              <textarea rows={4} placeholder="Describe the role, skills, and timeline..." className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-sm mb-4" />
              <Button href={`mailto:info@priglobal.com?subject=${encodeURIComponent("New Job Request from Client Portal")}`} className="w-full">Submit Request</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <PortalCard icon={Briefcase} value="2" label="Active Projects" color="amber" />
        <PortalCard icon={Ticket} value="1" label="Open Support Ticket" color="amber" />
        <PortalCard icon={BrainCircuit} value="●" label="PR1SM.AI: Connected" color="amber" />
      </div>

      <section id="prism" className="mb-10 scroll-mt-24">
        <div className="rounded-2xl border-2 border-amber-500/40 bg-navy p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img src={pr1smLogo} alt="PR1SM.AI" className="h-12 w-auto" />
            <div className="flex-1">
              <p className="text-emerald-400 text-sm font-semibold mb-1">● Live — Connected to your data</p>
              <p className="text-white/70 text-sm mb-4">Your AI intelligence layer is active and ready.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Show me this week's KPIs", "Summarize top support issues", "Revenue vs target this quarter"].map((q) => (
                  <span key={q} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/10">{q}</span>
                ))}
              </div>
              <Button href="https://www.pr1sm.ai" target="_blank" rel="noopener noreferrer" className="!bg-amber-500 hover:!bg-amber-600 text-navy font-semibold">
                Launch PR1SM.AI →
              </Button>
              <p className="text-xs text-white/40 mt-3">
                Need help? <a href="https://www.linkedin.com/in/robbie-wetzel" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Contact Robbie Wetzel →</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mb-10 scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Active Projects</h2>
        <div className="space-y-4">
          {[
            { name: "Cloud Migration Phase 2", status: "On Track", statusColor: "green", progress: 65, manager: "Jash Yenugu", updated: "2 days ago", alert: null },
            { name: "Data Integration Setup", status: "Needs Input", statusColor: "amber", progress: 40, manager: "Robbie Wetzel", updated: "Today", alert: "Action required: Please provide database credentials for the ERP integration." },
          ].map((p) => (
            <div key={p.name} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <h3 className="font-semibold text-[var(--text-primary)]">{p.name}</h3>
                <span className={`text-xs font-semibold ${p.statusColor === "green" ? "text-emerald-600" : "text-amber-600"}`}>● {p.status}</span>
              </div>
              <div className="h-2 bg-[var(--border)] rounded-full mb-2"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${p.progress}%` }} /></div>
              <p className="text-xs text-[var(--text-muted)]">{p.manager} · {p.updated}</p>
              {p.alert && <p className="text-xs text-amber-600 mt-2 p-2 rounded-lg bg-amber-500/10">{p.alert}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="tickets" className="mb-10 scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Support Tickets</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)]"><tr>{["Ticket #", "Issue", "Priority", "Status", "Created"].map((h) => <th key={h} className="text-left p-3">{h}</th>)}</tr></thead>
            <tbody>
              <tr className="bg-[var(--bg-card)]"><td className="p-3">#4821</td><td className="p-3">PR1SM.AI dashboard not loading</td><td className="p-3">Medium</td><td className="p-3 text-amber-600">In Progress</td><td className="p-3">Today</td></tr>
              <tr className="bg-[var(--bg-primary)]"><td className="p-3">#4756</td><td className="p-3">Monthly report export issue</td><td className="p-3">Low</td><td className="p-3 text-emerald-600">Resolved ✓</td><td className="p-3">3 days ago</td></tr>
            </tbody>
          </table>
        </div>
        <Button href="mailto:info@priglobal.com?subject=New%20Support%20Ticket" size="sm" className="mt-4">Submit New Ticket</Button>
      </section>

      <section className="mb-10">
        <h2 className="font-heading font-bold text-lg mb-4">Recent Reports</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {["Q1 2026 Performance Report", "Infrastructure Health Report — May 2026", "PR1SM.AI Usage Analytics"].map((r) => (
            <div key={r} className="flex items-center gap-2 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] opacity-60 text-sm text-[var(--text-muted)]">
              <Lock size={14} /> {r} — coming soon
            </div>
          ))}
        </div>
      </section>

      <section id="messages" className="scroll-mt-24">
        <h2 className="font-heading font-bold text-lg mb-4">Messages</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
          <p className="font-semibold text-sm">From: Liezl Moss</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
            Hi! Just checking in — the PR1SM.AI integration is looking great. Robbie needs your ERP credentials to complete the data pipeline. Can we schedule a quick call?
          </p>
          <Button href="mailto:liezl.moss@PR1SM.AI" size="sm" variant="secondary" className="mt-4"><Mail size={14} /> Reply →</Button>
        </div>
      </section>
    </>
  );
}

export default function CustomerDashboard() {
  const { session, logout } = usePortalAuth(AUTH_KEYS.customer, "/customer-login");
  const isHiring = session?.type === "hiring";
  const accent = isHiring ? "#1A56DB" : "#f59e0b";
  const nav = isHiring ? HIRING_NAV : SERVICES_NAV;

  return (
    <>
      <SEO title="Client Dashboard" description="PRI Global client dashboard." url="/customer-dashboard" noindex />
      <PortalLayout
        portalLabel="Client Portal"
        accentColor={accent}
        userName={`Welcome, ${session?.company || "Client"}`}
        userSubtitle={
          isHiring
            ? "Your dedicated recruiter: Sarah M. | 636.256.7172"
            : "Your account manager: Liezl Moss | 314-784-5854"
        }
        navItems={nav}
        onLogout={logout}
      >
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <BrandLogo mark size="md" />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
            {isHiring ? "Hiring Client" : "Services / PR1SM.AI Client"}
          </span>
        </div>
        {isHiring ? <HiringDashboard session={session} /> : <ServicesDashboard />}
      </PortalLayout>
    </>
  );
}
