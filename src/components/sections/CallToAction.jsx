import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { useInView } from "../../hooks/useInView";

export default function CallToAction() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-white/60 text-lg max-w-lg mx-auto mb-10">
              Tell us what you need — talent, managed services, or PR1SM.AI — and we&apos;ll
              deliver a custom proposal within 24 business hours. No obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/get-pricing" size="lg" className="pulse-cta">
                Get Pricing <ArrowRight size={18} />
              </Button>
              <Button
                to="/ai-innovation#demo"
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                See Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
