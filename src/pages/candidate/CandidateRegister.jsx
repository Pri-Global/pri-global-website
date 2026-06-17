import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, FileText, UserRound } from "lucide-react";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import AnimatedIcon from "../../components/ui/AnimatedIcon";
import { AUTH_KEYS, writeAuth, writeStorage } from "../../hooks/usePortalAuth";
import { JOBDIVA_SIGNUP_URL } from "../../constants/links";
import { EXPERIENCE_OPTIONS, SKILL_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";

const initial = {
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
  resumeName: "",
  coverNote: "",
  signupMode: "",
};

function parseMode(value) {
  if (value === "resume" || value === "manual") return value;
  return null;
}

export default function CandidateRegister() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlMode = parseMode(searchParams.get("mode"));

  const [mode, setMode] = useState(urlMode);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (urlMode) {
      setMode(urlMode);
      setStep(1);
    }
  }, [urlMode]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleWork = (t) =>
    setForm((f) => ({
      ...f,
      workTypes: f.workTypes.includes(t) ? f.workTypes.filter((x) => x !== t) : [...f.workTypes, t],
    }));

  const totalSteps = mode === "resume" ? 2 : mode === "manual" ? 3 : 0;
  const step1Valid = form.firstName && form.lastName && form.email && form.phone && form.location;
  const step2Valid = form.experience && form.skillSet && form.topSkills;
  const resumeStep1Valid = Boolean(form.resumeName);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) update("resumeName", file.name);
  };

  const selectMode = (nextMode) => {
    setMode(nextMode);
    setStep(1);
    update("signupMode", nextMode);
  };

  const submit = (e) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`;
    writeStorage(AUTH_KEYS.candidateProfile, {
      ...form,
      name,
      registeredAt: Date.now(),
      signupMode: mode,
    });
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

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }
    setMode(null);
    setStep(1);
  };

  const canAdvance =
    mode === "resume"
      ? step === 1
        ? resumeStep1Valid
        : step1Valid
      : step === 1
        ? step1Valid
        : step === 2
          ? step2Valid
          : true;

  if (done) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6 text-emerald-600 text-2xl">
            ✓
          </div>
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">
            Welcome to PRI Global!
          </h1>
          <p className="text-[var(--text-secondary)]">
            {mode === "resume"
              ? "Your resume is on file. A recruiter will reach out within 2 business days."
              : "A recruiter will reach out within 2 business days."}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title="Candidate Registration"
        description="Create your PRI Global candidate account — upload your resume or register manually."
        url="/candidate-register"
        noindex
      />
      <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <BrandLogo size="lg" className="mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              {mode ? "Create Your Account" : "Sign Up for PRI Global"}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto leading-relaxed">
              {mode === "resume"
                ? "Upload your resume first — we'll use it to match you with the right opportunities."
                : mode === "manual"
                  ? "No resume yet? Fill out your details and a recruiter will follow up."
                  : "New applicants can register with a resume or complete their profile manually."}
            </p>
          </div>

          {!mode && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => selectMode("resume")}
                className="w-full text-left rounded-2xl border-2 border-emerald-500/40 bg-[var(--bg-card)] p-6 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={Upload} size={22} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
                      Recommended
                    </p>
                    <h2 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-emerald-600 transition-colors">
                      Sign up with your resume
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                      Upload your resume (PDF or Word) and add basic contact details to get started
                      faster.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectMode("manual")}
                className="w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 hover:border-emerald-500/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={UserRound} size={22} className="text-[var(--text-muted)]" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                      Sign up without a resume
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                      Don&apos;t have a resume ready? Fill out your experience and skills manually
                      instead.
                    </p>
                  </div>
                </div>
              </button>

              <p className="text-center text-sm text-[var(--text-muted)] pt-2">
                Already have an account?{" "}
                <Link to="/candidate-login" className="text-emerald-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {mode && (
            <>
              <div className="h-1.5 bg-[var(--border)] rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
              <p className="text-sm text-[var(--text-muted)] mb-6 text-center">
                Step {step} of {totalSteps}
              </p>

              <form
                onSubmit={step === totalSteps ? submit : (e) => e.preventDefault()}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8"
              >
                <AnimatePresence mode="wait">
                  {mode === "resume" && step === 1 && (
                    <motion.div
                      key="resume-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <label
                        className={`${labelClass} block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                          form.resumeName
                            ? "border-emerald-500/50 bg-emerald-500/5"
                            : "border-[var(--border)] hover:border-emerald-500/50"
                        }`}
                      >
                        <Upload size={32} className="mx-auto mb-3 text-emerald-600" />
                        <span className="block text-sm font-semibold text-[var(--text-primary)]">
                          Upload your resume
                        </span>
                        <span className="block text-xs text-[var(--text-muted)] mt-2">
                          PDF, DOC, or DOCX — drag & drop or click to browse
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={handleFile}
                        />
                      </label>
                      {form.resumeName && (
                        <p className="flex items-center gap-2 text-sm text-emerald-600">
                          <FileText size={16} /> {form.resumeName} ready to submit
                        </p>
                      )}
                      <div>
                        <label className={labelClass}>Optional note to recruiters</label>
                        <textarea
                          maxLength={200}
                          rows={3}
                          value={form.coverNote}
                          onChange={(e) => update("coverNote", e.target.value)}
                          className={inputClass}
                          placeholder="Role types, availability, or relocation preferences..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {mode === "resume" && step === 2 && (
                    <motion.div
                      key="resume-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-[var(--text-secondary)] pb-2">
                        Almost done — add your contact details so recruiters can reach you.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>First Name *</label>
                          <input
                            required
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Last Name *</label>
                          <input
                            required
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Email *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Phone *</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Location (City, State) *</label>
                        <input
                          required
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>LinkedIn URL</label>
                        <input
                          type="url"
                          value={form.linkedin}
                          onChange={(e) => update("linkedin", e.target.value)}
                          className={inputClass}
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {mode === "manual" && step === 1 && (
                    <motion.div
                      key="manual-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>First Name *</label>
                          <input
                            required
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Last Name *</label>
                          <input
                            required
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Email *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Phone *</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Location (City, State) *</label>
                        <input
                          required
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>LinkedIn URL</label>
                        <input
                          type="url"
                          value={form.linkedin}
                          onChange={(e) => update("linkedin", e.target.value)}
                          className={inputClass}
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                    </motion.div>
                  )}

                  {mode === "manual" && step === 2 && (
                    <motion.div
                      key="manual-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className={labelClass}>Years of Experience *</label>
                        <select
                          required
                          value={form.experience}
                          onChange={(e) => update("experience", e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select</option>
                          {EXPERIENCE_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o} years
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Primary Skill Set *</label>
                        <select
                          required
                          value={form.skillSet}
                          onChange={(e) => update("skillSet", e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select</option>
                          {SKILL_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Top 3 Skills (comma separated) *</label>
                        <input
                          required
                          value={form.topSkills}
                          onChange={(e) => update("topSkills", e.target.value)}
                          className={inputClass}
                          placeholder="React, AWS, TypeScript"
                        />
                      </div>
                      <fieldset>
                        <legend className={labelClass}>Current Employment Status</legend>
                        {["actively", "open", "not-looking"].map((v, i) => (
                          <label key={v} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="emp"
                              checked={form.employmentStatus === v}
                              onChange={() => update("employmentStatus", v)}
                              className="accent-emerald-500"
                            />
                            {["Actively looking", "Open to opportunities", "Not currently looking"][i]}
                          </label>
                        ))}
                      </fieldset>
                      <fieldset>
                        <legend className={labelClass}>Preferred Work Type</legend>
                        {["Contract", "Contract-to-hire", "Full-time"].map((t) => (
                          <label key={t} className="inline-flex items-center gap-2 text-sm mr-4 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.workTypes.includes(t)}
                              onChange={() => toggleWork(t)}
                              className="accent-emerald-500"
                            />{" "}
                            {t}
                          </label>
                        ))}
                      </fieldset>
                      <fieldset>
                        <legend className={labelClass}>Remote Preference</legend>
                        {["remote", "hybrid", "onsite", "flexible"].map((v, i) => (
                          <label key={v} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                            <input
                              type="radio"
                              name="remote"
                              checked={form.remotePref === v}
                              onChange={() => update("remotePref", v)}
                              className="accent-emerald-500"
                            />
                            {["Remote only", "Hybrid", "On-site", "Flexible"][i]}
                          </label>
                        ))}
                      </fieldset>
                    </motion.div>
                  )}

                  {mode === "manual" && step === 3 && (
                    <motion.div
                      key="manual-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-[var(--text-secondary)]">
                        Review your details and add an optional note for recruiters.
                      </p>
                      <div>
                        <label className={labelClass}>Optional note to recruiters</label>
                        <textarea
                          maxLength={200}
                          rows={4}
                          value={form.coverNote}
                          onChange={(e) => update("coverNote", e.target.value)}
                          className={inputClass}
                          placeholder="Availability, target roles, or anything else we should know..."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-4 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-emerald-600"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  {step < totalSteps ? (
                    <Button
                      type="button"
                      disabled={!canAdvance}
                      onClick={() => setStep(step + 1)}
                      className="!bg-emerald-600 hover:!bg-emerald-700"
                    >
                      Next <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button type="submit" className="!bg-emerald-600 hover:!bg-emerald-700">
                      Complete Registration →
                    </Button>
                  )}
                </div>
              </form>

              {mode === "resume" && (
                <p className="text-center text-xs text-[var(--text-muted)] mt-6">
                  Prefer to register in PRI&apos;s application portal?{" "}
                  <a
                    href={JOBDIVA_SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Use the JobDiva sign-up page
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
