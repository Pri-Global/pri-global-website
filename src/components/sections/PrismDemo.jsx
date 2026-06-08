import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ExternalLink } from "lucide-react";
import { PRISM_DEMO_PRESETS, PRISM_DEMO_RESPONSES } from "../../data/prismDemoResponses";

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-royaldark"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function PrismDemo({ compact = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendQuestion = (text) => {
    const q = text.trim();
    if (!q || typing) return;

    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response =
        PRISM_DEMO_RESPONSES[q] ||
        "I can help analyze that across your connected systems. In a live deployment, PR1SM.AI pulls from your CRM, ERP, finance, and operations data in real time.";
      setTyping(false);
      setMessages((m) => [...m, { role: "assistant", text: response }]);
    }, 1200);
  };

  const presets = compact ? PRISM_DEMO_PRESETS.slice(0, 3) : PRISM_DEMO_PRESETS;

  return (
    <section id="demo" className={compact ? "py-16" : "py-20 md:py-28 bg-[var(--bg-secondary)]"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
              Live Demo
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              Talk to Your Data — Right Now
            </h2>
            <p className="text-[var(--text-secondary)]">
              Try a simulated PR1SM.AI conversation. Click a preset or ask your own question.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`mx-auto rounded-2xl border border-[#1e2028] overflow-hidden shadow-2xl bg-[#0d0f12] ${
            compact ? "max-w-3xl" : "max-w-4xl"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2028] bg-[#111318]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-heading font-bold text-royaldark text-sm">PR1SM.AI</span>
            </div>
            <span className="text-xs font-semibold text-royaldark border border-royaldark/30 rounded-full px-2.5 py-0.5">
              ● Live Demo
            </span>
          </div>

          <div className="p-4 flex flex-wrap gap-2 border-b border-[#1e2028]">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => sendQuestion(preset)}
                className="text-left text-xs px-3 py-2 rounded-lg border border-[#2a2d36] text-white/70 hover:border-royaldark hover:text-white hover:-translate-y-0.5 transition-all"
              >
                {preset}
              </button>
            ))}
          </div>

          <div
            className={`overflow-y-auto p-4 space-y-3 ${compact ? "h-[280px]" : "h-[360px]"}`}
          >
            {messages.length === 0 && (
              <p className="text-white/30 text-sm text-center py-8">
                Select a question above or type your own…
              </p>
            )}
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={`${i}-${msg.role}`}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === "user"
                        ? "bg-royal text-white"
                        : "bg-[#1a1d24] text-white/80 border border-[#2a2d36]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#1a1d24] border border-[#2a2d36] rounded-xl">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            className="p-4 border-t border-[#1e2028] flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your business..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1a1d24] border border-[#2a2d36] text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-royaldark"
            />
            <button
              type="submit"
              className="shrink-0 w-11 h-11 rounded-xl bg-royaldark text-white flex items-center justify-center hover:bg-royaldark/80 transition-colors"
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-3">
          This is a simulation. Real PR1SM.AI connects to your actual data.
        </p>
        <p className="text-center mt-4">
          <a
            href="https://www.pr1sm.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-royal dark:text-royaldark hover:underline"
          >
            Experience the real thing <ExternalLink size={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
