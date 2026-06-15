import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "pri-cookie-consent";

function saveConsent(analytics, marketing) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      essential: true,
      analytics,
      marketing,
      consentGiven: true,
      consentDate: new Date().toISOString(),
    })
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss(analytics, marketing) {
    saveConsent(analytics, marketing);
    setVisible(false);
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
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Text */}
            <div className="flex-1 text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="mr-1">🍪</span>
              We use cookies to enhance your experience on priglobal.com. Essential cookies are always active. You can manage your preferences or accept all cookies.{" "}
              <Link
                to="/privacy-policy"
                className="text-[var(--text-primary)] underline underline-offset-2 hover:text-royal transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => navigate("/cookie-settings")}
                className="glass-btn w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-primary)]"
              >
                Cookie Settings
              </button>
              <button
                onClick={() => dismiss(false, false)}
                className="glass-btn w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-primary)]"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => dismiss(true, true)}
                className="glass-btn-accent w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
