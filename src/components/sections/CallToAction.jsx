import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { HUBSPOT_MEETING_URL } from "../../constants/links";
import { useInView } from "../../hooks/useInView";

export default function CallToAction() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28">
      <div className="site-container">
        <div
          ref={ref}
          className={`relative rounded-xl3 bg-navy overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center ${
            inView ? "anim-fade-up" : "opacity-0"
          }`}
          style={{ animationDuration: "0.65s" }}
        >
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-royal/25 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-royaldark/20 blur-[100px]" />

          <div className="relative z-10">
            <p className="text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Ready to get started?
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-2xl mx-auto">
              Let&apos;s build the right solution for your business.
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Staffing, SOW teams, managed services, or PR1SM.AI — tell us what you need and
              we&apos;ll deliver a custom proposal within 24 business hours.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button to="/get-pricing" variant="glass-accent" size="lg" className="pulse-cta w-full sm:w-auto">
                Talk to an expert <ArrowRight size={18} />
              </Button>
              <Button to="/careers" variant="glass" size="lg" className="text-white w-full sm:w-auto">
                Find a role <ArrowRight size={18} />
              </Button>
              <Button
                href={HUBSPOT_MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                size="lg"
                className="text-white w-full sm:w-auto"
              >
                Book a call <ArrowRight size={18} />
              </Button>
            </div>
            <p className="mt-8 text-sm text-white/50">
              Established since 1997 · 26+ year Mastercard partnership · 12,700+ placements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
