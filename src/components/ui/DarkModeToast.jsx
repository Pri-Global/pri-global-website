import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const TOAST_KEY = "pri-darkmode-toast-shown";

export default function DarkModeToast() {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDark) return;
    if (localStorage.getItem(TOAST_KEY)) return;

    const t = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(TOAST_KEY, "1");
    }, 1200);

    return () => clearTimeout(t);
  }, [isDark]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-[9998] max-w-[280px] bg-[var(--bg-card)] border border-royal rounded-xl p-4 shadow-2xl"
        >
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-royal/10 flex items-center justify-center shrink-0">
              <Moon size={18} className="text-royal dark:text-royaldark" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Dark mode enabled — Built for late-night decision makers
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Switch anytime with the toggle ↑
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
