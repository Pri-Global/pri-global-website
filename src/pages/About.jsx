import { MapPin, Phone, ExternalLink, Mail } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import CallToAction from "../components/sections/CallToAction";
import WorldMap from "../components/ui/WorldMap";
import { useInView } from "../hooks/useInView";

import ajayPhoto    from "../assets/ajay-patel.jpg";
import keenanPhoto  from "../assets/keenan-patel.png";
import marlaPhoto   from "../assets/marla-dicandia.jpg";
import sureshPhoto  from "../assets/suresh-karampudi.jpg";

const leaders = [
  {
    photo: ajayPhoto,
    name:  "Ajay Patel",
    title: "Chairman",
    location: "Ellisville, MO",
    bio: "Visionary thought leader with 30+ years of hands-on IT experience. During his 24 years as CEO of PRI Global, Ajay built long-lasting partnerships with Fortune 500 companies worldwide, leveraging technology and best practices to develop innovative business solutions for C-level executives.",
    edu: "B.S. Computer Science · Northwestern Kellogg School of Management",
  },
  {
    photo: keenanPhoto,
    name:  "Keenan Patel",
    title: "Chief Executive Officer",
    location: "Ellisville, MO",
    bio: "Keenan leads PRI Global's global strategic planning and operations, bringing both entrepreneurial and intrapreneurial insight. Since joining in 2014, he has driven profitable revenue growth and integrated business units into a cohesive, matrixed organisation focused on long-term success.",
    edu: "B.S. Finance, University of Missouri-Columbia · Lean Six Sigma Green Belt (in progress)",
  },
  {
    photo: marlaPhoto,
    name:  "Marla Dicandia",
    title: "Chief Financial Officer",
    location: "Ellisville, MO",
    bio: "Marla oversees PRI Global's Finance, Accounting, and People Operations. With over two decades of leadership, she brings deep expertise in financial stewardship, risk management, and organisational transformation — empowering PRI Global to invest boldly in innovation while maintaining rigorous fiscal discipline.",
    edu: "B.S. Accounting, SIU · MBA, Creighton University · CPA",
  },
  {
    photo: sureshPhoto,
    name:  "Suresh Karampudi",
    title: "Managing Director, PRI Global India",
    location: "Hyderabad, India",
    bio: "Suresh leads PRI Global's India operations, driving delivery excellence and talent strategy across the region. With 20+ years in technology consulting, he builds high-performing teams and aligns regional execution with global strategic goals to deliver transformative client outcomes.",
    edu: "M.S. Computer Science",
  },
];

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
  const [valuesRef, valuesInView]       = useInView({ threshold: 0.05 });
  const [leadershipRef, leadershipInView] = useInView({ threshold: 0.05 });

  return (
    <>
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
                Founded in 1996, PRI Global (PRI India Private Services Limited) is a technology
                consulting and talent business with operations across the USA, India, and globally.
                Over 29 years we have built a reputation for genuine expertise, transparent advice,
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

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Our Values" heading="What drives us" className="mb-12" />
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

      {/* Leadership */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div
            ref={leadershipRef}
            className={`text-center mb-16 ${leadershipInView ? "anim-fade-up" : "opacity-0"}`}
          >
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Our Leadership
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
              The people behind PRI Global
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              29 years of technology excellence — powered by a leadership team that combines
              vision, operational depth, and a people-first approach.
            </p>
          </div>

          {/* Leaders — editorial rows */}
          <div className="space-y-8">
            {leaders.map((leader, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col md:flex-row ${flip ? "md:flex-row-reverse" : ""} gap-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                >
                  {/* Photo */}
                  <div className="md:w-64 lg:w-72 shrink-0">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-64 md:h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center px-6 py-8 md:py-10 flex-1">
                    <p className="text-xs font-semibold text-royal uppercase tracking-widest mb-2">
                      {leader.title}
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mb-5">
                      <MapPin size={11} className="shrink-0" />
                      {leader.location}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      {leader.bio}
                    </p>

                    <div className="flex items-start gap-2 text-xs text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4">
                      <span className="font-medium shrink-0">🎓</span>
                      <span className="break-words">{leader.edu}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Subtle CTA */}
          <div className="text-center mt-12">
            <a
              href="https://priglobal.com/leadership-team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-royal hover:underline font-medium"
            >
              Full leadership profiles at priglobal.com <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Talk to Our Leaders */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">Direct Contact</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Talk to Our Leaders</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { initials: "AP", name: "Ajay Patel", title: "CEO & Chairman, PRI Global / PR1SM.AI", phone: "636-779-1651", email: "ajay@pr1sm.ai", address: "174 Clarkson Road, Ellisville, MO 63011" },
              { initials: "LM", name: "Liezl Moss", title: "Managing Director & Growth Strategy", phone: "314-784-5854", email: "liezl.moss@pr1sm.ai", address: "174 Clarkson Road, Ellisville, MO 63011" },
            ].map((person) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-7"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-royal flex items-center justify-center shrink-0">
                    <span className="text-white font-heading font-bold text-sm">{person.initials}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-[var(--text-primary)] leading-tight">{person.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug mt-0.5">{person.title}</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <a href={`tel:${person.phone.replace(/-/g, "")}`} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-royal transition-colors">
                    <Phone size={14} className="text-royal shrink-0" /> {person.phone}
                  </a>
                  <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-royal transition-colors">
                    <Mail size={14} className="text-royal shrink-0" /> {person.email}
                  </a>
                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <MapPin size={14} className="text-royal shrink-0 mt-0.5" /> {person.address}
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
      <section className="py-20">
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
                  className="flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors"
                >
                  <Phone size={16} className="text-royal" /> 636.256.7172
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">Headquarters — USA</div>
                    <div>174 Clarkson Road, Ellisville, MO 63011</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">India — Hyderabad &amp; Pune</div>
                    <div>Madhapur, Hyderabad · Viman Nagar, Pune</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-royal shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-medium text-[var(--text-primary)]">Also in</div>
                    <div>Manila, Philippines · Ottawa, Canada</div>
                  </div>
                </div>
                <a
                  href="https://priglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors"
                >
                  <ExternalLink size={16} className="text-royal" /> Contact via priglobal.com
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
