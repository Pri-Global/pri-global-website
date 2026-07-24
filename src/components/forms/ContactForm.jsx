import { useState } from "react";
import { MapPin, Phone, Mail, Calendar, ExternalLink } from "lucide-react";
import { submitLead } from "../../utils/submitLead";
import { BOOKING_URL } from "../../constants/links";
import AnimatedIcon from "../ui/AnimatedIcon";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactForm({
  to = "info@priglobal.com",
  source = "contact",
  submitLabel = "Send message",
  showCompany = true,
}) {
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = `${form.firstName} ${form.lastName}`.trim();
    const subject = `Contact from ${name || "PRI Global website"}${form.company ? ` — ${form.company}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : null,
      `Source: ${source}`,
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitLead({
      to,
      subject,
      body,
      source,
      fields: { ...form, name },
      honeypot: form.website,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    setStatus(result);
    setForm(defaultForm);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
      <div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          Get in touch
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
          Tell us about your staffing, managed services, or PR1SM.AI needs. We typically respond within one business day.
        </p>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <AnimatedIcon Icon={MapPin} size={16} className="text-royal shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[var(--text-primary)]">PRI Global HQ</p>
              <p className="text-[var(--text-secondary)]">16253 Swingley Ridge Rd, Chesterfield, MO 63017</p>
            </div>
          </div>
          <a href="tel:+16362567172" className="flex items-center gap-3 hover:text-royal transition-colors">
            <AnimatedIcon Icon={Phone} size={16} className="text-royal shrink-0" />
            <span className="text-[var(--text-secondary)]">636.256.7172</span>
          </a>
          <a href="mailto:info@priglobal.com" className="flex items-center gap-3 hover:text-royal transition-colors">
            <AnimatedIcon Icon={Mail} size={16} className="text-royal shrink-0" />
            <span className="text-[var(--text-secondary)]">info@priglobal.com</span>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors mt-2"
          >
            <Calendar size={16} /> Book a meeting
          </a>
          <a
            href="https://priglobal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-royal transition-colors"
          >
            <ExternalLink size={16} className="text-royal shrink-0" />
            priglobal.com
          </a>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="hidden" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          />
        </div>

        {status?.ok && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-sm text-emerald-700 dark:text-emerald-400" role="status">
            Thank you — your message is ready to send.
            {status.copied && " Details were copied to your clipboard if your email app did not open."}
            {status.api && " We also logged your request on our server."}
          </div>
        )}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 text-sm text-rose-700 dark:text-rose-400" role="alert">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-first-name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              First name
            </label>
            <input
              id="contact-first-name"
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>
          <div>
            <label htmlFor="contact-last-name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Last name
            </label>
            <input
              id="contact-last-name"
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Work email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-royal/40"
          />
        </div>

        {showCompany && (
          <div>
            <label htmlFor="contact-company" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>
        )}

        <div>
          <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-royal/40 resize-none"
            placeholder="Tell us about your project or challenge..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-xl bg-royal text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
