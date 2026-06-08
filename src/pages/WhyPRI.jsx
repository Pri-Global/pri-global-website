import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Globe,
  Users,
  BrainCircuit,
  Handshake,
  Zap,
  Layers,
  Award,
} from "lucide-react";
import SEO from "../components/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import Button from "../components/ui/Button";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import CallToAction from "../components/sections/CallToAction";
import ClientLogos from "../components/ui/ClientLogos";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const EASE = [0.22, 1, 0.36, 1];

const stats = [
  { value: 28, suffix: "+", label: "Years in business" },
  { value: 12700, suffix: "+", label: "Professionals placed" },
  { value: 96, suffix: "%", label: "Client retention" },
  { value: 300, suffix: "+", label: "Projects delivered" },
];

const pillars = [
  {
    icon: Globe,
    title: "Truly Global, Locally Present",
    description:
      "Six offices across the USA, India, Philippines, and Canada — delivering local accountability with global scale and 24/7 coverage.",
  },
  {
    icon: Users,
    title: "A Talent Network That Delivers",
    description:
      "12,700+ placements across every IT discipline. Curated shortlists in 5 days — not the 2–4 weeks typical vendors need.",
  },
  {
    icon: Layers,
    title: "One Partner, Eight Capabilities",
    description:
      "Staffing, managed services, cybersecurity, cloud, data, consulting, and AI — integrated under one roof, not stitched together from subcontractors.",
  },
  {
    icon: BrainCircuit,
    title: "AI Built In, Not Bolted On",
    description:
      "PR1SM.AI is our proprietary intelligence layer. Talk to your data, get answers instantly — no rip-and-replace, no analyst queue.",
  },
];

const comparisons = [
  { feature: "Years in Business", pri: "28+ years", vendor: "< 5 years avg" },
  { feature: "Global Presence", pri: "USA, India, Philippines, Canada", vendor: "Single country" },
  { feature: "Talent Network", pri: "12,700+ placed professionals", vendor: "Limited database" },
  { feature: "AI Platform", pri: "PR1SM.AI (proprietary)", vendor: "None" },
  { feature: "Client Retention", pri: "96%", vendor: "Industry avg: 70%" },
  { feature: "Response Time", pri: "Shortlist in 5 days", vendor: "2–4 weeks" },
  { feature: "Service Breadth", pri: "8 integrated service lines", vendor: "1–2 specialties" },
  { feature: "Fortune 500 Experience", pri: true, vendor: false },
  { feature: "Dedicated Account Team", pri: true, vendor: false },
];

function CompareValue({ value, highlight }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15">
        <Check size={18} className="text-emerald-500" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10">
        <X size={18} className="text-red-400/80" />
      </span>
    );
  }
  return (
    <span className={`text-sm leading-snug ${highlight ? "font-medium text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
      {value}
    </span>
  );
}

function ComparisonCard({ row, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: EASE }}
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden"
    >
      <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{row.feature}</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-[var(--border-subtle)]">
        <div className="p-4 sm:p-5 bg-royal/5 dark:bg-royaldark/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-royal dark:text-royaldark mb-2">
            PRI Global
          </p>
          <div className="flex items-center min-h-[2rem]">
            <CompareValue value={row.pri} highlight />
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
            Typical Vendor
          </p>
          <div className="flex items-center min-h-[2rem]">
            <CompareValue value={row.vendor} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyPRI() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="Why PRI Global"
        description="28+ years, 12,700+ placements, 96% client retention, and PR1SM.AI. See why leading organizations choose PRI Global over typical IT vendors."
        url="/why-pri-global"
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 md:pb-20 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-royal/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
                Why PRI Global
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                Built for outcomes,
                <br />
                <span className="text-royal dark:text-royaldark">not just contracts.</span>
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                Most IT vendors sell hours. PRI Global delivers results — with 28 years of proven
                delivery, a global talent network, and the only proprietary AI platform in the
                category.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button to="/get-pricing" size="lg">
                  Get Pricing <ArrowRight size={18} />
                </Button>
                <Button to="/about" variant="secondary" size="lg">
                  Our Story
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
                  alt="PRI Global team collaboration"
                  className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              </div>
              <div className="group absolute -bottom-5 -left-4 sm:-left-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg px-5 py-4 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <AnimatedIcon Icon={Award} size={16} className="text-royal dark:text-royaldark" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">Since 1997</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Trusted by Fortune 500 and mid-market leaders alike.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 md:py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold text-royal uppercase tracking-widest mb-2">
              By the numbers
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Proof, not promises.
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="text-center bg-white/5 border border-white/10 rounded-2xl py-6 px-3"
              >
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[11px] sm:text-xs text-white/50 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <ClientLogos label="Trusted by leading organizations" />
      </div>

      {/* Pillars */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What Sets Us Apart"
            heading="Four reasons clients stay — and grow — with PRI"
            subheading="Depth, speed, breadth, and innovation — the combination most vendors simply can't match."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              >
                <Card hover className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-4">
                    <AnimatedIcon Icon={item.icon} size={24} className="text-royal dark:text-royaldark" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <SectionHeading
                label="Head-to-Head"
                heading="PRI Global vs. the typical IT vendor"
                subheading="The differences that matter when you're betting on a long-term technology partner."
                align="left"
              />
              <div className="mt-8 hidden lg:flex flex-col gap-4">
                <div className="group flex items-start gap-3">
                  <AnimatedIcon Icon={Handshake} size={20} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Dedicated account teams — not a rotating cast of account managers.
                  </p>
                </div>
                <div className="group flex items-start gap-3">
                  <AnimatedIcon Icon={Zap} size={20} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Shortlists in days, not weeks — because speed to talent is speed to value.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              {comparisons.map((row, i) => (
                <ComparisonCard key={row.feature} row={row} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-heading text-7xl text-royal/10 leading-none select-none" aria-hidden>
              &ldquo;
            </div>
            <p className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-snug mb-6 relative">
              We don&apos;t measure success by placements made — we measure it by the outcomes our
              clients achieve.
            </p>
            <footer className="text-sm text-[var(--text-secondary)]">
              — PRI Global leadership philosophy
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
