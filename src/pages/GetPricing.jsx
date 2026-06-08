import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Phone, ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import Button from "../components/ui/Button";
import SEO from "../components/SEO";
import HubSpotMeetingEmbed from "../components/ui/HubSpotMeetingEmbed";
import { HUBSPOT_MEETING_URL } from "../constants/links";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const TRUST_POINTS = [
  "No obligation — just a conversation",
  "Custom scoped to your business needs",
  "Response within 24 business hours",
  "Direct access to senior leadership",
];

const COMPANY_SIZES = ["1–50", "51–250", "251–1000", "1000+"];

const SERVICES = [
  "IT Staffing & Talent Solutions",
  "Managed IT & Infrastructure",
  "Cybersecurity & Risk Management",
  "Cloud & Digital Transformation",
  "Data Solutions & Integration",
  "PR1SM.AI Platform",
  "Strategic IT Consulting",
  "Not sure — help me decide",
];

const TIMELINES = [
  "Immediately (within 30 days)",
  "Within 3 months",
  "Within 6 months",
  "Just exploring",
];

const BUDGETS = [
  "Under $25K",
  "$25K–$100K",
  "$100K–$500K",
  "$500K+",
  "Prefer not to say",
];

const initialForm = {
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
  email: "",
  phone: "",
  companySize: "",
  services: [],
  timeline: "",
  budget: "",
  message: "",
};

export default function GetPricing() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    scrollToPageTop();
  }, []);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleService = (svc) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter((s) => s !== svc)
        : [...f.services, svc],
    }));
  };

  const step1Valid =
    form.firstName && form.lastName && form.company && form.jobTitle && form.email && form.phone;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`;
    const services = form.services.join(", ") || "Not specified";
    const subject = encodeURIComponent(`Pricing Request from ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${form.company}\nJob Title: ${form.jobTitle}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany Size: ${form.companySize || "Not specified"}\nServices: ${services}\nTimeline: ${form.timeline || "Not specified"}\nBudget: ${form.budget || "Not specified"}\n\nMessage:\n${form.message || "—"}`
    );
    window.location.href = `mailto:ajay@pr1sm.ai,liezl.moss@PR1SM.AI?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
      <SEO
        title="Get Pricing — Custom IT Solutions Proposal"
        description="Request a custom pricing proposal from PRI Global. IT staffing, managed services, or PR1SM.AI — we respond within 24 business hours."
        url="/get-pricing"
      />
      <section className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <div className="w-16 h-16 rounded-full bg-royal/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-royal" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
            Thank you, {form.firstName}!
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            We&apos;ll be in touch within 24 hours. In the meantime, explore PR1SM.AI →
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/ai-innovation" size="lg">
              Explore PR1SM.AI <ArrowRight size={18} />
            </Button>
            <Button to="/" variant="secondary" size="lg">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </section>
      </>
    );
  }

  return (
    <>
    <SEO
      title="Get Pricing — Custom IT Solutions Proposal"
      description="Request a custom pricing proposal from PRI Global. IT staffing, managed services, or PR1SM.AI — we respond within 24 business hours."
      url="/get-pricing"
    />
    <section className="pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Let&apos;s Build the Right Solution for You
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Whether you need IT talent, managed services, or PR1SM.AI — we&apos;ll put together
              a custom proposal within 24 hours.
            </p>
            <ul className="space-y-4 mb-10">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <Check size={18} className="text-royal shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="space-y-3 text-sm mb-8">
              <a href="tel:6367791651" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-royal transition-colors">
                <Phone size={14} /> Ajay Patel — 636-779-1651
              </a>
              <a href="tel:3147845854" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-royal transition-colors">
                <Phone size={14} /> Liezl Moss — 314-784-5854
              </a>
            </div>
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Prefer to talk now?</p>
              <Button
                href={HUBSPOT_MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="w-full sm:w-auto"
              >
                <Calendar size={16} /> Book a 15-min Call <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                {[
                  { n: 1, label: "About You" },
                  { n: 2, label: "Your Needs" },
                ].map((s, i) => (
                  <div key={s.n} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= s.n
                          ? "bg-royal text-white"
                          : "bg-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {s.n}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        step >= s.n ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i === 0 && (
                      <div className={`flex-1 h-0.5 mx-2 ${step > 1 ? "bg-royal" : "bg-[var(--border)]"}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="First Name" required>
                          <input
                            required
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Last Name" required>
                          <input
                            required
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Company Name" required>
                        <input
                          required
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Job Title" required>
                        <input
                          required
                          value={form.jobTitle}
                          onChange={(e) => update("jobTitle", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Email" required>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Phone" required>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="Company Size">
                        <select
                          value={form.companySize}
                          onChange={(e) => update("companySize", e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select size</option>
                          {COMPANY_SIZES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>
                      <div className="flex justify-end pt-4">
                        <Button
                          type="button"
                          size="md"
                          disabled={!step1Valid}
                          onClick={() => setStep(2)}
                        >
                          Next <ArrowRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <Field label="Service Interest">
                        <div className="grid sm:grid-cols-2 gap-2">
                          {SERVICES.map((svc) => (
                            <label
                              key={svc}
                              className="flex items-start gap-2 p-3 rounded-lg border border-[var(--border)] hover:border-royal/40 cursor-pointer text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={form.services.includes(svc)}
                                onChange={() => toggleService(svc)}
                                className="mt-0.5 accent-royal"
                              />
                              <span className="text-[var(--text-secondary)]">{svc}</span>
                            </label>
                          ))}
                        </div>
                      </Field>
                      <Field label="Timeline">
                        <div className="space-y-2">
                          {TIMELINES.map((t) => (
                            <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="radio"
                                name="timeline"
                                value={t}
                                checked={form.timeline === t}
                                onChange={(e) => update("timeline", e.target.value)}
                                className="accent-royal"
                              />
                              <span className="text-[var(--text-secondary)]">{t}</span>
                            </label>
                          ))}
                        </div>
                      </Field>
                      <Field label="Budget Range">
                        <select
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select range</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Message">
                        <textarea
                          rows={4}
                          placeholder="Tell us about your challenge or goal..."
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <div className="flex flex-wrap gap-3 justify-between pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-royal"
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                        <Button type="submit" size="md">
                          Submit Request <ArrowRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
            Rather book a call directly?
          </h2>
          <p className="text-sm text-[var(--text-secondary)] text-center mb-6">
            Pick a time that works for you — no form required.
          </p>
          <HubSpotMeetingEmbed />
        </div>
      </div>
    </section>
    </>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-royal/50 focus:ring-1 focus:ring-royal/20";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        {label}
        {required && <span className="text-royal ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
