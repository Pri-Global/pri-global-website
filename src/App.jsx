import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import SkipLink from "./components/ui/SkipLink";
import NewsScrollHint from "./components/ui/NewsScrollHint";
import PriVaWidget from "./components/chatbot/PriVaWidget";
import CookieBanner from "./components/ui/CookieBanner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TalentSolutions from "./pages/TalentSolutions";
import AiInnovation from "./pages/AiInnovation";
import AiServices from "./pages/AiServices";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Careers from "./pages/Careers";
import JobDivaMobileApp from "./pages/JobDivaMobileApp";
import Legal from "./pages/Legal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookieSettings from "./pages/CookieSettings";
import Quiz from "./pages/Quiz";
import GetPricing from "./pages/GetPricing";
import ROICalculatorPage from "./pages/ROICalculatorPage";
import WhyPRI from "./pages/WhyPRI";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeAuthCallback from "./pages/EmployeeAuthCallback";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CandidateLogin from "./pages/candidate/CandidateLogin";
import CandidateRegister from "./pages/candidate/CandidateRegister";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import CandidateJobs from "./pages/candidate/CandidateJobs";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import JobSeekerFAQ from "./pages/JobSeekerFAQ";
import WorkingAtPRI from "./pages/WorkingAtPRI";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedPortalRoute from "./components/portal/ProtectedPortalRoute";
import CandidatePortalLayout from "./components/portal/CandidatePortalLayout";
import { AUTH_KEYS } from "./hooks/usePortalAuth";
import DarkModeToast from "./components/ui/DarkModeToast";
import { useReducedMotion } from "./hooks/useReducedMotion";
import BrandLogo from "./components/ui/BrandLogo";

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

/* ── Initial page loader (once per browser tab session) ───────── */
const SESSION_LOADED_KEY = "pri-app-loaded";

function PageLoader() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(SESSION_LOADED_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return undefined;
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_LOADED_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [visible]);

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
            <BrandLogo mark size="4xl" />
            <span className="text-sm font-semibold tracking-widest text-[var(--text-muted)] uppercase">
              Loading…
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

/* Portal + auth routes skip page transitions (avoids blank screen on portal login). */
const PORTAL_ROUTE_PREFIXES = [
  "/employee-dashboard",
  "/candidate-dashboard",
  "/candidate-profile",
  "/candidate-jobs",
  "/customer-dashboard",
];

const AUTH_ROUTE_PREFIXES = [
  "/candidate-login",
  "/candidate-register",
  "/customer-login",
  "/customer-register",
  "/employee-login",
];

const PORTAL_SHELL_PREFIXES = [
  "/employee-dashboard",
  "/candidate-dashboard",
  "/candidate-profile",
  "/customer-dashboard",
];

function matchesPrefix(pathname, prefixes) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isPortalShell(pathname) {
  return matchesPrefix(pathname, PORTAL_SHELL_PREFIXES);
}

function isPortalRoute(pathname) {
  return matchesPrefix(pathname, PORTAL_ROUTE_PREFIXES);
}

function skipPageTransition(pathname) {
  return isPortalRoute(pathname) || matchesPrefix(pathname, AUTH_ROUTE_PREFIXES);
}

function PW({ children, animate = true, reducedMotion = false, motionless = false }) {
  if (!animate || reducedMotion || motionless) {
    return children;
  }
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/* ── Routes ──────────────────────────────────────────────────── */
function AppRoutes({ reducedMotion = false, motionless = false }) {
  const pw = (children, animate = true) => (
    <PW animate={animate} reducedMotion={reducedMotion} motionless={motionless}>{children}</PW>
  );

  return (
    <Routes>
        <Route path="/"                element={pw(<Home />)} />
        <Route path="/services"        element={pw(<Services />)} />
        <Route path="/talent-solutions" element={pw(<TalentSolutions />)} />
        <Route path="/ai-innovation"   element={pw(<AiInnovation />)} />
        <Route path="/ai-services"     element={pw(<AiServices />)} />
        <Route path="/industries"      element={pw(<Industries />)} />
        <Route path="/about"           element={pw(<About />)} />
        <Route path="/contact"         element={<Navigate to="/about#contact" replace />} />
        <Route path="/resources"       element={pw(<Resources />)} />
        <Route path="/resources/:slug" element={pw(<Resources />)} />
        <Route path="/case-studies/:slug" element={pw(<CaseStudy />)} />
        <Route path="/employee-login" element={pw(<EmployeeLogin />, false)} />
        <Route path="/employee-auth-callback" element={pw(<EmployeeAuthCallback />, false)} />
        <Route
          path="/employee-dashboard"
          element={pw(<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>, false)}
        />
        <Route path="/candidate-login" element={pw(<CandidateLogin />, false)} />
        <Route path="/candidate-register" element={pw(<CandidateRegister />, false)} />
        <Route element={<CandidatePortalLayout />}>
          <Route path="candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route path="candidate-jobs" element={<CandidateJobs />} />
        </Route>
        <Route path="/customer-login" element={pw(<CustomerLogin />, false)} />
        <Route path="/customer-register" element={pw(<CustomerRegister />, false)} />
        <Route
          path="/customer-dashboard"
          element={pw(
            <ProtectedPortalRoute authKey={AUTH_KEYS.customer} redirectTo="/customer-login">
              <CustomerDashboard />
            </ProtectedPortalRoute>,
            false
          )}
        />
        <Route path="/careers"         element={pw(<Careers />)} />
        <Route path="/careers/mobile-app" element={pw(<JobDivaMobileApp />)} />
        <Route path="/job-seeker-faq"  element={pw(<JobSeekerFAQ />)} />
        <Route path="/working-at-pri"  element={pw(<WorkingAtPRI />)} />
        <Route path="/legal"           element={pw(<Legal />)} />
        <Route path="/privacy-policy"  element={pw(<PrivacyPolicy />)} />
        <Route path="/cookie-settings" element={pw(<CookieSettings />)} />
        <Route path="/quiz" element={pw(<Quiz />)} />
        <Route path="/get-pricing" element={pw(<GetPricing />)} />
        <Route path="/roi-calculator" element={pw(<ROICalculatorPage />)} />
        <Route path="/why-pri-global" element={pw(<WhyPRI />)} />
        <Route path="*" element={pw(<NotFound />)} />
      </Routes>
  );
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  const location = useLocation();
  const portalShell = isPortalShell(location.pathname);
  const noPageTransition = skipPageTransition(location.pathname);
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <PageLoader />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar minimal={portalShell} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <AppRoutes
            key={location.pathname}
            reducedMotion={reducedMotion}
            motionless={noPageTransition}
          />
        </AnimatePresence>
      </main>
      {!portalShell && <Footer />}
      <CookieBanner />
      <ScrollToTopButton />
      <NewsScrollHint />
      <DarkModeToast />
      <PriVaWidget />
    </div>
  );
}
