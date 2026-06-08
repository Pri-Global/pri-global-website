import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
          <span className="font-semibold text-[var(--text-primary)]">Information you provide:</span>
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 mb-4 text-sm leading-relaxed ml-2">
          <li>Name, email address, phone number (via contact forms)</li>
          <li>Job title and company name</li>
          <li>Messages and inquiries submitted through our website</li>
        </ul>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
          <span className="font-semibold text-[var(--text-primary)]">Information collected automatically:</span>
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li>IP address and browser type</li>
          <li>Pages visited and time spent on site</li>
          <li>Referring URLs</li>
          <li>Cookie data (see Section 5)</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
        <li>To respond to your inquiries and provide requested services</li>
        <li>To send relevant updates about PRI Global services (with consent)</li>
        <li>To improve website functionality and user experience</li>
        <li>To analyze website traffic and usage patterns</li>
        <li>To comply with legal obligations</li>
      </ul>
    ),
  },
  {
    title: "3. Information Sharing",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
          We do not sell, trade, or rent your personal information to third parties. We may share information with:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li>Service providers who assist in website operations (under confidentiality agreements)</li>
          <li>Legal authorities when required by law</li>
          <li>Business successors in the event of a merger or acquisition</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Data Retention",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed">
        We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by law.
      </p>
    ),
  },
  {
    title: "5. Cookies",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
          We use cookies to enhance your browsing experience. You may opt out of non-essential cookies at any time via{" "}
          <Link to="/cookie-settings" className="text-royal hover:underline">Cookie Settings</Link>.
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li><span className="font-semibold text-[var(--text-primary)]">Essential cookies:</span> Required for website functionality</li>
          <li><span className="font-semibold text-[var(--text-primary)]">Analytics cookies:</span> Help us understand how visitors use our site</li>
          <li><span className="font-semibold text-[var(--text-primary)]">Marketing cookies:</span> Used to deliver relevant content (optional)</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Your Rights (US Residents)",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">Depending on your state, you may have the right to:</p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt out of certain data uses</li>
        </ul>
        <p className="text-[var(--text-secondary)] leading-relaxed mt-3 text-sm">
          To exercise these rights, contact us at{" "}
          <a href="https://priglobal.com/contact" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">priglobal.com/contact</a>.
        </p>
      </>
    ),
  },
  {
    title: "7. California Residents (CCPA)",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed">
        California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, and opt-out of the sale of personal information. PRI Global does not sell personal information.
      </p>
    ),
  },
  {
    title: "8. Data Security",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed">
        We implement industry-standard security measures to protect your data, including SSL encryption and secure server infrastructure.
      </p>
    ),
  },
  {
    title: "9. Children's Privacy",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed">
        Our website is not directed at children under 13. We do not knowingly collect personal information from children.
      </p>
    ),
  },
  {
    title: "10. Changes to This Policy",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed">
        We may update this policy periodically. Changes will be posted on this page with an updated date.
      </p>
    ),
  },
  {
    title: "11. Contact Us",
    content: (
      <div className="text-[var(--text-secondary)] text-sm space-y-1 leading-relaxed">
        <p className="font-semibold text-[var(--text-primary)]">PRI Global</p>
        <p>174 Clarkson Road, Ellisville, MO 63011, USA</p>
        <p>Phone: 636.256.7172</p>
        <p>
          <a href="https://priglobal.com/contact" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">
            priglobal.com/contact
          </a>
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
    <SEO title="Privacy Policy" description="PRI Global privacy policy — how we collect, use, and protect your data. CCPA compliant." url="/privacy-policy" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
            Legal
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            Privacy Policy
          </h1>
          <div className="flex gap-4 text-xs text-[var(--text-muted)]">
            <span>Effective Date: June 1, 2025</span>
            <span>·</span>
            <span>Last Updated: June 2025</span>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 mb-10">
          <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
            PRI Global ("we," "us," or "our") operates priglobal.com and related web properties.
            This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <hr className="border-[var(--border-subtle)] mb-8" />
              <h2 className="font-heading text-xl font-bold text-royal mb-4">{s.title}</h2>
              {s.content}
            </div>
          ))}
        </div>

        <hr className="border-[var(--border-subtle)] mt-10 mb-6" />
        <p className="text-xs text-[var(--text-muted)]">
          © 2026 PRI Global (PRI India Private Services Limited). All Rights Reserved.
        </p>
      </div>
    </motion.div>
    </>
  );
}
