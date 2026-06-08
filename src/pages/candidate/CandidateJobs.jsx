import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X } from "lucide-react";
import SEO from "../../components/SEO";
import PortalLayout from "../../components/portal/PortalLayout";
import Button from "../../components/ui/Button";
import {
  AUTH_KEYS,
  usePortalAuth,
  readStorage,
  writeStorage,
  isLoggedIn,
} from "../../hooks/usePortalAuth";
import { CANDIDATE_NAV } from "../../data/portalNav";
import { ALL_JOBS, SKILL_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";

const ACCENT = "#22c55e";

export default function CandidateJobs() {
  const authed = isLoggedIn(AUTH_KEYS.candidate);
  const { session, logout } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");
  const [keyword, setKeyword] = useState("");
  const [jobType, setJobType] = useState("All");
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState("All");
  const [applyJob, setApplyJob] = useState(null);
  const [toast, setToast] = useState("");
  const [saved, setSaved] = useState(() => readStorage(AUTH_KEYS.candidateSavedJobs, []));

  const filtered = useMemo(() => {
    return ALL_JOBS.filter((j) => {
      if (keyword && !j.title.toLowerCase().includes(keyword.toLowerCase()) && !j.skills.some((s) => s.toLowerCase().includes(keyword.toLowerCase()))) return false;
      if (jobType !== "All" && j.type !== jobType) return false;
      if (location === "Remote" && !j.location.toLowerCase().includes("remote")) return false;
      if (location === "Hybrid" && !j.location.toLowerCase().includes("hybrid")) return false;
      if (location === "On-site" && (j.location.toLowerCase().includes("remote") && !j.location.toLowerCase().includes("hybrid"))) return false;
      if (category !== "All" && j.category !== category) return false;
      return true;
    });
  }, [keyword, jobType, location, category]);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    writeStorage(AUTH_KEYS.candidateSavedJobs, next);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    const apps = readStorage(AUTH_KEYS.candidateApplications, []);
    apps.push({ jobId: applyJob.id, title: applyJob.title, submittedAt: Date.now() });
    writeStorage(AUTH_KEYS.candidateApplications, apps);
    setApplyJob(null);
    setToast("Application submitted! A recruiter will be in touch within 2 business days.");
    setTimeout(() => setToast(""), 4000);
  };

  const content = (
    <>
      <div className="flex flex-col lg:flex-row gap-3 mb-8">
        <input placeholder="Keyword search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className={`${inputClass} flex-1`} />
        <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
          {["All", "Contract", "Contract-to-Hire", "Full-time"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass}>
          {["All", "Remote", "Hybrid", "On-site"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          <option>All</option>
          {SKILL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {toast && (
        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-sm">
          {toast}
        </motion.p>
      )}

      <div className="space-y-4">
        {filtered.map((job) => (
          <motion.div key={job.id} layout className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">{job.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mr-2">{job.type}</span>
                  {job.location} · {job.rate}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--border-subtle)]">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" onClick={() => setApplyJob(job)} className="!bg-emerald-600 hover:!bg-emerald-700">Apply Now</Button>
                <button type="button" onClick={() => toggleSave(job.id)} className={`w-9 h-9 rounded-lg border flex items-center justify-center ${saved.includes(job.id) ? "text-emerald-600 border-emerald-500/40" : "border-[var(--border)]"}`} aria-label="Save">
                  <Bookmark size={16} fill={saved.includes(job.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {applyJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50" onClick={() => setApplyJob(null)}>
            <motion.form initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onSubmit={submitApplication} onClick={(e) => e.stopPropagation()} className="bg-[var(--bg-card)] rounded-2xl p-6 max-w-md w-full border border-[var(--border)]">
              <div className="flex justify-between mb-4">
                <h3 className="font-heading font-bold">Apply for {applyJob.title}</h3>
                <button type="button" onClick={() => setApplyJob(null)}><X size={20} /></button>
              </div>
              <div className="space-y-3">
                <div><label className={labelClass}>Name</label><input defaultValue={session?.name || ""} className={inputClass} required /></div>
                <div><label className={labelClass}>Email</label><input type="email" defaultValue={session?.email || ""} className={inputClass} required /></div>
                <div><label className={labelClass}>Cover note</label><textarea rows={3} className={inputClass} placeholder="Brief introduction..." /></div>
              </div>
              <Button type="submit" className="mt-4 w-full !bg-emerald-600 hover:!bg-emerald-700">Submit Application</Button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (!authed) {
    return (
      <>
        <SEO title="Job Search" description="Search IT jobs at PRI Global." url="/candidate-jobs" noindex />
        <section className="min-h-[calc(100vh-4rem)] py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl font-bold mb-2">IT Job Search</h1>
            <p className="text-[var(--text-secondary)] mb-8">Browse open positions. <a href="/candidate-login" className="text-emerald-600 hover:underline">Sign in</a> to apply and save jobs.</p>
            {content}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Job Search" description="Search IT jobs at PRI Global." url="/candidate-jobs" noindex />
      <PortalLayout portalLabel="Candidate Portal" accentColor={ACCENT} userName={session?.name} navItems={CANDIDATE_NAV} onLogout={logout}>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">Job Search</h1>
        {content}
      </PortalLayout>
    </>
  );
}
