import { motion } from "framer-motion";

const sections = [
  {
    title: "Disclaimer",
    body: "The information provided on this website is for general informational purposes only. PRI Global makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information, products, services, or related graphics contained on this website.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website — including text, graphics, logos, and software — is the property of PRI Global (PRI India Private Services Limited) and is protected by applicable US and international copyright laws. Unauthorized use is strictly prohibited.",
  },
  {
    title: "Third-Party Links",
    body: "This website may contain links to third-party websites. PRI Global has no control over the content of those sites and accepts no responsibility for them.",
  },
  {
    title: "Limitation of Liability",
    body: "In no event shall PRI Global be liable for any indirect, incidental, special, or consequential damages arising out of the use of this website.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the State of Missouri, USA. Any disputes shall be subject to the exclusive jurisdiction of the courts of Missouri.",
  },
  {
    title: "Contact",
    body: "For legal inquiries: 636.256.7172 | priglobal.com/contact",
  },
];

export default function Legal() {
  return (
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
            Legal Notice
          </h1>
          <p className="text-sm text-[var(--text-muted)]">Last updated: June 2025</p>
        </div>

        {/* Company info card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 mb-10 text-sm text-[var(--text-secondary)] space-y-1.5">
          <div><span className="font-semibold text-[var(--text-primary)]">Company:</span> PRI Global</div>
          <div><span className="font-semibold text-[var(--text-primary)]">Legal Name:</span> PRI India Private Services Limited</div>
          <div><span className="font-semibold text-[var(--text-primary)]">Headquarters:</span> 174 Clarkson Road, Ellisville, MO 63011, USA</div>
          <div><span className="font-semibold text-[var(--text-primary)]">Phone:</span> 636.256.7172</div>
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Website:</span>{" "}
            <a href="https://priglobal.com" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">
              priglobal.com
            </a>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <hr className="border-[var(--border-subtle)] mb-8" />
              <h2 className="font-heading text-xl font-bold text-royal mb-3">{s.title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <hr className="border-[var(--border-subtle)] mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 PRI Global (PRI India Private Services Limited). All Rights Reserved.
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
  );
}
