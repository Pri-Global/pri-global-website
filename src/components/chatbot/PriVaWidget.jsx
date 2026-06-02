import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import usePriVa from "./usePriVa";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-royal flex items-center justify-center shrink-0 mr-2 mt-0.5">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-royal text-white rounded-br-sm"
            : "bg-[var(--border-subtle)] dark:bg-white/10 text-[var(--text-primary)] rounded-bl-sm"
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

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[340px] sm:w-[380px] bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-2xl shadow-navy/15 dark:shadow-black/40 flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-royal px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-tight">PriVa</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex justify-start mb-3">
                  <div className="w-7 h-7 rounded-full bg-royal flex items-center justify-center shrink-0 mr-2">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-[var(--border-subtle)] dark:bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 size={14} className="text-[var(--text-muted)] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
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
                    className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-royal hover:text-royal transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full bg-royal flex items-center justify-center text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-royal text-white shadow-lg shadow-royal/30 flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors"
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
