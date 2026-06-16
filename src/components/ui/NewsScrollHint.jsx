import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Newspaper } from "lucide-react";
import AnimatedIcon from "./AnimatedIcon";
import { motion, AnimatePresence } from "framer-motion";

const MIN_SCROLL = 500;

export default function NewsScrollHint() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    const onScroll = () => setVisible(window.scrollY > MIN_SCROLL);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      setVisible(false);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed bottom-6 left-4 sm:left-6 z-50"
        >
          <Link
            to="/resources"
            className="group flex w-10 h-10 rounded-full bg-royal text-white shadow-lg shadow-royal/30 items-center justify-center hover:bg-[var(--accent-hover)] hover:scale-110 active:scale-95 transition-all"
            aria-label="View news and resources"
            title="News & Resources"
          >
            <AnimatedIcon Icon={Newspaper} size={17} className="text-white" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
