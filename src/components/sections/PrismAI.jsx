import { useState, useEffect, useRef } from "react";
import { BrainCircuit, Database, Shield, Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import AnimatedIcon from "../ui/AnimatedIcon";

/* ── Typing animation hook ──────────────────────────────────── */
function useTyping(text, speed = 28, startDelay = 0, active = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let timeoutId;
    let intervalId;
    timeoutId = setTimeout(() => {
      let i = 0;
      setDisplayed("");
      setDone(false);
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [active, text, speed, startDelay]);

  return { displayed, done };
}

/* ── Insight card with typing effect ───────────────────────── */
function InsightCard({ query, response, active, startDelay }) {
  const { displayed: typedQuery, done: queryDone } = useTyping(query, 25, startDelay, active);
  const { displayed: typedResp, done: _respDone } = useTyping(response, 18, startDelay + query.length * 25 + 300, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: startDelay / 1000 }}
      className="rounded-xl border border-white/8 bg-white/5 px-4 py-3"
    >
      <p className="text-sm text-white/90 font-medium mb-2 leading-snug min-h-[1.4em]">
        {typedQuery}
        {!queryDone && <span className="animate-pulse">|</span>}
      </p>
      {queryDone && (
        <p className="text-xs text-white/45 leading-relaxed font-mono min-h-[1.2em]">
          ↳ {typedResp}
          {typedResp.length < response.length && <span className="animate-pulse">▌</span>}
        </p>
      )}
    </motion.div>
  );
}

const features = [
  { icon: BrainCircuit, title: "Sits on top of your existing systems", description: "No migration needed. No rip-and-replace. PR1SM layers above your apps and data without disruption." },
  { icon: Database,     title: "Plain English queries",               description: "No SQL, no analyst queue. Ask the way you think — voice or text — and get answers in seconds." },
  { icon: Shield,       title: "Enterprise-grade security",           description: "Your data stays yours. Secure, compliant, and built for the enterprise. No external model training." },
  { icon: Zap,          title: "Decisions in seconds, not hours",     description: "Turn fragmented data into clear insights so you can move faster with confidence." },
];

const insightCards = [
  { query: "What's our margin on the Springfield job this week?",    response: "Springfield job: 18.4% margin. Labor variance +$2.1k vs estimate. On track." },
  { query: "Show cash position across all entities",                 response: "Combined cash: $847k. AR aging: $312k due <30d. 3 accounts flagged." },
  { query: "Summarize open support tickets by severity",             response: "14 open tickets — 3 critical, 6 high. Avg resolution time: 4.2 hrs this week." },
];

export default function PrismAI() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="relative py-20 md:py-28 bg-navy overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royaldark/20 border border-royaldark/40 text-xs font-bold tracking-widest uppercase text-royaldark mb-5">
              Your AI Intelligence Layer
            </span>

            <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-royaldark mb-4 tracking-tight">
              PR1SM.AI
            </div>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-snug mb-2">
              Talk to Your Data. Get Answers. Instantly.
            </h2>

            <p className="text-royaldark font-semibold text-base mb-1">
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
                    <div className="w-10 h-10 rounded-lg bg-royaldark/20 border border-royaldark/30 flex items-center justify-center shrink-0 mt-0.5">
                      <AnimatedIcon Icon={Icon} size={18} className="text-royaldark" />
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
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.55 }}
              whileHover={{ scale: 1.03, backgroundPosition: "100% 50%" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royaldark text-white font-medium text-sm hover:bg-royaldark/80 transition-colors"
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
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-royaldark/20 blur-[80px] pointer-events-none" />

            <div className="relative rounded-xl3 border border-white/10 bg-[#0D1B3E] shadow-2xl overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-heading font-extrabold text-royaldark text-lg tracking-tight">
                  PR1SM.AI
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  Live
                </span>
              </div>

              {/* Typing insight cards */}
              <div className="p-5 space-y-3">
                {insightCards.map((card, i) => (
                  <InsightCard
                    key={i}
                    query={card.query}
                    response={card.response}
                    active={inView}
                    startDelay={i * 1400}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 text-center">
                <span className="text-xs text-white/35 tracking-wide">
                  Your data. Your questions. Instant answers.
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
