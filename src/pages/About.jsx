import { MapPin, Phone, ExternalLink, Mail, Star } from "lucide-react";
import SEO from "../components/SEO";
import { GLASSDOOR_URL } from "../constants/links";
import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import CallToAction from "../components/sections/CallToAction";
import WorldMap from "../components/sections/WorldMap";
import Timeline from "../components/sections/Timeline";
import { useInView } from "../hooks/useInView";
import { priGlobalLeadership, prismLeadership } from "../data/team";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import PriGlobalLeaderRow from "../components/team/PriGlobalLeaderRow";
import PrismTeamSection from "../components/team/PrismTeamSection";
import PrismLeadershipDivider from "../components/team/PrismLeadershipDivider";
import VideoSection from "../components/sections/VideoSection";
import { VIDEOS } from "../data/videos";

const values = [
  {
    title: "Client First",
    description:
      "Every decision we make is filtered through a single question: is this genuinely good for the client? We measure success by your outcomes, not our revenues.",
  },
  {
    title: "Deep Expertise",
    description:
      "We hire and develop the best technology professionals in the industry. Our consultants don't just know the theory—they've done the work.",
  },
  {
    title: "Radical Transparency",
    description:
      "No jargon, no hidden agendas. We give you our honest assessment—even when it's not what you want to hear—because that's how we build real trust.",
  },
  {
    title: "Continuous Innovation",
    description:
      "The technology landscape never stands still. Neither do we. We invest heavily in R&D and keep our clients at the frontier of what's possible.",
  },
];


export default function About() {
  const [valuesRef, valuesInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEO
        title="About PRI Global — 28 Years of Technology Excellence"
        description="Founded in 1997 in Ellisville, Missouri. PRI Global operates across USA, India, Philippines, and Canada. Meet our leadership team and learn our story."
        url="/about"
      />
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-royal/6 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                About PRI Global
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                We make technology
                <br />
                <span className="text-royal dark:text-royaldark">work for people.</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Founded in 1997, PRI Global (PRI India Private Services Limited) is a technology
                consulting and talent business with operations across the USA, India, and globally.
                Over 28 years of trusted services, we have built a reputation for genuine expertise, transparent advice,
                and relentless focus on outcomes—placing 12,700+ IT resources and delivering 300+
                projects for clients worldwide.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
                  alt="Modern collaborative office environment"
                  className="w-full h-[420px] object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)]/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSection
        label="Our Growth Story"
        heading="From Missouri to the world"
        subheading="From Ellisville, Missouri to a global presence across 4 countries — watch our expansion story."
        src={VIDEOS.officeExpansion}
        title="PRI Global Office Expansion"
        sectionClassName="py-20"
      />

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" heading="What drives us" className="mb-8" />
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed border-l-2 border-royal pl-4">
            We built dark mode not as an afterthought — but as the primary experience for executives
            and decision-makers who do their best thinking after hours. PRI Global's interface was
            designed to be as comfortable at midnight as it is at noon.
          </p>
          <div ref={valuesRef} className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-7 ${
                  valuesInView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* PRI Global Leadership */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14 max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Our Leadership
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              The Team Behind PRI Global
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              A cohesive, experienced, diverse team managing operations across six offices in the
              U.S., India, and the Philippines.
            </p>
            <a
              href={GLASSDOOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-sm font-medium text-[var(--text-secondary)] hover:border-royal/40 hover:text-[var(--text-primary)] transition-colors"
            >
              <Star size={14} className="text-[#0caa41] fill-[#0caa41]" />
              4.1★ on Glassdoor — 65+ employee reviews
            </a>
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {priGlobalLeadership.map((member, i) => (
              <PriGlobalLeaderRow key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <PrismLeadershipDivider />

      {/* PR1SM.AI Team — always dark brand section */}
      <section className="py-24 bg-[#0d1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14 max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1B3E] border border-[#1A56DB] text-xs font-bold tracking-widest uppercase text-[#93c5fd] mb-4">
              PR1SM.AI
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              The PR1SM.AI Team
            </h2>
            <p className="text-[#6a8aaa] leading-relaxed">
              Experienced leaders. Proven track record.
            </p>
          </motion.div>

          <PrismTeamSection members={prismLeadership} />
        </div>
      </section>

      <VideoSection
        label="Take a Tour"
        heading="Our Offices Around the World"
        subheading="Get a feel for the PRI Global environment — where talent meets technology."
        src={VIDEOS.officeTour}
        title="PRI Global Office Tour"
        sectionClassName="py-20"
        bgClassName="bg-[var(--bg-secondary)]"
      />

      {/* Talk to Our Leaders */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">Direct Contact</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Talk to Our Leaders</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                initials: "KP",
                name: "Keenan Patel",
                title: "CEO, PRI Global",
                phone: "636.256.7172",
                email: "info@priglobal.com",
                address: "174 Clarkson Road, Ellisville, MO 63011",
                note: "PRI Global HQ",
              },
              {
                initials: "AP",
                name: "Ajay Patel",
                title: "Chairman, PRI Global & Chairman & Founder, PR1SM.AI",
                phone: "636-779-1651",
                email: "ajay@pr1sm.ai",
                address: "174 Clarkson Road, Ellisville, MO 63011",
              },
              {
                initials: "LM",
                name: "Liezl Moss",
                title: "Managing Director & Growth Strategy, PR1SM.AI",
                phone: "314-784-5854",
                email: "liezl.moss@PR1SM.AI",
                address: "174 Clarkson Road, Ellisville, MO 63011",
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-7"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-royal flex items-center justify-center shrink-0">
                    <span className="text-white font-heading font-bold text-sm">{person.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)] leading-tight">{person.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug mt-0.5">{person.title}</p>
                    {person.note && (
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{person.note}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <a href={`tel:${person.phone.replace(/-/g, "")}`} className="group/link flex items-center gap-3 text-[var(--text-secondary)] hover:text-royal transition-colors">
                    <AnimatedIcon Icon={Phone} size={14} className="text-royal shrink-0" /> {person.phone}
                  </a>
                  <a href={`mailto:${person.email}`} className="group/link flex items-center gap-3 text-[var(--text-secondary)] hover:text-royal transition-colors">
                    <AnimatedIcon Icon={Mail} size={14} className="text-royal shrink-0" /> {person.email}
                  </a>
                  <div className="group/link flex items-start gap-3 text-[var(--text-secondary)]">
                    <AnimatedIcon Icon={MapPin} size={14} className="text-royal shrink-0 mt-0.5" /> {person.address}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World map */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold text-royal uppercase tracking-widest">
              Our Global Presence
            </span>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Ellisville, MO · Hyderabad · Pune · Manila · Ottawa
            </p>
          </div>
          <WorldMap />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                label="Get in Touch"
                heading="Let's talk"
                subheading="Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you."
                align="left"
                className="mb-8"
              />
              <div className="space-y-4 text-sm text-[var(--text-secondary)]">
                <a
                  href="tel:6362567172"
                  className="group flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors"
                >
                  <AnimatedIcon Icon={Phone} size={16} className="text-royal" /> 636.256.7172
                </a>
                <div className="group flex items-start gap-3">
                  <AnimatedIcon Icon={MapPin} size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">Headquarters — USA</div>
                    <div>174 Clarkson Road, Ellisville, MO 63011</div>
                  </div>
                </div>
                <div className="group flex items-start gap-3">
                  <AnimatedIcon Icon={MapPin} size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">India — Hyderabad &amp; Pune</div>
                    <div>Madhapur, Hyderabad · Viman Nagar, Pune</div>
                  </div>
                </div>
                <div className="group flex items-start gap-3">
                  <AnimatedIcon Icon={MapPin} size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">Also in</div>
                    <div>Manila, Philippines · Ottawa, Canada</div>
                  </div>
                </div>
                <a
                  href="https://priglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors"
                >
                  <AnimatedIcon Icon={ExternalLink} size={16} className="text-royal" /> Contact via priglobal.com
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40 resize-none"
                  placeholder="Tell us about your project or challenge..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-royal text-white font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
