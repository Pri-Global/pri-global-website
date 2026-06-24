import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { notifyCookieBannerChange } from "../../hooks/useCookieBannerVisible";
import { writeCookieConsent, COOKIE_CONSENT_KEY } from "../../lib/cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
        const t = setTimeout(() => {
          setVisible(true);
          notifyCookieBannerChange(true);
        }, 800);
        return () => clearTimeout(t);
      }
      notifyCookieBannerChange(false);
    } catch {
      notifyCookieBannerChange(false);
    }
    return undefined;
  }, []);

  function dismiss(prefs) {
    writeCookieConsent(prefs);
    setVisible(false);
    notifyCookieBannerChange(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] glass-strong glass-nav border-t border-white/20 dark:border-white/10 shadow-2xl pb-safe"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="site-container py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 text-sm text-[var(--text-secondary)] leading-relaxed">
              We use essential browser storage for site functionality (theme, cookie preferences, and
              optional portal preview features). We do not use advertising cookies today.{" "}
              <Link
                to="/privacy-policy"
                className="text-[var(--text-primary)] underline underline-offset-2 hover:text-royal transition-colors"
              >
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link
                to="/cookie-settings"
                className="text-[var(--text-primary)] underline underline-offset-2 hover:text-royal transition-colors"
              >
                Cookie Settings
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => navigate("/cookie-settings")}
                className="glass-btn w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/40 cursor-pointer"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={() => dismiss({ functional: true, analytics: false, marketing: false })}
                className="glass-btn w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/40 cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => dismiss({ functional: true, analytics: true, marketing: true })}
                className="glass-btn-accent w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/40 cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
