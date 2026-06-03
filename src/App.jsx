import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PriVaWidget from "./components/chatbot/PriVaWidget";
import CookieBanner from "./components/ui/CookieBanner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TalentSolutions from "./pages/TalentSolutions";
import AiInnovation from "./pages/AiInnovation";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Careers from "./pages/Careers";
import Legal from "./pages/Legal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieSettings from "./pages/CookieSettings";
import Quiz from "./pages/Quiz";
import DarkModeToast from "./components/ui/DarkModeToast";

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-royal z-[200] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}

/* ── Back to top button ──────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-royal text-white shadow-lg shadow-royal/30 flex items-center justify-center hover:bg-[var(--accent-hover)] transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Initial page loader ─────────────────────────────────────── */
function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-primary)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-royal flex items-center justify-center shadow-lg shadow-royal/30">
              <span className="text-white font-heading font-bold text-2xl">P</span>
            </div>
            <span className="text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase">
              PRI Global
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Page transition wrapper ─────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.22, ease: "easeIn" } },
};

function PW({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/* ── Routes wrapped with AnimatePresence ─────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<PW><Home /></PW>} />
        <Route path="/services"        element={<PW><Services /></PW>} />
        <Route path="/talent-solutions" element={<PW><TalentSolutions /></PW>} />
        <Route path="/ai-innovation"   element={<PW><AiInnovation /></PW>} />
        <Route path="/industries"      element={<PW><Industries /></PW>} />
        <Route path="/about"           element={<PW><About /></PW>} />
        <Route path="/resources"       element={<PW><Resources /></PW>} />
        <Route path="/careers"         element={<PW><Careers /></PW>} />
        <Route path="/legal"           element={<PW><Legal /></PW>} />
        <Route path="/privacy-policy"  element={<PW><PrivacyPolicy /></PW>} />
        <Route path="/cookie-settings" element={<PW><CookieSettings /></PW>} />
        <Route path="/quiz" element={<PW><Quiz /></PW>} />
      </Routes>
    </AnimatePresence>
  );
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageLoader />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
      <CookieBanner />
      <DarkModeToast />
      <PriVaWidget />
      <BackToTop />
    </div>
  );
}
