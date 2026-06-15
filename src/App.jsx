import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
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
import GetPricing from "./pages/GetPricing";
import ROICalculatorPage from "./pages/ROICalculatorPage";
import WhyPRI from "./pages/WhyPRI";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import EmployeeLogin from "./pages/EmployeeLogin";
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
    }, 900);
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

/* Portal routes skip page transitions so sidebar navigation stays responsive. */
const PORTAL_ROUTE_PREFIXES = [
  "/employee-dashboard",
  "/candidate-dashboard",
  "/candidate-profile",
  "/candidate-jobs",
  "/customer-dashboard",
];

function isPortalRoute(pathname) {
  return PORTAL_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function PW({ children, animate = true }) {
  if (!animate) {
    return children;
  }
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/* ── Routes ──────────────────────────────────────────────────── */
function AppRoutes() {
  return (
    <Routes>
        <Route path="/"                element={<PW><Home /></PW>} />
        <Route path="/services"        element={<PW><Services /></PW>} />
        <Route path="/talent-solutions" element={<PW><TalentSolutions /></PW>} />
        <Route path="/ai-innovation"   element={<PW><AiInnovation /></PW>} />
        <Route path="/industries"      element={<PW><Industries /></PW>} />
        <Route path="/about"           element={<PW><About /></PW>} />
        <Route path="/resources"       element={<PW><Resources /></PW>} />
        <Route path="/resources/:slug" element={<PW><Resources /></PW>} />
        <Route path="/case-studies/:slug" element={<PW><CaseStudy /></PW>} />
        <Route path="/employee-login" element={<PW><EmployeeLogin /></PW>} />
        <Route
          path="/employee-dashboard"
          element={
            <PW animate={false}>
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            </PW>
          }
        />
        <Route path="/candidate-login" element={<PW><CandidateLogin /></PW>} />
        <Route path="/candidate-register" element={<PW><CandidateRegister /></PW>} />
        <Route element={<CandidatePortalLayout />}>
          <Route path="candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="candidate-profile" element={<CandidateProfile />} />
          <Route path="candidate-jobs" element={<CandidateJobs />} />
        </Route>
        <Route path="/customer-login" element={<PW><CustomerLogin /></PW>} />
        <Route path="/customer-register" element={<PW><CustomerRegister /></PW>} />
        <Route
          path="/customer-dashboard"
          element={
            <PW animate={false}>
              <ProtectedPortalRoute authKey={AUTH_KEYS.customer} redirectTo="/customer-login">
                <CustomerDashboard />
              </ProtectedPortalRoute>
            </PW>
          }
        />
        <Route path="/careers"         element={<PW><Careers /></PW>} />
        <Route path="/job-seeker-faq"  element={<PW><JobSeekerFAQ /></PW>} />
        <Route path="/working-at-pri"  element={<PW><WorkingAtPRI /></PW>} />
        <Route path="/legal"           element={<PW><Legal /></PW>} />
        <Route path="/privacy-policy"  element={<PW><PrivacyPolicy /></PW>} />
        <Route path="/cookie-settings" element={<PW><CookieSettings /></PW>} />
        <Route path="/quiz" element={<PW><Quiz /></PW>} />
        <Route path="/get-pricing" element={<PW><GetPricing /></PW>} />
        <Route path="/roi-calculator" element={<PW><ROICalculatorPage /></PW>} />
        <Route path="/why-pri-global" element={<PW><WhyPRI /></PW>} />
        <Route path="*" element={<PW><NotFound /></PW>} />
      </Routes>
  );
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  const location = useLocation();
  const portalRoute = isPortalRoute(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <PageLoader />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {portalRoute ? (
          <AppRoutes />
        ) : (
          <AnimatePresence mode="wait">
            <AppRoutes key={location.pathname} />
          </AnimatePresence>
        )}
      </main>
      <Footer />
      <CookieBanner />
      <ScrollToTopButton />
      <DarkModeToast />
      <PriVaWidget />
    </div>
  );
}
