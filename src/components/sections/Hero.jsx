import { memo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Send, Bot, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import AnimatedIcon from "../ui/AnimatedIcon";
import usePriVa from "../chatbot/usePriVa";
import PriVaPrivacyNotice from "../chatbot/PriVaPrivacyNotice";
import { VIDEOS } from "../../data/videos";

/** Hero background loops only this intro — avoids long branding footage */
const HERO_CLIP_SECONDS = 20;

function HeroBackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      return;
    }

    const loopIntro = () => {
      if (video.currentTime >= HERO_CLIP_SECONDS) {
        video.currentTime = 0;
      }
    };

    const startAtBeginning = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const onError = () => {
      video.style.display = "none";
    };

    video.addEventListener("timeupdate", loopIntro);
    video.addEventListener("loadeddata", startAtBeginning);
    video.addEventListener("canplay", startAtBeginning);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("timeupdate", loopIntro);
      video.removeEventListener("loadeddata", startAtBeginning);
      video.removeEventListener("canplay", startAtBeginning);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEOS.branding}
      autoPlay
      muted
      playsInline
      preload="auto"
      className="hidden md:block absolute inset-0 w-full h-full object-cover scale-[1.03] opacity-[0.32] dark:opacity-[0.52] dark:brightness-110 dark:saturate-110"
      aria-hidden
    />
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
});

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
};

const h1Lines = [
  { words: ["Technology"], className: "text-[var(--text-primary)]" },
  { words: ["that", "moves"], className: "text-royal dark:text-royaldark" },
  { words: ["business", "forward."], className: "text-[var(--text-primary)]" },
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

const HeroChatCard = memo(function HeroChatCard() {
  const [minimized, setMinimized] = useState(false);
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
    <div className="relative w-full max-w-md ml-auto min-h-[440px] flex items-end justify-end">
      <AnimatePresence mode="wait">
        {minimized ? (
          <motion.button
            key="bubble"
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setMinimized(false)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-royal to-[#4169E1] text-white shadow-xl shadow-royal/35 flex items-center justify-center hover:shadow-royal/50 transition-shadow"
            aria-label="Open PriVa chat"
          >
            <span
              className="absolute inset-0 rounded-full bg-royal/30 animate-ping pointer-events-none"
              aria-hidden
            />
            <MessageCircle size={26} strokeWidth={1.75} className="relative z-10" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[var(--bg-primary)] dark:border-[#0a0c12]" />
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
          >
            {/* AI glow */}
            <div
              className="absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br from-royal/30 via-violet-500/15 to-cyan-400/20 blur-md opacity-70 dark:opacity-90 pointer-events-none"
              aria-hidden
            />

            <div className="relative flex flex-col overflow-hidden rounded-[1.25rem] glass-strong min-h-[440px]">
              {/* Window chrome — red/yellow minimize to bubble */}
              <div className="flex items-center gap-3 px-4 py-2.5 glass-header-accent">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMinimized(true)}
                    className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] hover:brightness-90 transition-[filter] cursor-pointer"
                    aria-label="Minimize chat"
                    title="Minimize"
                  />
                  <button
                    type="button"
                    onClick={() => setMinimized(true)}
                    className="w-2.5 h-2.5 rounded-full bg-[#febc2e] hover:brightness-90 transition-[filter] cursor-pointer"
                    aria-label="Minimize chat"
                    title="Minimize"
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-60"
                    aria-hidden
                  />
                </div>
                <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0">
                  <Sparkles size={12} className="text-royal dark:text-royaldark shrink-0" />
                  <span className="text-[11px] font-medium text-[var(--text-muted)] truncate">
                    priva.priglobal.com — Assistant
                  </span>
                </div>
                <div className="w-12" aria-hidden />
              </div>

        {/* Agent bar */}
        <div className="px-4 py-3 border-b border-white/20 dark:border-white/10 glass-header-accent">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-royal to-[#4169E1] flex items-center justify-center shadow-lg shadow-royal/25">
                <Bot size={20} className="text-white" strokeWidth={1.75} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--bg-card)] dark:border-[#0b0d12]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">PriVa</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-royal/10 text-royal dark:bg-royal/20 dark:text-royaldark">
                  AI
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                PRI Global assistant · Site guide
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg-primary)]/40 dark:bg-[#080a0f]/60"
          style={{ minHeight: "240px", maxHeight: "260px" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-royal to-[#4169E1] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-white" strokeWidth={2} />
                </div>
              )}
              <div className={`max-w-[85%] ${msg.role === "user" ? "" : ""}`}>
                {msg.role === "assistant" && (
                  <p className="text-[10px] font-medium text-[var(--text-muted)] mb-1 ml-0.5">PriVa</p>
                )}
                <div
                  className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "glass-btn-accent rounded-2xl rounded-br-md text-white"
                      : "glass-subtle text-[var(--text-primary)] rounded-2xl rounded-bl-md border-l-[3px] border-l-royal/50"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-royal to-[#4169E1] flex items-center justify-center shrink-0">
                <Bot size={14} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-[var(--text-muted)] mb-1 ml-0.5">PriVa</p>
                <div className="bg-[var(--bg-card)] dark:bg-white/[0.06] border border-[var(--border)] dark:border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <span className="flex gap-1 items-center">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-royal/70 dark:bg-royaldark animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2 bg-[var(--bg-primary)]/40 dark:bg-[#080a0f]/60">
            {quickPrompts.map((prompt, i) => (
              <motion.button
                key={prompt}
                type="button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.3 }}
                onClick={() => sendMessage(prompt)}
                className="text-[11px] px-3 py-1.5 rounded-full glass-subtle text-[var(--text-secondary)] hover:border-l-[3px] hover:border-l-royal hover:pl-[calc(0.75rem-3px)] transition-all"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="p-3 border-t border-white/20 dark:border-white/10 glass-subtle">
          <div className="flex items-end gap-2 rounded-xl glass-input px-3 py-2 focus-within:border-royal/40 dark:focus-within:border-royaldark/50 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Message PriVa…"
              className="flex-1 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none py-1"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg glass-btn-accent flex items-center justify-center text-white disabled:opacity-35 disabled:pointer-events-none shrink-0"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
          <PriVaPrivacyNotice className="text-center mt-2 px-1" />
        </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center page-hero pb-16 xl:pb-20 2xl:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <HeroBackgroundVideo />
        {/* Mobile: static background (saves bandwidth) */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="Global technology network visualization — PRI Global IT services"
          width={1920}
          height={1080}
          className="md:hidden absolute inset-0 w-full h-full object-cover opacity-[0.08]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Readability overlays — lighter in dark mode so video shows through */}
        <div className="absolute inset-0 bg-[var(--bg-primary)]/40 dark:bg-[#0a0c12]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-[var(--bg-primary)]/25 dark:from-[#0a0c12]/75 dark:via-[#0a0c12]/55 dark:to-[#0a0c12]/20" />
        <div className="absolute inset-0 bg-[rgba(13,27,62,0.55)] dark:bg-[rgba(10,12,18,0.45)] md:bg-transparent md:dark:bg-transparent" />
        <div className="hero-mesh absolute inset-0 opacity-80" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-royal/6 dark:bg-royaldark/8 blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-navy/4 dark:bg-royaldark/5 blur-[90px]" />
      </div>

      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-center">
          <div>
            <motion.div
              {...fadeUp(0.1)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle mb-6"
            >
              <AnimatedIcon Icon={Sparkles} size={14} className="text-royal dark:text-royaldark" />
              <span className="text-xs font-semibold text-royal dark:text-royaldark tracking-wide uppercase">
                Staffing · SOW · Managed Services · PR1SM.AI
              </span>
            </motion.div>

            <motion.h1
              variants={wordContainer}
              initial="initial"
              animate="animate"
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] 2xl:text-8xl font-bold leading-[1.08] mb-6 xl:mb-8 overflow-hidden drop-shadow-sm"
            >
              {h1Lines.map((line, li) => (
                <span key={li} className={`block ${line.className}`}>
                  {line.words.map((word, wi) => {
                    const isMove = word.toLowerCase().replace(/[^a-z]/g, "") === "moves";
                    return (
                      <motion.span
                        key={wi}
                        variants={wordItem}
                        className={`inline-block mr-[0.22em] ${isMove ? "cursor-pointer" : ""}`}
                        whileHover={
                          isMove
                            ? {
                                x: 12,
                                transition: {
                                  duration: 0.5,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                },
                              }
                            : undefined
                        }
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...fadeUp(0.5)}
              className="text-lg md:text-xl xl:text-2xl text-[var(--text-secondary)] leading-relaxed mb-8 xl:mb-10 max-w-lg md:max-w-xl xl:max-w-2xl"
            >
              PRI Global delivers IT staffing, SOW project teams, managed services, and PR1SM.AI —
              backed by 28+ years of trusted partnerships, including a 26+ year relationship with
              Mastercard.
            </motion.p>

            <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button to="/get-pricing" variant="glass-accent" size="lg" className="w-full sm:w-auto">
                Talk to an expert <ArrowRight size={18} />
              </Button>
              <Button to="/services" variant="glass" size="lg" className="w-full sm:w-auto">
                Explore services
              </Button>
            </motion.div>

            <motion.p {...fadeUp(0.72)} className="mt-4 text-sm text-[var(--text-muted)]">
              Looking for work?{" "}
              <Link
                to="/candidate-jobs"
                className="font-medium text-royal dark:text-royaldark hover:underline"
              >
                Browse open roles →
              </Link>
            </motion.p>

            <motion.div
              {...fadeUp(0.78)}
              className="mt-12 pt-8 border-t border-[var(--border)]"
            >
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Trusted by{" "}
                <span className="font-medium text-[var(--text-secondary)]">Mastercard</span>
                {", "}
                <span className="font-medium text-[var(--text-secondary)]">
                  Fortune 500 financial services, healthcare, and manufacturing leaders
                </span>
                {" "}— established, innovative, and built for the next phase of growth.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeRight} className="hidden lg:block">
            <HeroChatCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
