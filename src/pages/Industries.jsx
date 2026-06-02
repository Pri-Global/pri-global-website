import { CheckCircle } from "lucide-react";
import { industries } from "../data/industries";
import SectionHeading from "../components/ui/SectionHeading";
import CallToAction from "../components/sections/CallToAction";
import { useInView } from "../hooks/useInView";

export default function Industries() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Industries"
            heading="Deep expertise across key sectors"
            subheading="We don't just understand technology—we understand how it applies within your industry. Our consultants bring real domain knowledge to every engagement."
            align="left"
          />
        </div>
      </section>

      {/* Industry grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div
                key={ind.id}
                className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-navy/5 dark:hover:shadow-black/30 transition-shadow duration-300 ${
                  inView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Card image header */}
                <div className="relative h-[180px] overflow-hidden bg-[var(--bg-tertiary)]">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover transition-opacity duration-500 opacity-0"
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => { e.target.style.opacity = 1; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-2xl">{ind.icon}</span>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    {ind.description}
                  </p>
                  <ul className="space-y-2">
                    {ind.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle size={14} className="text-royal dark:text-royaldark shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strip */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Don't see your industry?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            We work across all sectors. Get in touch to discuss how we can apply our technology
            expertise to your specific challenges.
          </p>
          <a
            href="mailto:info@priglobal.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-royal text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
