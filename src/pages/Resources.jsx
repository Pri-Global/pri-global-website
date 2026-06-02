import { BookOpen, FileText, Newspaper, ArrowRight } from "lucide-react";
import CallToAction from "../components/sections/CallToAction";

const categories = [
  {
    icon: FileText,
    label: "Case Studies",
    description: "Real-world results from PRI Global engagements across Financial Services, Healthcare, Manufacturing, and beyond.",
  },
  {
    icon: Newspaper,
    label: "News & Insights",
    description: "Industry commentary, technology trends, and PRI Global company updates to keep you ahead of the curve.",
  },
  {
    icon: BookOpen,
    label: "Whitepapers & Guides",
    description: "In-depth research and practical guidance on talent strategy, cloud adoption, cybersecurity, and AI.",
  },
];

export default function Resources() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-royal/6 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Resources
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
              Case studies, news,
              <br />
              <span className="text-royal dark:text-royaldark">and insights.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Practical knowledge and real-world results from PRI Global's 29 years of technology
              consulting and talent solutions. New content coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-7 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center">
                  <Icon size={20} className="text-royal dark:text-royaldark" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                    {label}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 dark:bg-royaldark/15 border border-royal/20 dark:border-royaldark/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-royal dark:bg-royaldark" />
            <span className="text-xs font-semibold text-royal dark:text-royaldark uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Content in progress
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            We're building out our resource library. In the meantime, visit{" "}
            <a
              href="https://priglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal dark:text-royaldark hover:underline"
            >
              priglobal.com
            </a>{" "}
            for the latest news and case studies.
          </p>
          <a
            href="https://priglobal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors"
          >
            Visit priglobal.com <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
