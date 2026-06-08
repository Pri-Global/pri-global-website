import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import { AUTH_KEYS, writeAuth, writeStorage } from "../../hooks/usePortalAuth";
import { EXPERIENCE_OPTIONS, SKILL_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";

const initial = {
  firstName: "", lastName: "", email: "", phone: "", location: "", linkedin: "",
  experience: "", skillSet: "", topSkills: "", employmentStatus: "actively",
  workTypes: [], remotePref: "flexible", resumeName: "", coverNote: "",
};

export default function CandidateRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleWork = (t) => setForm((f) => ({
    ...f,
    workTypes: f.workTypes.includes(t) ? f.workTypes.filter((x) => x !== t) : [...f.workTypes, t],
  }));

  const step1Valid = form.firstName && form.lastName && form.email && form.phone && form.location;
  const step2Valid = form.experience && form.skillSet && form.topSkills;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) update("resumeName", file.name);
  };

  const submit = (e) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`;
    writeStorage(AUTH_KEYS.candidateProfile, { ...form, name, registeredAt: Date.now() });
    writeAuth(AUTH_KEYS.candidate, {
      loggedIn: true,
      email: form.email.trim().toLowerCase(),
      name,
      role: "candidate",
      loginTime: Date.now(),
    });
    setDone(true);
    setTimeout(() => navigate("/candidate-dashboard"), 2500);
  };

  if (done) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6 text-emerald-600 text-2xl">✓</div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">Welcome to PRI Global!</h1>
          <p className="text-[var(--text-secondary)]">A recruiter will reach out within 2 business days.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Candidate Registration" description="Create your PRI Global candidate account." url="/candidate-register" noindex />
      <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <BrandLogo size="lg" className="mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Create Your Account</h1>
          </div>

          <div className="h-1.5 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
            <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${(step / 3) * 100}%` }} />
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-6 text-center">Step {step} of 3</p>

          <form onSubmit={step === 3 ? submit : (e) => e.preventDefault()} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>First Name *</label><input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Last Name *</label><input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Email *</label><input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Phone *</label><input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Location (City, State) *</label><input required value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>LinkedIn URL</label><input type="url" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/..." /></div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div><label className={labelClass}>Years of Experience</label>
                    <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o} years</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Primary Skill Set</label>
                    <select value={form.skillSet} onChange={(e) => update("skillSet", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      {SKILL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Top 3 Skills (comma separated)</label><input value={form.topSkills} onChange={(e) => update("topSkills", e.target.value)} className={inputClass} placeholder="React, AWS, TypeScript" /></div>
                  <fieldset><legend className={labelClass}>Current Employment Status</legend>
                    {["actively", "open", "not-looking"].map((v, i) => (
                      <label key={v} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                        <input type="radio" name="emp" checked={form.employmentStatus === v} onChange={() => update("employmentStatus", v)} className="accent-emerald-500" />
                        {["Actively looking", "Open to opportunities", "Not currently looking"][i]}
                      </label>
                    ))}
                  </fieldset>
                  <fieldset><legend className={labelClass}>Preferred Work Type</legend>
                    {["Contract", "Contract-to-hire", "Full-time"].map((t) => (
                      <label key={t} className="inline-flex items-center gap-2 text-sm mr-4 cursor-pointer">
                        <input type="checkbox" checked={form.workTypes.includes(t)} onChange={() => toggleWork(t)} className="accent-emerald-500" /> {t}
                      </label>
                    ))}
                  </fieldset>
                  <fieldset><legend className={labelClass}>Remote Preference</legend>
                    {["remote", "hybrid", "onsite", "flexible"].map((v, i) => (
                      <label key={v} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                        <input type="radio" name="remote" checked={form.remotePref === v} onChange={() => update("remotePref", v)} className="accent-emerald-500" />
                        {["Remote only", "Hybrid", "On-site", "Flexible"][i]}
                      </label>
                    ))}
                  </fieldset>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <label className={`${labelClass} block border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 transition-colors`}>
                    <Upload size={28} className="mx-auto mb-2 text-[var(--text-muted)]" />
                    <span className="text-sm text-[var(--text-secondary)]">Drag & drop resume (PDF/DOC) or click to browse</span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                  </label>
                  {form.resumeName && <p className="text-sm text-emerald-600">✓ {form.resumeName} uploaded</p>}
                  <div><label className={labelClass}>Optional cover note (200 chars)</label>
                    <textarea maxLength={200} rows={3} value={form.coverNote} onChange={(e) => update("coverNote", e.target.value)} className={inputClass} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-4 border-t border-[var(--border)]">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-emerald-600">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <span />}
              {step < 3 ? (
                <Button type="button" disabled={step === 1 ? !step1Valid : !step2Valid} onClick={() => setStep(step + 1)} className="!bg-emerald-600 hover:!bg-emerald-700">
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button type="submit" className="!bg-emerald-600 hover:!bg-emerald-700">Complete Registration →</Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
