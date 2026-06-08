import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import PortalLayout from "../../components/portal/PortalLayout";
import Button from "../../components/ui/Button";
import { AUTH_KEYS, usePortalAuth, readStorage, writeStorage, getInitials } from "../../hooks/usePortalAuth";
import { CANDIDATE_NAV } from "../../data/portalNav";
import { EXPERIENCE_OPTIONS, SKILL_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";

const ACCENT = "#22c55e";

const defaultProfile = {
  firstName: "Alex", lastName: "Johnson", email: "candidate@example.com", phone: "",
  location: "St. Louis, MO", linkedin: "", experience: "5-10", skillSet: "Software Engineering",
  topSkills: "React, TypeScript, AWS", employmentStatus: "actively", workTypes: ["Contract"],
  remotePref: "flexible", name: "Alex Johnson",
};

export default function CandidateProfile() {
  const { session, logout } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");
  const [form, setForm] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = readStorage(AUTH_KEYS.candidateProfile);
    if (stored) setForm((f) => ({ ...f, ...stored, name: stored.name || `${stored.firstName} ${stored.lastName}` }));
    else if (session?.name) setForm((f) => ({ ...f, name: session.name, email: session.email || f.email }));
  }, [session]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = (e) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`.trim();
    writeStorage(AUTH_KEYS.candidateProfile, { ...form, name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = getInitials(form.name || session?.name);

  return (
    <>
      <SEO title="Candidate Profile" description="Edit your PRI Global candidate profile." url="/candidate-profile" noindex />
      <PortalLayout
        portalLabel="Candidate Portal"
        accentColor={ACCENT}
        userName={form.name || session?.name}
        userSubtitle="Manage your professional profile"
        navItems={CANDIDATE_NAV}
        profileLink="/candidate-profile"
        onLogout={logout}
      >
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={save} className="max-w-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: ACCENT }}>
              {initials}
            </div>
            <div>
              <Button type="button" variant="secondary" size="sm">Upload Photo</Button>
              <p className="text-xs text-[var(--text-muted)] mt-2">Frontend demo only — no upload</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>First Name</label><input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Last Name</label><input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Phone</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Location</label><input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>LinkedIn</label><input value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>Experience</label>
              <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className={inputClass}>
                {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Skill Set</label>
              <select value={form.skillSet} onChange={(e) => update("skillSet", e.target.value)} className={inputClass}>
                {SKILL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Top Skills</label><input value={form.topSkills} onChange={(e) => update("topSkills", e.target.value)} className={inputClass} /></div>

          <div className="flex items-center gap-4">
            <Button type="submit" className="!bg-emerald-600 hover:!bg-emerald-700">Save Changes</Button>
            {saved && <span className="text-sm text-emerald-600">Profile saved!</span>}
          </div>
        </motion.form>
      </PortalLayout>
    </>
  );
}
