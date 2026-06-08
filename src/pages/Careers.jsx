import { Clock, TrendingUp, Users, ArrowRight, Award, Lightbulb, Network, MessageSquare, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import CallToAction from "../components/sections/CallToAction";
import RatingWidget from "../components/ui/RatingWidget";
import { useInView } from "../hooks/useInView";
import {
  JOBDIVA_PORTAL_URL,
  WORKING_AT_PRI_URL,
  JOB_SEEKER_FAQ_URL,
  OFFICE_PHOTOS,
} from "../constants/links";

const EASE = [0.22, 1, 0.36, 1];

const positionTypes = [
  {
    icon: Clock,
    title: "Contract",
    desc: "Flexible contract engagements across hundreds of clients. Work on innovative projects with top companies.",
  },
  {
    icon: TrendingUp,
    title: "Contract-to-Hire",
    desc: "Start as a contractor with a clear path to full-time employment. The best of both worlds.",
  },
  {
    icon: Users,
    title: "Direct Hire",
    desc: "Full-time permanent positions at leading organizations. PRI matches you with employers who value your skills.",
  },
];

const benefits = [
  { icon: Award, title: "Recognition", desc: "Your unique talents, skills, and perspectives will be recognized" },
  { icon: Lightbulb, title: "Innovation", desc: "Work on challenging and innovative projects" },
  { icon: Network, title: "Network", desc: "Connected with respected, sought-after employers" },
  { icon: Clock, title: "Flexibility", desc: "Remote/telecommute options, pending manager approval" },
  { icon: MessageSquare, title: "Feedback", desc: "We solicit employee feedback on a regular basis" },
  { icon: Heart, title: "Growth", desc: "Competitive compensation, benefits, and growth opportunities" },
];

const employeeQuotes = [
  {
    quote:
      "There are so many wonderful things to say about PRI Global. If you seek gainful employment where your work and decisions are accepted and appreciated, this is the place for you.",
    author: "Employee, St. Louis, MO",
    source: "Indeed",
  },
  {
    quote:
      "I worked at PRI for a year. Wonderful CEO, great team and the clients love working with them. This gives a consultant many options once their project comes to an end.",
    author: "Former Employee, St. Louis, MO",
    source: "Indeed",
  },
];

export default function Careers() {
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.05 });
  const [photosRef, photosInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEO
        title="Careers at PRI Global — Join Our Team"
        description="Join PRI Global's team of technology innovators. Contract, contract-to-hire, and direct hire IT positions available. Remote-friendly. Competitive compensation."
        url="/careers"
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 md:pb-20 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                Join Our Team
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                Build Your IT Career with PRI Global
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                Join an industry-leading IT staffing and solutions organization. Our global presence
                and exclusive focus on IT allow us to deliver a wide range of contract and full-time
                employment opportunities.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button href={JOBDIVA_PORTAL_URL} target="_blank" rel="noopener noreferrer" size="lg">
                  Search Open Positions <ArrowRight size={18} />
                </Button>
                <Button href={WORKING_AT_PRI_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
                  Learn About Working at PRI
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                alt="Modern office workspace"
                className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Position types */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Flexible Positions"
            heading="Find Your Perfect Fit"
            className="mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {positionTypes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              >
                <Card className="h-full">
                  <item.icon size={28} className="text-royal dark:text-royaldark mb-4" />
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PRI */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why PRI Global"
            heading="Challenged. Rewarded. Appreciated."
            className="mb-10"
          />
          <div ref={benefitsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className={benefitsInView ? "anim-fade-up" : "opacity-0"}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <Card className="h-full">
                  <b.icon size={22} className="text-royal dark:text-royaldark mb-3" />
                  <h3 className="font-heading font-bold text-[var(--text-primary)] mb-2">{b.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{b.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What Employees Say"
            heading="Rated 4.1★ by Our Team"
            subheading="Don't take our word for it — hear directly from PRI Global employees."
            className="mb-8"
          />
          <RatingWidget className="mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {employeeQuotes.map((q) => (
              <blockquote
                key={q.author}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed mb-4">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="text-xs text-[var(--text-muted)]">
                  — {q.author} · {q.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Job search CTA */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Find Your Next IT Role?
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
            Search hundreds of open IT positions across the US and globally. Submit your resume and
            we&apos;ll match you with the right opportunity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button href={JOBDIVA_PORTAL_URL} target="_blank" rel="noopener noreferrer" size="lg">
              Search All Open Positions <ArrowRight size={18} />
            </Button>
            <Button href={JOB_SEEKER_FAQ_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
              Job Seeker FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Office photos */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Offices" heading="Life at PRI Global" className="mb-10" />
          <div ref={photosRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICE_PHOTOS.map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-xl aspect-video ${photosInView ? "anim-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img
                  src={src}
                  alt={`PRI Global office ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
