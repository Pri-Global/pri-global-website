import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { COMPANY, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED, SITE_STORAGE } from "../lib/cookieConsent";

const sections = [
  {
    title: "1. Who We Are",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-3">
          {COMPANY.name} ({COMPANY.legalName}) operates the PRI Global marketing website at{" "}
          <a href="https://priglobal.com" className="text-royal hover:underline" target="_blank" rel="noopener noreferrer">
            priglobal.com
          </a>{" "}
          and related web properties, including{" "}
          <a href="https://pri-global.vercel.app" className="text-royal hover:underline" target="_blank" rel="noopener noreferrer">
            pri-global.vercel.app
          </a>
          . This Privacy Policy explains how we collect, use, and protect information when you visit
          or interact with these sites.
        </p>
        <div className="text-sm text-[var(--text-secondary)] space-y-1">
          <p><span className="font-semibold text-[var(--text-primary)]">Address:</span> {COMPANY.address}</p>
          <p>
            <span className="font-semibold text-[var(--text-primary)]">Contact:</span>{" "}
            <Link to="/about#contact" className="text-royal hover:underline">Contact form on our About page</Link>
            {" · "}
            <span className="font-semibold text-[var(--text-primary)]">Phone:</span> {COMPANY.phone}
          </p>
        </div>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3 text-sm">
          <span className="font-semibold text-[var(--text-primary)]">Information you provide:</span>
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 mb-4 text-sm leading-relaxed ml-2">
          <li>Name, email address, phone number, company, and messages when you contact us or request information</li>
          <li>Account details if you register for a portal preview or submit forms on the site</li>
          <li>Messages you send to PriVa, our website assistant (see Section 6)</li>
          <li>Resume or profile information if you choose to upload or enter it in candidate areas</li>
        </ul>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3 text-sm">
          <span className="font-semibold text-[var(--text-primary)]">Information collected automatically:</span>
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li>Device and browser type, general location derived from IP address, and pages viewed</li>
          <li>Standard server and security logs from our hosting provider (Vercel)</li>
          <li>Browser storage preferences (theme, cookie choices, optional portal preview sessions) — see Section 5</li>
          <li>Referring URLs and approximate usage patterns</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
        <li>To respond to inquiries, schedule meetings, and provide requested services</li>
        <li>To operate website features, including portal previews and the PriVa assistant</li>
        <li>To improve site content, performance, and user experience</li>
        <li>To send relevant updates about PRI Global services where you have given consent or where permitted by law</li>
        <li>To comply with legal obligations and protect the security of our systems</li>
      </ul>
    ),
  },
  {
    title: "4. Information Sharing",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3 text-sm">
          We do not sell your personal information. We may share information with:
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2">
          <li>
            <span className="font-semibold text-[var(--text-primary)]">Service providers</span> who help
            us host the website, deliver email, process bookings, or power AI assistant features (under
            contractual confidentiality and data-protection obligations)
          </li>
          <li>
            <span className="font-semibold text-[var(--text-primary)]">Authentication providers</span>{" "}
            (e.g. Supabase) when real portal login is enabled
          </li>
          <li>
            <span className="font-semibold text-[var(--text-primary)]">Legal authorities</span> when
            required by law or to protect rights and safety
          </li>
          <li>
            <span className="font-semibold text-[var(--text-primary)]">Business successors</span> in
            connection with a merger, acquisition, or asset sale
          </li>
        </ul>
        <p className="text-[var(--text-secondary)] leading-relaxed mt-3 text-sm">
          Links to third-party sites (JobDiva app stores, Microsoft Outlook booking, social platforms,
          and similar) are governed by those providers&apos; own privacy policies once you leave our site.
        </p>
      </>
    ),
  },
  {
    title: "5. Cookies & Browser Storage",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3 text-sm">
          We use browser storage rather than traditional advertising cookies. Essential storage is
          always active. You can manage optional categories in{" "}
          <Link to="/cookie-settings" className="text-royal hover:underline">Cookie Settings</Link>.
        </p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 text-sm leading-relaxed ml-2 mb-4">
          <li><span className="font-semibold text-[var(--text-primary)]">Essential:</span> Cookie consent record, theme preference, basic session behavior</li>
          <li><span className="font-semibold text-[var(--text-primary)]">Functional:</span> Portal preview login state, Solution Quiz progress, similar on-device features</li>
          <li><span className="font-semibold text-[var(--text-primary)]">Analytics:</span> Not currently used — no analytics scripts run on this site today</li>
          <li><span className="font-semibold text-[var(--text-primary)]">Marketing:</span> Not currently used — no retargeting or ad cookies on this site today</li>
        </ul>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
          <table className="w-full text-xs text-left min-w-[480px]">
            <thead className="bg-[var(--bg-secondary)] text-[var(--text-muted)]">
              <tr>
                <th className="px-3 py-2 font-semibold">Storage key</th>
                <th className="px-3 py-2 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {SITE_STORAGE.map((row) => (
                <tr key={row.name} className="text-[var(--text-secondary)]">
                  <td className="px-3 py-2 font-mono text-[10px]">{row.name}</td>
                  <td className="px-3 py-2 leading-relaxed">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: "6. PriVa Website Assistant",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        PriVa helps answer questions about PRI Global services, careers, and company information.
        When you chat with PriVa, your messages may be sent to our server and, when configured,
        processed by a third-party AI provider (OpenAI) to generate responses. If the AI service is
        unavailable, a local on-site knowledge engine may be used instead. Do not enter passwords,
        government IDs, health information, or other sensitive personal data in the chat. Conversation
        history during a session is kept in your browser until you refresh or close the page.
      </p>
    ),
  },
  {
    title: "7. Portal Previews",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        Candidate, client, and employee portal areas on this website may display sample data for
        demonstration purposes. Preview login state is stored locally in your browser. These previews
        are not connected to live HR, payroll, or applicant tracking systems unless separately
        configured with production authentication. For real portal access, contact PRI Global or use
        official systems such as JobDiva where applicable.
      </p>
    ),
  },
  {
    title: "8. Data Retention",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        We retain personal information only as long as needed for the purposes described in this policy,
        to meet legal requirements, or to resolve disputes. Browser storage persists until you clear it
        or change your preferences. Server logs are retained according to our hosting provider&apos;s
        standard retention periods.
      </p>
    ),
  },
  {
    title: "9. Your Rights",
    content: (
      <>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-3 text-sm">
          Depending on where you live, you may have the right to access, correct, delete, or restrict
          certain uses of your personal information, and to withdraw consent where processing is
          consent-based.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-3">
          <span className="font-semibold text-[var(--text-primary)]">US residents (including California — CCPA/CPRA):</span>{" "}
          You may request disclosure of categories of data collected, request deletion, and opt out of
          the sale or sharing of personal information. PRI Global does not sell personal information.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-3">
          <span className="font-semibold text-[var(--text-primary)]">EEA / UK visitors (GDPR):</span>{" "}
          You may have additional rights including data portability and the right to lodge a complaint
          with a supervisory authority. Our lawful bases include consent, legitimate interests in
          operating and improving our website, and contractual necessity when you request our services.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
          To exercise your rights, contact us via our{" "}
          <Link to="/about#contact" className="text-royal hover:underline">contact form</Link>{" "}
          or call {COMPANY.phone}.
        </p>
      </>
    ),
  },
  {
    title: "10. Data Security",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        We use industry-standard measures including HTTPS encryption, access controls, and secure
        hosting infrastructure. No method of transmission over the Internet is completely secure; we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    title: "11. Children's Privacy",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        Our website is not directed to children under 13 (or 16 in certain jurisdictions). We do not
        knowingly collect personal information from children. If you believe a child has provided us
        personal data, please contact us so we can delete it.
      </p>
    ),
  },
  {
    title: "12. Changes to This Policy",
    content: (
      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
        We may update this Privacy Policy from time to time. Material changes will be posted on this
        page with an updated &quot;Last Updated&quot; date. Continued use of the site after changes
        constitutes acceptance of the revised policy.
      </p>
    ),
  },
  {
    title: "13. Contact Us",
    content: (
      <div className="text-[var(--text-secondary)] text-sm space-y-1 leading-relaxed">
        <p className="font-semibold text-[var(--text-primary)]">{COMPANY.name}</p>
        <p>{COMPANY.address}</p>
        <p>Phone: {COMPANY.phone}</p>
        <p>
          <Link to="/about#contact" className="text-royal hover:underline">Contact form</Link>
          {" · "}
          <Link to="/cookie-settings" className="text-royal hover:underline">Cookie Settings</Link>
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How PRI Global collects, uses, and protects your information on priglobal.com and related websites."
        keywords="PRI Global privacy policy, data protection, CCPA, cookies"
        url="/privacy-policy"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ]}
      />
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
              Privacy Policy
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
              <span>Effective: {LEGAL_EFFECTIVE_DATE}</span>
              <span>Last updated: {LEGAL_LAST_UPDATED}</span>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 mb-10">
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
              This policy describes how {COMPANY.name} handles information on our public marketing
              website. It applies together with our{" "}
              <Link to="/legal" className="text-royal hover:underline">Legal Notice</Link> and{" "}
              <Link to="/cookie-settings" className="text-royal hover:underline">Cookie Settings</Link>.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <hr className="border-[var(--border-subtle)] mb-8" />
                <h2 className="font-heading text-xl font-bold text-royal mb-4">{s.title}</h2>
                {s.content}
              </div>
            ))}
          </div>

          <hr className="border-[var(--border-subtle)] mt-10 mb-6" />
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 {COMPANY.name} ({COMPANY.legalName}). All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </>
  );
}
