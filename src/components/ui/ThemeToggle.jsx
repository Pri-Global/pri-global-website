import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const [showTip, setShowTip] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleToggle = () => {
    if (!isDark) setBurst(true);
    toggleTheme();
    setTimeout(() => setBurst(false), 600);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <motion.button
        type="button"
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="theme-toggle-btn relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] overflow-visible"
        aria-label="Toggle theme"
      >
        {burst && (
          <span className="theme-toggle-burst pointer-events-none" aria-hidden />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Sun size={17} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Moon size={17} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 whitespace-nowrap px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] shadow-lg text-[11px] text-[var(--text-secondary)] pointer-events-none"
          >
            {isDark ? "Switch to daylight mode" : "Built for late-night decision makers"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
