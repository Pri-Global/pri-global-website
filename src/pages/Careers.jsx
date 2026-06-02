import { MapPin, Clock, ArrowRight } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useInView } from "../hooks/useInView";

const openRoles = [
  {
    id: 1,
    title: "Senior Cloud Architect",
    department: "Technology",
    location: "USA / Remote",
    type: "Permanent",
    description: "Lead cloud transformation projects for enterprise clients. AWS/Azure certified preferred. 6+ years experience.",
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    department: "AI Innovation",
    location: "India / Remote",
    type: "Permanent",
    description: "Build and deploy machine learning models as part of our PR1SM.AI platform team. Python, PyTorch, MLOps.",
  },
  {
    id: 3,
    title: "Technology Consultant",
    department: "Consulting",
    location: "USA",
    type: "Permanent",
    description: "Drive digital transformation for financial services clients. 3+ years consulting experience required.",
  },
  {
    id: 4,
    title: "Talent Acquisition Specialist",
    department: "Talent Solutions",
    location: "India / Global",
    type: "Permanent",
    description: "Recruit top-tier technology professionals across global markets. Technical recruitment background preferred.",
  },
  {
    id: 5,
    title: "Cybersecurity Consultant",
    department: "Technology",
    location: "USA / India",
    type: "Permanent",
    description: "Deliver security assessments, penetration testing, and advisory work for enterprise clients. CREST/OSCP desirable.",
  },
  {
    id: 6,
    title: "Graduate Technology Analyst",
    department: "Consulting",
    location: "India",
    type: "Permanent",
    description: "Join our graduate programme and kick-start your technology consulting career. Exceptional graduates from any discipline.",
  },
];

const perks = [
  { emoji: "💡", title: "Learning & Development", desc: "Annual L&D budget, certification sponsorship, and a global mentorship programme." },
  { emoji: "🌍", title: "Global Mobility", desc: "Opportunities to work across our USA and India offices, with global project exposure." },
  { emoji: "⚖️", title: "Work-Life Balance", desc: "Hybrid working, flexible hours, and generous annual leave." },
  { emoji: "🏥", title: "Health & Wellbeing", desc: "Medical insurance, mental health support, and a wellness allowance." },
  { emoji: "💰", title: "Competitive Rewards", desc: "Market-leading base salary, performance bonus, and growth opportunities." },
  { emoji: "🎯", title: "Meaningful Work", desc: "Work on high-impact projects with global enterprises and innovative scale-ups." },
];

export default function Careers() {
  const [perksRef, perksInView] = useInView({ threshold: 0.05 });
  const [rolesRef, rolesInView] = useInView({ threshold: 0.05 });

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-20 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                Careers at PRI Global
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                Build your career
                <br />
                <span className="text-royal dark:text-royaldark">with purpose.</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                We're a team of curious, ambitious technologists who believe technology should make the
                world work better. Join us and work on problems that matter, with people who inspire.
              </p>
              <Button href="#open-roles" size="lg">
                View open roles <ArrowRight size={18} />
              </Button>
            </div>
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                  alt="Modern open office workspace"
                  className="w-full h-[420px] object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-primary)]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Why PRI Global" heading="More than just a job" className="mb-12" />
          <div ref={perksRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className={perksInView ? "anim-fade-up" : "opacity-0"}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Card className="h-full">
                  <div className="text-3xl mb-3">{perk.emoji}</div>
                  <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{perk.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture image */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80"
                alt="PRI Global team collaboration"
                className="w-full h-[340px] object-cover opacity-0 transition-opacity duration-500"
                loading="lazy"
                decoding="async"
                onLoad={(e) => { e.target.style.opacity = 1; }}
              />
            </div>
            <div>
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                Our Culture
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-5">
                People who care about outcomes
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                At PRI Global, we believe the best technology is built by teams who genuinely care — about each other, about clients, and about the impact of their work. We foster a culture of openness, continuous learning, and shared accountability.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                With offices across the USA, India, Philippines, and Canada, you'll work in a truly global environment while always feeling like part of a close-knit, supportive team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Open Roles"
            heading="Join the team"
            subheading="We're always looking for exceptional people. Don't see a perfect fit? Send us a speculative application."
            className="mb-12"
          />
          <div ref={rolesRef} className="space-y-4">
            {openRoles.map((role, i) => (
              <div
                key={role.id}
                className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md hover:shadow-navy/5 dark:hover:shadow-black/20 transition-shadow ${
                  rolesInView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                      {role.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-royal/10 dark:bg-royaldark/15 text-royal dark:text-royaldark font-medium">
                      {role.department}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {role.type}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{role.description}</p>
                </div>
                <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors shrink-0">
                  Apply <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Don't see your perfect role?
            </p>
            <a
              href="mailto:info@priglobal.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-royal dark:text-royaldark hover:underline"
            >
              Send a speculative application <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
