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
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import pr1smLogo        from "../assets/pr1sm-logo.png";
import awsLogo          from "../assets/Amazon_Web_Services_Logo.svg.png";
import azureLogo        from "../assets/Microsoft_Azure.svg.png";
import databricksLogo   from "../assets/azure-databricks.svg";
import CallToAction from "../components/sections/CallToAction";
import AnimatedIcon from "../components/ui/AnimatedIcon";
import { useInView } from "../hooks/useInView";

const prismGrid = [
  {
    icon: BrainCircuit,
    title: "Custom-fit AI",
    description:
      "Built around your workflows, not generic templates. PR1SM.AI learns the language, context, and logic of your specific business.",
  },
  {
    icon: Lock,
    title: "Secure by design",
    description:
      "Your data never trains external models. Full data residency control, deployed in your environment or private cloud.",
  },
  {
    icon: Database,
    title: "Connected intelligence",
    description:
      "Integrates with your existing data stack — CRM, ERP, cloud storage, databases — without duplicating or moving data.",
  },
  {
    icon: Zap,
    title: "Instant insights",
    description:
      "Natural language queries across all your data. Ask in plain English, get accurate and actionable answers immediately.",
  },
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

const industries = [
  "Manufacturing & Supply Chain",
  "Retail",
  "Healthcare",
  "BFSI",
  "Telecom",
  "E-commerce",
];

const partners = [
  { name: "Databricks",          desc: "Unified data & AI platform",         logo: databricksLogo },
  { name: "Amazon Web Services", desc: "Cloud infrastructure & AI services",  logo: awsLogo        },
  { name: "Microsoft Azure",     desc: "Cloud & AI platform",                 logo: azureLogo      },
];

export default function AiInnovation() {
  const [prismRef, prismInView]       = useInView({ threshold: 0.08 });
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
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top — centered intro */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
              Our Platform
            </span>
            <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-royal dark:text-royaldark mb-4 tracking-tight">
              PR1SM.AI
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-snug mb-4">
              Your data. Your business. Your AI.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Imagine ChatGPT — purpose-built for your organization. PR1SM connects to all your
              data and delivers insights that are secure, accurate, and actionable. No generic
              answers. No data leaks. No external model training on your data.
            </p>
          </div>

          {/* 2×2 feature grid */}
          <div ref={prismRef} className="grid sm:grid-cols-2 gap-6 mb-12">
            {prismGrid.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-7 flex gap-5 ${
                    prismInView ? "anim-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0">
                    <AnimatedIcon
                      Icon={Icon}
                      size={20}
                      className="text-royal dark:text-royaldark"
                      trigger={prismInView}
                      delay={0.1 + i * 0.1}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Industries strip */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="text-xs text-[var(--text-muted)] self-center mr-2 uppercase tracking-widest font-semibold">
              Used in
            </span>
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--bg-card)]"
              >
                {ind}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-royal text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              Visit PR1SM.AI <ExternalLink size={16} />
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
                      <AnimatedIcon
                        Icon={Icon}
                        size={22}
                        className="text-royal dark:text-royaldark"
                        trigger={servicesInView}
                        delay={0.1 + i * 0.1}
                      />
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
                className={`flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-7 flex flex-col items-center gap-4 hover:shadow-md transition-shadow ${
                  partnersInView ? "anim-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-10 w-auto object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(22%) sepia(98%) saturate(1152%) hue-rotate(215deg) brightness(101%) contrast(96%)",
                  }}
                  loading="lazy"
                  decoding="async"
                />
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
            Ready to build your AI strategy?
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Whether you're starting your AI journey or scaling an existing practice,
            our team of AI architects and engineers is ready to help.
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
