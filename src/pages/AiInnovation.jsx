import {
  BrainCircuit,
  Database,
  Shield,
  Zap,
  Cpu,
  Settings,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Lock,
  Layers,
  MessageSquare,
  Clock,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import pr1smLogo        from "../assets/pr1sm-logo.png";
import awsLogo          from "../assets/Amazon_Web_Services_Logo.svg.png";
import azureLogo        from "../assets/Microsoft_Azure.svg.png";
import databricksLogo   from "../assets/azure-databricks.svg";
import CallToAction from "../components/sections/CallToAction";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import AnimatedLogo from "../components/ui/AnimatedLogo";
import { useInView } from "../hooks/useInView";

const prismPillars = [
  { icon: Layers,       title: "Sits on Top, Not in the Way",       description: "No Rip-and-Replace. No Disruption. Works with your existing systems and data." },
  { icon: MessageSquare,title: "Talk to Your Data",                  description: "Use plain English. Ask questions. Get answers in seconds." },
  { icon: Zap,          title: "Decisions Instantly",                description: "Turn scattered data into clear insights so you can move faster with confidence." },
  { icon: Shield,       title: "Secure. Private. Enterprise-Grade.", description: "Your data stays yours. Secure, compliant, and built for the enterprise." },
  { icon: BrainCircuit, title: "Built for How You Work",             description: "Across apps, teams and systems — PR1SM fits the way your business runs." },
];

const prismDelivery = [
  { title: "Weeks, Not Months",    description: "Pre-built connectors and reusable templates accelerate value." },
  { title: "Plain Language",       description: "Executives ask the way they think. Voice or text. No SQL. No analyst queue." },
  { title: "No Rip-and-Replace",   description: "Layers above your applications. No data migration. No platform swap." },
];

const prismImpact = [
  { icon: Zap,          title: "Faster Decisions",  description: "Make confident calls with real-time insights." },
  { icon: DollarSign,   title: "Lower Costs",        description: "Eliminate manual reporting and analyst bottlenecks." },
  { icon: Clock,        title: "More Time",          description: "Automate answers so your team focuses on growth." },
  { icon: TrendingUp,   title: "Better Outcomes",    description: "Align teams, track what matters, and drive performance." },
];

const prismIndustries = [
  "Manufacturing — shop floor, ERP, and margin visibility in one view",
  "Construction — QuickBooks, job costing, and cash position in real time",
  "MSPs — the brain above HaloPSA and ConnectWise",
  "Private Equity — standardized KPIs across portfolio companies",
  "Home Health — clinical and reimbursement intelligence across EMR/EHR",
  "Any operator with multiple apps and slow access to answers",
];

const aiServices = [
  {
    icon: Layers,
    title: "Enterprise Applications",
    description:
      "Custom applications powered by modern AI — built to your specifications, deployed securely in your environment, and designed to scale.",
  },
  {
    icon: Database,
    title: "Data & AI Solutions",
    description:
      "Bespoke data platforms on secure, compliant architectures. Real-time insights at scale with Databricks, AWS, and Microsoft Azure.",
  },
  {
    icon: Settings,
    title: "Intelligent Automation",
    description:
      "Streamline operations and reduce costs. Purpose-built automation for manufacturing, retail, healthcare, and more.",
  },
  {
    icon: BrainCircuit,
    title: "Generative AI Development",
    description:
      "From Gen AI strategy to production deployment — LLM integration, RAG pipelines, and AI governance frameworks that actually ship.",
  },
];

const partners = [
  { name: "Databricks",          desc: "Unified data & AI platform",         logo: databricksLogo },
  { name: "Amazon Web Services", desc: "Cloud infrastructure & AI services",  logo: awsLogo        },
  { name: "Microsoft Azure",     desc: "Cloud & AI platform",                 logo: azureLogo      },
];

export default function AiInnovation() {
  const [prismRef, prismInView]       = useInView({ threshold: 0.05 });
  const [deliveryRef, deliveryInView] = useInView({ threshold: 0.05 });
  const [impactRef, impactInView]     = useInView({ threshold: 0.05 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.05 });
  const [partnersRef, partnersInView] = useInView({ threshold: 0.05 });

  return (
    <>
      {/* ── SECTION 1: Hero ──────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-royaldark/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-royal/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-royaldark uppercase tracking-widest mb-4">
                AI &amp; Innovation
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Intelligent systems
                <br />
                <span className="text-royaldark">built for your business.</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                PRI Global designs, builds, and deploys AI solutions that generate measurable
                value — from strategy to production. We make AI work for you, not the other
                way around.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royaldark text-white font-medium text-sm hover:bg-royaldark/80 transition-colors"
              >
                Start your AI journey <ArrowRight size={16} />
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center justify-center h-[380px]">
                <img
                  src={pr1smLogo}
                  alt="PR1SM.AI"
                  className="w-full max-w-[480px] object-contain drop-shadow-2xl"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PR1SM.AI Feature ──────────────────────────────────────── */}
      {/* ── SECTION 2: PR1SM.AI Platform ─────────────────────────────────────── */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-xs font-bold tracking-widest uppercase text-royal mb-5">
              Your AI Intelligence Layer
            </span>
            <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-royal dark:text-royaldark mb-4 tracking-tight">
              PR1SM.AI
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-snug mb-3">
              Less Time in the Office. More Time on What Matters.
            </h2>
            <p className="text-lg font-semibold text-royal dark:text-royaldark mb-4">
              PR1SM.AI Turns Your Data Into Decisions. Instantly.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              Talk to Your Data. Get Answers. Make Smarter Moves.
            </p>
          </div>

          {/* 5 pillars */}
          <div ref={prismRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {prismPillars.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex gap-4 ${
                    prismInView ? "anim-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0 mt-0.5">
                    <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-1 leading-snug">{f.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Problem + Who grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-royal mb-3 block">The Problem We Solve</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Your business runs on multiple applications that don't talk to each other.
                Your data is fragmented, and getting information takes hours or days.
                PR1SM unifies it all into a single, conversational intelligence layer.
              </p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-royal mb-3 block">Who It's For</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Any business running multiple systems that don't talk to each other,
                with fragmented data and reports that take hours or days.
                Industry-agnostic by design.
              </p>
            </div>
          </div>

          {/* How PR1SM Delivers */}
          <div ref={deliveryRef} className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] text-center mb-8">How PR1SM Delivers</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {prismDelivery.map((d, i) => (
                <div
                  key={d.title}
                  className={`text-center bg-royal/5 dark:bg-royaldark/10 border border-royal/15 rounded-2xl p-6 ${
                    deliveryInView ? "anim-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h4 className="font-heading font-bold text-royal dark:text-royaldark text-lg mb-2">{d.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who PR1SM Fits */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-royal mb-4 block">Who PR1SM Fits</span>
            <div className="grid sm:grid-cols-2 gap-3">
              {prismIndustries.map((ind) => (
                <div key={ind} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle size={15} className="text-royal dark:text-royaldark shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact grid */}
          <div ref={impactRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {prismImpact.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 text-center ${
                    impactInView ? "anim-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mx-auto mb-3">
                    <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
                  </div>
                  <h4 className="font-heading font-bold text-[var(--text-primary)] mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA banner */}
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-center">
            <p className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              STOP DIGGING. START ASKING.
            </p>
            <p className="text-white/60 mb-6 text-lg">
              PR1SM.AI — Your Data. Your Questions. Instant Answers.
            </p>
            <a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-royaldark text-white font-semibold text-sm hover:bg-royaldark/80 transition-colors mb-4"
            >
              See PR1SM in Action <ExternalLink size={16} />
            </a>
            <p className="text-white/40 text-sm">
              Let's build your competitive advantage. Let's build it today.
            </p>
          </div>

        </div>
      </section>

      {/* ── POSTER SECTION ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">Overview</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)]">PR1SM.AI in Action</h2>
          </div>
          <div className="flex flex-col items-center gap-6">
            {/* Styled poster card (no image file available) */}
            <div className="w-full max-w-[600px] rounded-2xl shadow-xl border border-[var(--border)] overflow-hidden bg-navy">
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                <span className="font-heading font-extrabold text-royaldark text-2xl tracking-tight">PR1SM.AI</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-3 py-1">Your AI Intelligence Layer</span>
              </div>
              <div className="px-8 py-8 space-y-6">
                <div>
                  <p className="font-heading text-2xl font-bold text-white mb-1">Less Time in the Office.</p>
                  <p className="font-heading text-2xl font-bold text-royaldark">More Time on What Matters.</p>
                </div>
                <p className="text-white/60 leading-relaxed text-sm">
                  PR1SM.AI sits on top of your existing systems — no rip-and-replace, no disruption.
                  Talk to your data in plain English. Get decisions instantly.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Manufacturing", "Construction", "MSPs", "Private Equity", "Home Health", "Any Operator"].map((ind) => (
                    <span key={ind} className="text-xs text-white/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-royaldark inline-block" />{ind}
                    </span>
                  ))}
                </div>
                <p className="font-heading text-lg font-bold text-white text-center border-t border-white/10 pt-6">
                  STOP DIGGING. START ASKING.
                </p>
              </div>
            </div>
            <a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm hover:bg-[var(--border-subtle)] transition-colors"
            >
              View Full Overview <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: AI Services Grid ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Capabilities"
            heading="What we build with AI"
            subheading="From custom enterprise applications to intelligent automation — our AI practice covers the full delivery lifecycle."
            className="mb-12"
          />
          <div ref={servicesRef} className="grid md:grid-cols-2 gap-6">
            {aiServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={servicesInView ? "anim-fade-up" : "opacity-0"}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Card hover className="h-full">
                    <div className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-4">
                      <AnimatedIcon Icon={Icon} size={22} className="text-royal dark:text-royaldark" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {s.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Technology Partners ───────────────────────────────────── */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
              Technology Partners
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              Built on world-class platforms
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              PRI Global holds certified expertise across leading AI and cloud platforms.
            </p>
          </div>

          <div
            ref={partnersRef}
            className="flex flex-col sm:flex-row gap-5 justify-center items-stretch max-w-3xl mx-auto"
          >
            {partners.map((p, i) => (
              <div
                key={p.name}
                className={`group flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-7 flex flex-col items-center gap-4 hover:shadow-md transition-shadow ${
                  partnersInView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AnimatedLogo src={p.logo} alt={p.name} />
                <div className="text-center">
                  <p className="font-heading font-bold text-sm text-[var(--text-primary)]">{p.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-royaldark/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-royal/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-block text-xs font-semibold text-royaldark uppercase tracking-widest mb-4">
            Get Started
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5">
            Ready to build your AI advantage?
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            PRI Global designs, builds, and deploys AI solutions that generate measurable
            value — from strategy to production. Let's build it today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-royaldark text-white font-semibold text-sm hover:bg-royaldark/80 transition-colors"
            >
              Talk to our AI team <ArrowRight size={16} />
            </a>
            <a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Explore PR1SM.AI <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
