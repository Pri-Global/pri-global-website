import { Users, Search, Briefcase, BarChart2, CheckCircle, ArrowRight } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import CallToAction from "../components/sections/CallToAction";
import IllustrationPlaceholder from "../components/ui/IllustrationPlaceholder";
import { useInView } from "../hooks/useInView";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import { motion } from "framer-motion";
import VideoPlayer from "../components/ui/VideoPlayer";
import { VIDEOS } from "../data/videos";

const offerings = [
  {
    icon: Users,
    title: "IT Staff Augmentation",
    description:
      "Scale your team on demand. We provide pre-vetted engineers, architects, and project managers who integrate seamlessly with your existing workflows.",
  },
  {
    icon: Search,
    title: "Executive & C-Suite Search",
    description:
      "Finding transformational leaders is our speciality. We run confidential, thorough searches to surface candidates that aren't on the open market.",
  },
  {
    icon: Briefcase,
    title: "Permanent Placement",
    description:
      "From junior developers to senior specialists, we identify talent that fits both the role requirements and your culture—backed by our placement guarantee.",
  },
  {
    icon: BarChart2,
    title: "Workforce Planning",
    description:
      "Strategic advice on headcount planning, skills gap analysis, and building talent pipelines for future technology needs.",
  },
];

const process = [
  { step: "01", title: "Brief", desc: "You share your requirements. We ask the hard questions to really understand what success looks like." },
  { step: "02", title: "Source", desc: "We tap into our global network of 50,000+ pre-screened technology professionals." },
  { step: "03", title: "Shortlist", desc: "You receive a curated shortlist of typically 3–5 candidates within 5 working days." },
  { step: "04", title: "Place", desc: "We manage offer negotiation, onboarding, and post-placement check-ins to ensure long-term success." },
];

export default function TalentSolutions() {
  const [offeringsRef, offeringsInView] = useInView({ threshold: 0.05 });
  const [processRef, processInView]     = useInView({ threshold: 0.1 });

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-20 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                Talent Solutions
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                The right people, in the right roles.
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                Technology businesses succeed or fail on the strength of their people. We help you
                attract, hire, and retain the technology talent you need—whether that's a single
                specialist or an entire delivery team.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/about" size="lg">
                  Start hiring <ArrowRight size={18} />
                </Button>
                <Button to="/careers" variant="secondary" size="lg">
                  Looking for a role?
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <IllustrationPlaceholder type="talent" className="h-[380px]" alt="IT talent acquisition" />
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What we offer"
            heading="Talent services built for technology"
            className="mb-12"
          />
          <div ref={offeringsRef} className="grid md:grid-cols-2 gap-6">
            {offerings.map((o, i) => {
              const Icon = o.icon;
              return (
                <div
                  key={o.title}
                  className={offeringsInView ? "anim-fade-up" : "opacity-0"}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Card hover className="h-full">
                    <div className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-4">
                      <AnimatedIcon Icon={Icon} size={22} className="text-royal dark:text-royaldark" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                      {o.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {o.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Process"
            heading="Hire faster, hire smarter"
            subheading="Most clients receive a curated shortlist within five working days."
            className="mb-14"
          />
          <div ref={processRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div
                key={p.step}
                className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-6 ${
                  processInView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="font-heading text-4xl font-bold text-[var(--border)] mb-3">
                  {p.step}
                </div>
                <h4 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {p.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Team"
            heading="The People Behind the Placements"
            subheading="Our consultants are more than resumes — they're the driving force behind your success."
            className="mb-10"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-[900px] mx-auto"
          >
            <VideoPlayer src={VIDEOS.people} title="PRI Global — Our People" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="In Action"
            heading="See Our Process in Action"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <VideoPlayer src={VIDEOS.process} title="The PRI Process" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <VideoPlayer
                src={VIDEOS.competitiveRecruiting}
                title="Our Competitive Recruiting Advantage"
              />
            </motion.div>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-6 max-w-xl mx-auto">
            Large video files — playback starts when you press play. On mobile, Wi‑Fi is recommended.
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { num: "12,700+", label: "IT resources successfully placed" },
              { num: "28+",     label: "Years placing technology talent" },
              { num: "96%",     label: "Client retention rate" },
              { num: "300+",    label: "Successful projects delivered" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  {s.num}
                </div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
