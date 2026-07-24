import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ExternalLink,
  Mic,
  Sparkles,
  BrainCircuit,
  LineChart,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  PRISM_DEMO_PRESETS,
  PRISM_DEMO_ROLES,
  PRISM_DEMO_SCENARIOS,
  findPrismDemoScenario,
} from "../../data/prismDemoResponses";
import { BOOKING_URL } from "../../constants/links";

const ROLE_ICONS = {
  assessment: Sparkles,
  advisor: BrainCircuit,
  intelligence: LineChart,
};

function TypingDots() {
  return (
    <div className="flex gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-violet-300"
          animate={{ scale: [1, 1.35, 1], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function VoiceWaveform({ active }) {
  return (
    <div className="flex items-end gap-0.5 h-5" aria-hidden>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-sky-400"
          animate={
            active
              ? { height: ["6px", "16px", "8px", "18px", "6px"] }
              : { height: "6px" }
          }
          transition={
            active
              ? { duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

function KpiRow({ kpi }) {
  const TrendIcon = kpi.positive && !kpi.warn ? TrendingUp : TrendingDown;
  const trendClass =
    kpi.warn || !kpi.positive
      ? "text-rose-400"
      : "text-emerald-400";

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-white/8 last:border-0">
      <span className="text-sm text-white/70">{kpi.label}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-white tabular-nums">{kpi.value}</span>
        <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendClass}`}>
          <TrendIcon size={12} aria-hidden />
          {kpi.change}
        </span>
      </div>
    </div>
  );
}

function RoleCard({ role, index }) {
  const Icon = ROLE_ICONS[role.icon] || Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-3 p-3 rounded-xl bg-white/90 dark:bg-[var(--bg-card)] border border-violet-100 dark:border-[var(--border)] shadow-sm"
    >
      <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-violet-600 dark:text-violet-300" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{role.title}</p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">{role.description}</p>
      </div>
    </motion.div>
  );
}

function DashboardPanel({
  messages,
  typing,
  scenario,
  expanded,
  onToggleExpand,
  onSend,
  input,
  setInput,
  listening,
  onVoice,
  compact,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, scenario, expanded]);

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-violet-900/40 shadow-2xl bg-gradient-to-br from-[#12082b] via-[#1a1040] to-[#0f172a] ${
        compact ? "" : "min-h-[520px]"
      }`}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.18),transparent_40%)]" />

      <div className="relative p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-violet-200" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-tight">PRISMA</p>
            <p className="text-[11px] text-violet-200/70">AI Assessment Specialist</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Demo
        </span>
      </div>

      <div className={`relative px-4 sm:px-5 overflow-y-auto ${compact ? "max-h-[320px]" : "max-h-[360px]"}`}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={`${i}-${msg.role}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-violet-600 text-white rounded-br-md"
                    : "bg-white/8 text-white/90 border border-white/10 rounded-bl-md"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">
                  {msg.role === "user" ? "You" : "PRISMA"}
                </span>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="mb-3 flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-white/8 border border-white/10 px-4 py-2">
              <TypingDots />
            </div>
          </div>
        )}

        {scenario && !typing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={15} className="text-violet-300" />
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-200/80">
                Executive Summary
              </p>
            </div>
            <div className="space-y-0.5">
              {scenario.kpis.map((kpi) => (
                <KpiRow key={kpi.label} kpi={kpi} />
              ))}
            </div>
            <p className="mt-3 text-xs text-white/55 leading-relaxed border-t border-white/8 pt-3">
              {scenario.insight}
            </p>
            <p className="mt-2 text-[10px] text-white/35">
              Sources: {scenario.sources.join(" · ")} · Updated moments ago
            </p>

            <AnimatePresence>
              {expanded && scenario.expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-white/8 grid sm:grid-cols-3 gap-2">
                    {scenario.expanded.map((row) => (
                      <div key={row.label} className="rounded-xl bg-white/5 border border-white/8 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/45">{row.label}</p>
                        <p className="text-sm font-semibold text-white mt-1">{row.value}</p>
                        <p className="text-[11px] text-white/45 mt-0.5">{row.note}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={onToggleExpand}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-200 hover:text-white transition-colors"
            >
              {expanded ? "Hide full overview" : "View full executive overview dashboard"}
              <ChevronRight size={14} className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="relative p-4 sm:p-5 border-t border-white/10 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(compact ? PRISM_DEMO_PRESETS.slice(0, 3) : PRISM_DEMO_PRESETS).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onSend(preset)}
              disabled={typing || listening}
              className="text-left text-[11px] px-3 py-2 rounded-xl bg-white/6 border border-white/10 text-white/75 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
            >
              {preset}
            </button>
          ))}
        </div>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSend(input);
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your business..."
            disabled={typing || listening}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-violet-400/50 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={onVoice}
            disabled={typing || listening}
            aria-label="Talk to PRISMA demo"
            className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
              listening
                ? "bg-sky-500/20 border-sky-400/40 text-sky-200"
                : "bg-white/6 border-white/10 text-white/80 hover:bg-white/10"
            }`}
          >
            {listening ? <VoiceWaveform active /> : <Mic size={18} />}
          </button>
          <button
            type="submit"
            disabled={typing || listening || !input.trim()}
            className="shrink-0 w-11 h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-colors disabled:opacity-50"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PrismDemo({ variant = "full" }) {
  const compact = variant === "embedded";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [listening, setListening] = useState(false);
  const bootedRef = useRef(false);

  const runScenario = useCallback((text) => {
    const q = text.trim();
    if (!q || typing || listening) return;

    const nextScenario = findPrismDemoScenario(q);
    setExpanded(false);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setScenario(null);

    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "assistant", text: nextScenario.summary }]);
      setScenario(nextScenario);
    }, 1100);
  }, [typing, listening]);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    const t = window.setTimeout(() => {
      runScenario(PRISM_DEMO_SCENARIOS[0].question);
    }, compact ? 600 : 900);
    return () => window.clearTimeout(t);
  }, [compact, runScenario]);

  const handleVoice = () => {
    if (typing || listening) return;
    setListening(true);
    window.setTimeout(() => {
      setListening(false);
      runScenario("How is our business performing today?");
    }, 1400);
  };

  if (compact) {
    return (
      <DashboardPanel
        messages={messages}
        typing={typing}
        scenario={scenario}
        expanded={expanded}
        onToggleExpand={() => setExpanded((v) => !v)}
        onSend={runScenario}
        input={input}
        setInput={setInput}
        listening={listening}
        onVoice={handleVoice}
        compact
      />
    );
  }

  return (
    <section id="prism-demo" className="py-16 md:py-24 bg-[var(--bg-secondary)] relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-violet-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <span className="inline-block text-xs font-semibold text-violet-600 dark:text-violet-300 uppercase tracking-widest mb-3">
            Live Demo
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Meet PRISMA — Your AI Business Advisor
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg">
            Ask in plain English. Get executive summaries, KPIs, and recommended next steps — just like on{" "}
            <a
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal dark:text-royaldark font-semibold hover:underline"
            >
              pr1sm.ai
            </a>
            .
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-6 lg:gap-8 items-start">
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300 mb-4">
                Meet PRISMA
              </p>
              <div className="space-y-3">
                {PRISM_DEMO_ROLES.map((role, i) => (
                  <RoleCard key={role.title} role={role} index={i} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                <Clock size={18} className="text-violet-600 dark:text-violet-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Available 24/7</p>
                <p className="text-xs text-[var(--text-secondary)]">Always on. Always ready.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10 p-5">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                Ready to qualify for PR1SM.AI?
              </p>
              <p className="text-xs text-[var(--text-secondary)] mb-4">
                Talk to PRISMA in the demo above, or book a custom walkthrough with our team.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                >
                  Qualify & book a demo <ExternalLink size={14} />
                </a>
                <Link
                  to="/get-pricing"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-violet-300 dark:border-violet-500/30 text-sm font-semibold text-violet-700 dark:text-violet-200 hover:bg-violet-100/60 dark:hover:bg-violet-500/10 transition-colors"
                >
                  Talk to an expert
                </Link>
              </div>
            </div>
          </div>

          <DashboardPanel
            messages={messages}
            typing={typing}
            scenario={scenario}
            expanded={expanded}
            onToggleExpand={() => setExpanded((v) => !v)}
            onSend={runScenario}
            input={input}
            setInput={setInput}
            listening={listening}
            onVoice={handleVoice}
          />
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-4">
          Simulation only — real PR1SM.AI connects to your ERP, CRM, and operational systems.
        </p>
      </div>
    </section>
  );
}
