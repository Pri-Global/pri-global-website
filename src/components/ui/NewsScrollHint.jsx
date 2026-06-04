import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NEWS_SECTION_ID = "latest-news";
const MIN_SCROLL = 500;

export default function NewsScrollHint() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  const updateVisibility = useCallback((section) => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 120;
    setVisible(window.scrollY > MIN_SCROLL && !inView);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    let teardown = () => {};
    let intervalId = null;

    const tryAttach = () => {
      const section = document.getElementById(NEWS_SECTION_ID);
      if (!section) return false;

      const onScroll = () => updateVisibility(section);
      window.addEventListener("scroll", onScroll, { passive: true });

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(window.scrollY > MIN_SCROLL && !entry.isIntersecting);
        },
        { threshold: 0.08, rootMargin: "-72px 0px 0px 0px" }
      );
      observer.observe(section);
      onScroll();

      teardown = () => {
        window.removeEventListener("scroll", onScroll);
        observer.disconnect();
      };
      return true;
    };

    if (!tryAttach()) {
      intervalId = setInterval(() => {
        if (tryAttach()) clearInterval(intervalId);
      }, 250);
    }

    return () => {
      clearInterval(intervalId);
      teardown();
      setVisible(false);
    };
  }, [pathname, updateVisibility]);

  const scrollToNews = () => {
    document.getElementById(NEWS_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (pathname !== "/") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToNews}
          className="fixed bottom-6 left-4 sm:left-6 z-50 w-10 h-10 rounded-full bg-royal text-white shadow-lg shadow-royal/30 flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors"
          aria-label="Zum News-Bereich scrollen"
          title="News"
        >
          <Newspaper size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
