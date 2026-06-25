import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import Button from "../../components/ui/Button";
import PhoneInput from "../../components/ui/PhoneInput";
import { AUTH_KEYS, usePortalAuth, readStorage, writeStorage, getInitials } from "../../hooks/usePortalAuth";
import { EXPERIENCE_OPTIONS, SKILL_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";
import {
  fetchCandidateProfile,
  isLiveCandidateSession,
  saveCandidateProfile,
} from "../../services/candidatePortal";

const ACCENT = "#22c55e";

const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  experience: "",
  skillSet: "",
  topSkills: "",
  employmentStatus: "actively",
  workTypes: [],
  remotePref: "flexible",
  name: "",
};

export default function CandidateProfile() {
  const { session } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");
  const [form, setForm] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const stored = readStorage(AUTH_KEYS.candidateProfile);
      if (stored && active) setForm((f) => ({ ...f, ...stored }));

      if (!isLiveCandidateSession(session)) {
        if (session?.name && active) {
          setForm((f) => ({ ...f, name: session.name, email: session.email || f.email }));
        }
        if (active) setLoading(false);
        return;
      }

      try {
        const profile = await fetchCandidateProfile();
        if (active) {
          setForm((f) => ({
            ...f,
            ...profile,
            name: profile.name || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || f.name,
          }));
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to load profile.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [session?.candidateId, session?.sessionToken, session?.loggedIn]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isLiveCandidateSession(session)) {
        const profile = await saveCandidateProfile(form);
        setForm((f) => ({ ...f, ...profile }));
      } else {
        const name = `${form.firstName} ${form.lastName}`.trim();
        writeStorage(AUTH_KEYS.candidateProfile, { ...form, name });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(form.name || session?.name);

  return (
    <>
      <SEO title="Candidate Profile" description="Edit your PRI Global candidate profile." url="/candidate-profile" noindex />
      {loading && <p className="text-sm text-[var(--text-muted)] mb-4">Loading profile…</p>}
      {error && (
        <div className="mb-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-800 dark:text-amber-300">
          {error}
        </div>
      )}

      <form onSubmit={save} className="max-w-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: ACCENT }}
          >
            {initials}
          </div>
          {session?.candidateId && (
            <p className="text-xs text-[var(--text-muted)]">Candidate ID {session.candidateId}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <PhoneInput value={form.phone} onChange={(phone) => update("phone", phone)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>LinkedIn</label>
          <input value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Experience</label>
            <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className={inputClass}>
              <option value="">Select</option>
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Skill Set</label>
            <select value={form.skillSet} onChange={(e) => update("skillSet", e.target.value)} className={inputClass}>
              <option value="">Select</option>
              {SKILL_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Top Skills</label>
          <input value={form.topSkills} onChange={(e) => update("topSkills", e.target.value)} className={inputClass} />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" className="!bg-emerald-600 hover:!bg-emerald-700" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </Button>
          {saved && <span className="text-sm text-emerald-600">Profile saved to PRI Global!</span>}
        </div>
      </form>

      <section id="settings" className="max-w-2xl mt-12 pt-10 border-t border-[var(--border)] scroll-mt-24">
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Account Settings</h2>
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--text-secondary)]">
          Email notifications and job alerts will be available in a future update. Your profile visibility to PRI recruiters is active when your profile is complete.
        </div>
      </section>
    </>
  );
}
