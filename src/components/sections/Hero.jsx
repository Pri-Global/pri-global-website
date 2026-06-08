import { memo, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Send, Calendar } from "lucide-react";
import { HUBSPOT_MEETING_URL } from "../../constants/links";
import BrandLogo, { PriMarkAvatar } from "../ui/BrandLogo";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import AnimatedIcon from "../ui/AnimatedIcon";
import usePriVa from "../chatbot/usePriVa";
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
    <div className="w-full bg-[var(--bg-card)]/95 dark:bg-[#16181e]/95 backdrop-blur-md border border-[var(--border)] rounded-2xl shadow-xl shadow-navy/8 dark:shadow-black/30 flex flex-col overflow-hidden">
      <div className="bg-royal px-5 py-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
          <BrandLogo mark size="md" variant="onDark" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Hello, I&apos;m PRI-VA</div>
          <div className="text-xs text-white/70 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            PRI Global AI Assistant · Online
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ maxHeight: "220px" }}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <PriMarkAvatar size="sm" className="mr-2 mt-0.5" />}
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
            <PriMarkAvatar size="sm" className="mr-2" />
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

      <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about PRI Global…"
          className="flex-1 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
        />
        <button
          type="button"
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

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <HeroBackgroundVideo />
        {/* Mobile: static background (saves bandwidth) */}
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt=""
          className="md:hidden absolute inset-0 w-full h-full object-cover opacity-[0.08]"
          loading="eager"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              {...fadeUp(0.1)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 dark:bg-royaldark/15 border border-royal/20 dark:border-royaldark/30 mb-6"
            >
              <AnimatedIcon Icon={Sparkles} size={14} className="text-royal dark:text-royaldark" />
              <span className="text-xs font-semibold text-royal dark:text-royaldark tracking-wide uppercase">
                Technology · Talent · AI Innovation
              </span>
            </motion.div>

            <motion.h1
              variants={wordContainer}
              initial="initial"
              animate="animate"
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 overflow-hidden drop-shadow-sm"
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

            <motion.p
              {...fadeUp(0.5)}
              className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg md:max-w-xl"
            >
              PRI Global partners with ambitious organisations to deliver end-to-end technology
              consulting, elite talent, and cutting-edge AI solutions — backed by 28+ years of
              global expertise.
            </motion.p>

            <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button to="/services" size="lg" className="w-full sm:w-auto">
                Explore our services <ArrowRight size={18} />
              </Button>
              <Button to="/get-pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
                Get Pricing
              </Button>
              <Button to="/ai-innovation#demo" variant="ghost" size="lg" className="w-full sm:w-auto">
                See Demo
              </Button>
            </motion.div>

            <motion.p {...fadeUp(0.72)} className="mt-4">
              <a
                href={HUBSPOT_MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-royal dark:hover:text-royaldark hover:underline transition-colors"
              >
                <Calendar size={15} className="shrink-0" />
                Or book a 15-min discovery call →
              </a>
            </motion.p>

            <motion.div
              {...fadeUp(0.78)}
              className="mt-12 pt-8 border-t border-[var(--border)]"
            >
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Trusted by leading organizations across{" "}
                <span className="font-medium text-[var(--text-secondary)]">
                  Financial Services, Healthcare, Manufacturing, Retail, and the Public Sector
                </span>
                {" "}— In business since 1997. Over 28 years of trusted services.
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
