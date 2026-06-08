import { CheckCircle } from "lucide-react";
import SEO from "../components/SEO";
import { services, iconMap } from "../data/services";
import SectionHeading from "../components/ui/SectionHeading";
import CallToAction from "../components/sections/CallToAction";
import CaseStudies from "../components/sections/CaseStudies";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import IllustrationPlaceholder from "../components/ui/IllustrationPlaceholder";
import ClientLogos from "../components/ui/ClientLogos";
import { useInView } from "../hooks/useInView";

function ServiceDetail({ svc, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, rootMargin: "-40px" });
  const Icon = iconMap[svc.icon];
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`group flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center py-14 border-b border-[var(--border)] last:border-0 ${
        inView ? "anim-fade-up" : "opacity-0"
      }`}
    >
      {/* Icon + number */}
      <div className="shrink-0 w-full lg:w-64 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-4">
          {Icon && (
            <AnimatedIcon Icon={Icon} size={36} className="text-royal dark:text-royaldark" />
          )}
        </div>
        <span className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--border)] leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
          {svc.title}
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed mb-5">{svc.description}</p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {svc.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <CheckCircle size={16} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="IT Services & Technology Solutions"
        description="PRI Global offers 8 integrated technology services: IT Staffing, Managed IT, Cybersecurity, Cloud Transformation, Data Solutions, Business Transformation, IT Consulting, and Network Services."
        url="/services"
      />
      <section className="pt-24 sm:pt-32 pb-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SectionHeading
              label="Services"
              heading="Everything you need to compete and grow"
              subheading="Eight integrated capability areas. One trusted partner. Outcomes that matter."
              align="left"
            />
            <div className="hidden lg:block">
              <IllustrationPlaceholder type="consulting" className="h-[300px]" alt="Technology consulting" />
            </div>
          </div>
        </div>
      </section>

      {/* Client logos marquee */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientLogos label="Clients we're proud to work with" />
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((svc, i) => (
            <ServiceDetail key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </section>

      <CaseStudies />
      <CallToAction />
    </>
  );
}
