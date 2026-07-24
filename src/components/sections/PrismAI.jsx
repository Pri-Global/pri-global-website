import { BrainCircuit, Database, Shield, Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import AnimatedIcon from "../ui/AnimatedIcon";
import PrismDemo from "./PrismDemo";

const features = [
  { icon: BrainCircuit, title: "Sits on top of your existing systems", description: "No migration needed. No rip-and-replace. PR1SM layers above your apps and data without disruption." },
  { icon: Database,     title: "Plain English queries",               description: "No SQL, no analyst queue. Ask the way you think — voice or text — and get answers in seconds." },
  { icon: Shield,       title: "Enterprise-grade security",           description: "Your data stays yours. Secure, compliant, and built for the enterprise. No external model training." },
  { icon: Zap,          title: "Decisions in seconds, not hours",     description: "Turn fragmented data into clear insights so you can move faster with confidence." },
];

export default function PrismAI() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="site-container relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royaldark/20 border border-royaldark/40 text-xs font-bold tracking-widest uppercase text-ronchi mb-5">
              Your AI Intelligence Layer
            </span>

            <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-ronchi mb-4 tracking-tight">
              PR1SM.AI
            </div>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-snug mb-2">
              Talk to Your Data. Get Answers. Instantly.
            </h2>

            <p className="text-ronchi font-semibold text-base mb-1">
              Let&apos;s Build Your Technology Advantage.
            </p>
            <p className="text-white/60 text-sm mb-6">
              Smarter Data. Stronger Decisions. Better Outcomes.
            </p>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
              PR1SM.AI is PRI Global's AI intelligence layer — purpose-built for your business.
              No rip-and-replace. No disruption. Less time in the office,
              more time on what matters.
            </p>

            <div className="space-y-5 mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.08 }}
                    className="group flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-royaldark/25 border border-royaldark/40 flex items-center justify-center shrink-0 mt-0.5">
                      <AnimatedIcon Icon={Icon} size={18} className="text-ronchi" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-0.5">{f.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.a
              href="/ai-innovation#prism-demo"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.55 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royaldark text-white font-medium text-sm hover:bg-royaldark/80 transition-colors mr-3"
            >
              Try the live demo
            </motion.a>
            <motion.a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Explore PR1SM.AI <ExternalLink size={16} />
            </motion.a>
          </motion.div>

          {/* ── Right: Product card ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-royaldark/20 blur-[80px] pointer-events-none" />
            <PrismDemo variant="embedded" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
