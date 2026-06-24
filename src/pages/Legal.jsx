import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { COMPANY, LEGAL_LAST_UPDATED } from "../lib/cookieConsent";

const sections = [
  {
    title: "Disclaimer",
    body: "Information on this website is provided for general informational purposes about PRI Global services, careers, and company background. It does not constitute legal, financial, or employment advice. PRI Global makes no warranties, express or implied, about the completeness, accuracy, or availability of information, products, or services described on this site.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website — including text, graphics, logos, videos, software, and design — is owned by PRI Global (PRI India Private Services Limited) or its licensors and is protected by applicable copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    title: "Portal & Demo Content",
    body: "Candidate, client, and employee portal sections may show sample or preview data. Unless explicitly stated otherwise, these areas are not connected to live production HR, billing, or applicant systems. Job listings and applications may be handled through separate platforms such as JobDiva.",
  },
  {
    title: "Third-Party Links & Services",
    body: "This site links to third-party websites and services (including Microsoft Outlook booking, mobile app stores, JobDiva, and social media). PRI Global is not responsible for the content, privacy practices, or availability of those external sites.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, PRI Global shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on its content.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the State of Missouri, USA, without regard to conflict-of-law principles. Disputes shall be subject to the exclusive jurisdiction of the courts located in Missouri, except where mandatory consumer protection laws in your jurisdiction provide otherwise.",
  },
  {
    title: "Privacy & Cookies",
    body: null,
    custom: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        Our data practices are described in the{" "}
        <Link to="/privacy-policy" className="text-royal hover:underline">Privacy Policy</Link> and{" "}
        <Link to="/cookie-settings" className="text-royal hover:underline">Cookie Settings</Link>.
        By using this website, you acknowledge those policies.
      </p>
    ),
  },
  {
    title: "Contact",
    body: `For legal inquiries, call ${COMPANY.phone} or use our contact form at /about#contact.`,
  },
];

export default function Legal() {
  return (
    <>
      <SEO title="Legal Notice" description="PRI Global legal notice, disclaimer, and terms of website use." url="/legal" noindex />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen py-24 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Legal
            </span>
            <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] mb-3">
              Legal Notice
            </h1>
            <p className="text-sm text-[var(--text-muted)]">Last updated: {LEGAL_LAST_UPDATED}</p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 mb-10 text-sm text-[var(--text-secondary)] space-y-1.5">
            <div><span className="font-semibold text-[var(--text-primary)]">Company:</span> {COMPANY.name}</div>
            <div><span className="font-semibold text-[var(--text-primary)]">Legal Name:</span> {COMPANY.legalName}</div>
            <div><span className="font-semibold text-[var(--text-primary)]">Headquarters:</span> {COMPANY.address}</div>
            <div><span className="font-semibold text-[var(--text-primary)]">Phone:</span> {COMPANY.phone}</div>
            <div>
              <span className="font-semibold text-[var(--text-primary)]">Websites:</span>{" "}
              <a href="https://priglobal.com" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">
                priglobal.com
              </a>
              {" · "}
              <a href="https://pri-global.vercel.app" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">
                pri-global.vercel.app
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <hr className="border-[var(--border-subtle)] mb-8" />
                <h2 className="font-heading text-xl font-bold text-royal mb-3">{s.title}</h2>
                {s.custom ?? <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{s.body}</p>}
              </div>
            ))}
          </div>

          <hr className="border-[var(--border-subtle)] mt-10 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-[var(--text-muted)]">
              © 2026 {COMPANY.name} ({COMPANY.legalName}). All Rights Reserved.
            </p>
            <p className="text-xs text-[var(--text-muted)]/60">
              Website designed &amp; built by{" "}
              <a
                href="https://co-studio.at"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-muted)] transition-colors"
              >
                co-studio.at
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
