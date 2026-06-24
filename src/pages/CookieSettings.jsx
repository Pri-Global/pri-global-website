import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";
import SEO from "../components/SEO";
import { notifyCookieBannerChange } from "../hooks/useCookieBannerVisible";
import {
  COOKIE_CATEGORIES,
  SITE_STORAGE,
  LEGAL_LAST_UPDATED,
  readCookieConsent,
  writeCookieConsent,
  consentPrefsFromStored,
} from "../lib/cookieConsent";

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
  const [prefs, setPrefs] = useState({ functional: true, analytics: false, marketing: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPrefs(consentPrefsFromStored(readCookieConsent()));
  }, []);

  function save(overrides = {}) {
    const final = writeCookieConsent({ ...prefs, ...overrides });
    setPrefs(consentPrefsFromStored(final));
    setSaved(true);
    notifyCookieBannerChange(false);
    setTimeout(() => setSaved(false), 4000);
  }

  const toggleMap = {
    functional: prefs.functional,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
  };

  return (
    <>
      <SEO
        title="Cookie Settings"
        description="Manage cookie and local storage preferences on the PRI Global website."
        url="/cookie-settings"
        noindex
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen py-24 px-6"
      >
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-4">
              Privacy
            </span>
            <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] mb-3">
              Cookie &amp; Storage Preferences
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
              This site uses browser storage (localStorage and sessionStorage), not traditional
              third-party advertising cookies. Your choices are saved on this device. Last updated:{" "}
              {LEGAL_LAST_UPDATED}. See also our{" "}
              <Link to="/privacy-policy" className="text-royal hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {COOKIE_CATEGORIES.map((cat) => {
              const enabled = cat.locked ? true : toggleMap[cat.id];
              return (
                <div
                  key={cat.id}
                  className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-[var(--text-primary)]">
                          {cat.title}
                        </h3>
                        {cat.locked && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-royal/10 text-royal px-2 py-0.5 rounded-full">
                            <Lock size={9} aria-hidden /> Always active
                          </span>
                        )}
                        {cat.notInUse && (
                          <span className="text-[10px] font-semibold bg-[var(--border-subtle)] text-[var(--text-muted)] px-2 py-0.5 rounded-full">
                            Not in use today
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <Toggle
                      enabled={enabled}
                      locked={cat.locked}
                      onChange={(v) => setPrefs((p) => ({ ...p, [cat.id]: v }))}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-10">
            <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-3">
              What we store on your device
            </h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
              <table className="w-full text-xs text-left min-w-[520px]">
                <thead className="bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {SITE_STORAGE.map((row) => (
                    <tr key={row.name} className="text-[var(--text-secondary)]">
                      <td className="px-4 py-3 font-mono text-[10px] text-[var(--text-primary)]">
                        {row.name}
                      </td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.category}</td>
                      <td className="px-4 py-3 leading-relaxed">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-6"
                role="status"
              >
                <Check size={16} aria-hidden /> Your preferences have been saved.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => save()}
              className="flex-1 px-6 py-3 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={() => save({ functional: true, analytics: true, marketing: true })}
              className="flex-1 px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => save({ functional: false, analytics: false, marketing: false })}
              className="flex-1 px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
