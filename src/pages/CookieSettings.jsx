import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";

const STORAGE_KEY = "pri-cookie-consent";

function Toggle({ enabled, onChange, locked = false }) {
  return (
    <button
      type="button"
      onClick={() => !locked && onChange(!enabled)}
      disabled={locked}
      aria-pressed={enabled}
      className={`relative inline-flex w-12 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal ${
        locked
          ? "cursor-not-allowed bg-royal/50"
          : enabled
          ? "cursor-pointer bg-royal"
          : "cursor-pointer bg-[var(--border)]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function CookieSettings() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setPrefs({
        analytics: stored.analytics ?? false,
        marketing: stored.marketing ?? false,
      });
    } catch {}
  }, []);

  function save(overrides = {}) {
    const final = { essential: true, ...prefs, ...overrides, consentGiven: true, consentDate: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
    setSaved(true);
    setTimeout(() => navigate("/"), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
            Privacy
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            Cookie Preferences
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Manage how PRI Global uses cookies on this website. Your preferences are saved locally and respected on every visit.
          </p>
        </div>

        {/* Toggle rows */}
        <div className="space-y-4 mb-10">
          {/* Essential — locked */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-[var(--text-primary)]">Essential Cookies</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-royal/10 text-royal px-2 py-0.5 rounded-full">
                    <Lock size={9} /> Always Active
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  These cookies are necessary for the website to function and cannot be disabled. They include session management and security features.
                </p>
              </div>
              <Toggle enabled={true} onChange={() => {}} locked={true} />
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading font-bold text-[var(--text-primary)] mb-1">Analytics Cookies</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our site.
                </p>
              </div>
              <Toggle
                enabled={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
            </div>
          </div>

          {/* Marketing */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading font-bold text-[var(--text-primary)] mb-1">Marketing Cookies</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Used to deliver relevant content and track the effectiveness of our marketing. No personal data is sold to third parties.
                </p>
              </div>
              <Toggle
                enabled={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
          </div>
        </div>

        {/* Success message */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-6"
            >
              <Check size={16} /> Your preferences have been saved. Redirecting…
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => save()}
            className="flex-1 px-6 py-3 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            Save Preferences
          </button>
          <button
            onClick={() => save({ analytics: true, marketing: true })}
            className="flex-1 px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => save({ analytics: false, marketing: false })}
            className="flex-1 px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </motion.div>
  );
}
