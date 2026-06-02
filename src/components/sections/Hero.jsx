import { memo, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Send, Bot } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import usePriVa from "../chatbot/usePriVa";

/* ── Animation variants ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
});

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

/* Split H1 into animatable word spans */
const h1Lines = [
  { words: ["Technology"],              className: "text-[var(--text-primary)]" },
  { words: ["that", "moves"],           className: "text-royal dark:text-royaldark" },
  { words: ["business", "forward."],    className: "text-[var(--text-primary)]" },
];

const wordContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const wordItem = {
  initial: { y: 48, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const quickPrompts = [
  "What services do you offer?",
  "Tell me about PR1SM.AI",
  "I need tech talent",
  "How do I get started?",
];

/* ── PRI-VA Chat Card ────────────────────────────────────────── */
const HeroChatCard = memo(function HeroChatCard() {
  const { messages, input, setInput, loading, sendMessage } = usePriVa();
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full bg-[var(--bg-card)] dark:bg-[#16181e] border border-[var(--border)] rounded-2xl shadow-xl shadow-navy/8 dark:shadow-black/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-royal px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Hello, I'm PRI-VA</div>
          <div className="text-xs text-white/70 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            PRI Global AI Assistant · Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ maxHeight: "220px" }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-royal flex items-center justify-center shrink-0 mr-2 mt-0.5">
                <Bot size={12} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-royal text-white rounded-br-sm"
                  : "bg-[var(--border-subtle)] dark:bg-white/10 text-[var(--text-primary)] rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full bg-royal flex items-center justify-center shrink-0 mr-2">
              <Bot size={12} className="text-white" />
            </div>
            <div className="bg-[var(--border-subtle)] dark:bg-white/10 rounded-xl rounded-bl-sm px-3 py-2">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {quickPrompts.map((prompt, i) => (
            <motion.button
              key={prompt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
              onClick={() => sendMessage(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-royal hover:text-royal transition-colors"
            >
              {prompt}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about PRI Global…"
          className="flex-1 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-8 h-8 rounded-full bg-royal flex items-center justify-center text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Send"
        >
          <Send size={13} />
        </button>
      </div>
    </div>
  );
});

/* ── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Animated gradient mesh + blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.10] dark:opacity-[0.08]"
          loading="eager"
          decoding="async"
        />
        <div className="hero-mesh absolute inset-0" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-royal/8 dark:bg-royaldark/10 blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-navy/5 dark:bg-royaldark/5 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 dark:bg-royaldark/15 border border-royal/20 dark:border-royaldark/30 mb-6"
            >
              <Sparkles size={14} className="text-royal dark:text-royaldark" />
              <span className="text-xs font-semibold text-royal dark:text-royaldark tracking-wide uppercase">
                Technology · Talent · AI Innovation
              </span>
            </motion.div>

            {/* H1 — word-by-word stagger */}
            <motion.h1
              variants={wordContainer}
              initial="initial"
              animate="animate"
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 overflow-hidden"
            >
              {h1Lines.map((line, li) => (
                <span key={li} className={`block ${line.className}`}>
                  {line.words.map((word, wi) => (
                    <motion.span key={wi} variants={wordItem} className="inline-block mr-[0.22em]">
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.5)}
              className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg"
            >
              PRI Global partners with ambitious organisations to deliver end-to-end technology
              consulting, elite talent, and cutting-edge AI solutions — backed by 29+ years of
              global expertise.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-4">
              <Button to="/services" size="lg">
                Explore our services <ArrowRight size={18} />
              </Button>
              <Button to="/about" variant="secondary" size="lg">
                Meet the team
              </Button>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              {...fadeUp(0.78)}
              className="mt-12 pt-8 border-t border-[var(--border)]"
            >
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Trusted by leading organizations across{" "}
                <span className="font-medium text-[var(--text-secondary)]">
                  Financial Services, Healthcare, Manufacturing, Retail, and the Public Sector
                </span>
                {" "}— serving clients globally since 1996.
              </p>
            </motion.div>
          </div>

          {/* ── Right: PRI-VA card ─────────────────────────── */}
          <motion.div {...fadeRight}>
            <HeroChatCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
