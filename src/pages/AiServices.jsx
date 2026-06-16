import {
  ArrowRight,
  BrainCircuit,
  CheckCircle,
  Clock,
  DollarSign,
  Rocket,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import CallToAction from "../components/sections/CallToAction";
import TrustBar from "../components/sections/TrustBar";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import { BOOKING_URL } from "../constants/links";
import {
  aiPodsHero,
  aiPodsProblem,
  aiPodsSolution,
  aiPodsOutcomes,
  aiPodTiers,
  aiPodsCta,
} from "../data/aiPods";

const outcomeIcons = [Rocket, Clock, BrainCircuit, Shield, DollarSign];

function PodCard({ tier }) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-7 h-full transition-shadow duration-300 ${
        tier.featured
          ? "border-royal dark:border-royaldark bg-royal/5 dark:bg-royaldark/10 shadow-lg shadow-royal/10"
          : "border-[var(--border)] bg-[var(--bg-card)] hover:shadow-md"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-royal text-white">
          Popular
        </span>
      )}
      <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
        {tier.name}
      </h3>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
          Best for
        </p>
        <ul className="space-y-2">
          {tier.bestFor.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <AnimatedIcon Icon={CheckCircle} size={15} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
          What you get
        </p>
        <ul className="space-y-2">
          {tier.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <AnimatedIcon Icon={Zap} size={15} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
          How we work
        </p>
        <ul className="space-y-2">
          {tier.cadence.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <AnimatedIcon Icon={Users} size={15} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function AiServices() {
  return (
    <>
      <SEO
        title="AI Services & PRI AI Pods™"
        description="Stop trying to hire AI teams — start building with one. PRI AI Pods™ deliver ready-built AI delivery teams in weeks: Flex, Scale, and Dedicated engagement models."
        url="/ai-services"
      />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 pb-14 md:pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-royaldark/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-royal/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-block text-xs font-semibold text-royaldark uppercase tracking-widest mb-4">
            {aiPodsHero.eyebrow}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto mb-4">
            {aiPodsHero.headline}{" "}
            <span className="text-royaldark">{aiPodsHero.headlineAccent}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            {aiPodsHero.subhead}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={BOOKING_URL} size="lg" variant="glass-accent" target="_blank" rel="noopener noreferrer">
              {aiPodsCta.button} <ArrowRight size={18} />
            </Button>
            <Button to="/ai-innovation" size="lg" variant="secondary" className="border-white/20 text-white hover:bg-white/10">
              Explore PR1SM.AI <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Problem + Solution */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-4">
                {aiPodsProblem.title}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {aiPodsProblem.lead}
              </p>
              <ul className="space-y-3">
                {aiPodsProblem.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <span className="w-2 h-2 rounded-full bg-royal dark:bg-royaldark shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-royal/30 dark:border-royaldark/30 bg-royal/5 dark:bg-royaldark/10 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-royal dark:text-royaldark mb-2">
                {aiPodsSolution.title}
              </p>
              <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
                Meet {aiPodsSolution.brand}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {aiPodsSolution.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Outcomes"
            heading={aiPodsOutcomes.title}
            subheading="Engage a pod when you need speed, expertise, and predictable delivery — without building a team from scratch."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiPodsOutcomes.items.map((item, i) => {
              const Icon = outcomeIcons[i] ?? BrainCircuit;
              return (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0">
                    <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed pt-2">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pod tiers */}
      <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Pod options"
            heading="Choose the right level of AI support"
            subheading="Flex for exploration, Scale for active builds, Dedicated for enterprise programs — all backed by PRI Global delivery."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {aiPodTiers.map((tier) => (
              <PodCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* PR1SM cross-link */}
      <section className="py-14 border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl bg-navy p-8 md:p-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-royaldark mb-2">
                Also explore
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                PR1SM.AI — your intelligence layer
              </h2>
              <p className="text-white/65 text-sm leading-relaxed">
                Need a platform that sits on top of your systems? PR1SM.AI lets teams talk to data in plain English — no rip-and-replace.
              </p>
            </div>
            <Button to="/ai-innovation" variant="glass-accent" size="lg">
              View PR1SM.AI <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            {aiPodsCta.title}
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">{aiPodsCta.subtitle}</p>
          <Button href={BOOKING_URL} size="lg" target="_blank" rel="noopener noreferrer">
            {aiPodsCta.button} <ArrowRight size={18} />
          </Button>
          <p className="mt-6 text-sm text-[var(--text-muted)]">
            Prefer email?{" "}
            <a href="mailto:info@priglobal.com" className="text-royal dark:text-royaldark hover:underline">
              info@priglobal.com
            </a>
            {" · "}
            <Link to="/get-pricing" className="text-royal dark:text-royaldark hover:underline">
              Request pricing
            </Link>
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
