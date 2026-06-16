import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import usePriVa from "./usePriVa";
import PriVaPrivacyNotice from "./PriVaPrivacyNotice";
import BrandLogo, { PriMarkAvatar } from "../ui/BrandLogo";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && <PriMarkAvatar size="md" className="mr-2 mt-0.5" />}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "glass-btn-accent text-white rounded-br-sm"
            : "glass-subtle text-[var(--text-primary)] rounded-bl-sm border-l-[3px] border-l-royal/50"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function PriVaWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, loading, sendMessage } = usePriVa();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("priva-open", onOpen);
    return () => window.removeEventListener("priva-open", onOpen);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[calc(100vw-3rem)] max-w-[380px] glass-strong rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
            style={{ maxHeight: "520px" }}
          >
            <div className="glass-header-accent px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <BrandLogo mark size="lg" variant="onDark" className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[var(--text-primary)] leading-tight">PriVa</div>
                  <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full glass-btn flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={14} className="text-[var(--text-primary)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex justify-start mb-3">
                  <PriMarkAvatar size="md" className="mr-2" />
                  <div className="glass-subtle rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 size={14} className="text-[var(--text-muted)] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {[
                  "What services do you offer?",
                  "Tell me about PR1SM.AI",
                  "I need tech talent",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full glass-subtle text-[var(--text-secondary)] hover:border-l-[3px] hover:border-l-royal transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="px-4 pt-2">
              <PriVaPrivacyNotice />
            </div>

            <div className="px-4 py-3 border-t border-white/20 dark:border-white/10 flex items-center gap-2 glass-subtle">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 text-sm glass-input rounded-xl px-3 py-2 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full glass-btn-accent flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full glass-btn-accent flex items-center justify-center"
        aria-label="Open PriVa chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
