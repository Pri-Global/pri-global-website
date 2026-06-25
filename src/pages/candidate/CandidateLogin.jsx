import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import CandidateCareersNav from "../../components/portal/CandidateCareersNav";
import { AUTH_KEYS, isLoggedIn, writeAuth } from "../../hooks/usePortalAuth";
import { inputClass, shakeVariants } from "../../components/portal/portalStyles";
import {
  CANDIDATE_DEMO,
  getDemoPassword,
  matchCandidateDemo,
} from "../../data/portalDemoCredentials";
import { showDevDemoCredentials, showPortalDemoLogin } from "../../utils/portalEnv";
import PortalDemoLoginHelp from "../../components/portal/PortalDemoLoginHelp";
import { loginCandidateAccount } from "../../services/candidatePortal";

export default function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const authed = isLoggedIn(AUTH_KEYS.candidate);

  useEffect(() => {
    if (authed) {
      navigate("/candidate-dashboard", { replace: true });
    }
  }, [authed, navigate]);

  if (authed) {
    return (
      <>
        <SEO
          title="Candidate Portal"
          description="PRI Global candidate portal — search IT jobs, track applications, and connect with recruiters."
          url="/candidate-login"
          noindex
        />
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-muted)]">Opening your candidate dashboard…</p>
        </section>
      </>
    );
  }

  const fail = (message) => {
    setError(message);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const fillDemo = () => {
    setEmail(CANDIDATE_DEMO.email);
    setPassword(getDemoPassword());
    setError("");
  };

  const completeDemoLogin = (normalized) => {
    if (!showPortalDemoLogin()) return false;
    const demoSession = matchCandidateDemo(normalized, password);
    if (!demoSession) return false;

    writeAuth(AUTH_KEYS.candidate, {
      ...demoSession,
      loginTime: Date.now(),
      remember,
    });
    navigate("/candidate-dashboard");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const normalized = email.trim().toLowerCase();

    try {
      await loginCandidateAccount(normalized, password, remember);
      setSubmitting(false);
      navigate("/candidate-dashboard");
      return;
    } catch (err) {
      setSubmitting(false);
      if (showPortalDemoLogin() && completeDemoLogin(normalized)) return;
      fail(
        err.message ||
          "Invalid credentials. Create an account if you're new to PRI Global."
      );
    }
  };

  return (
    <>
      <SEO
        title="Candidate Portal"
        description="PRI Global candidate portal — search IT jobs, track applications, and connect with recruiters."
        url="/candidate-login"
        noindex
      />
      <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-[440px] mx-auto mb-10">
          <CandidateCareersNav />
        </div>
        <motion.div
          animate={shaking ? "shake" : undefined}
          variants={shakeVariants}
          className="w-full max-w-[440px] mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col items-center mb-8">
            <BrandLogo size="xl" className="mb-5" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Candidate Portal</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center leading-relaxed">
              Sign in with the email and password you used when registering. Your profile and applications sync with PRI Global&apos;s job board.
            </p>
          </div>

          {showPortalDemoLogin() && (
            <PortalDemoLoginHelp demoEmail={CANDIDATE_DEMO.email} onFillDemo={fillDemo} className="mb-6" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="candidate-login-email" className="sr-only">Email</label>
            <input id="candidate-login-email" type="email" name="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} autoComplete="username" />
            <label htmlFor="candidate-login-password" className="sr-only">Password</label>
            <input id="candidate-login-password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} autoComplete="current-password" />
            <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-emerald-500" />
              Remember me
            </label>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <Button type="submit" className="w-full !bg-emerald-600 hover:!bg-emerald-700" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In →"}
            </Button>
            <p className="text-xs text-center text-[var(--text-muted)]">
              Forgot your password? Register again with a new email or contact{" "}
              <Link to="/about#contact" className="text-emerald-600 hover:underline">
                PRI Global
              </Link>
              .
            </p>
          </form>

          <div className="my-6 space-y-3">
            <p className="text-sm font-medium text-[var(--text-primary)] text-center">
              Don&apos;t have an account yet?
            </p>
            <Button to="/candidate-register?mode=resume" className="w-full !bg-emerald-600 hover:!bg-emerald-700">
              Sign Up with Resume →
            </Button>
            <Link
              to="/candidate-register?mode=manual"
              className="block text-center text-sm text-[var(--text-secondary)] hover:text-emerald-600 transition-colors"
            >
              Sign up without a resume — fill out your details
            </Link>
          </div>

          {showDevDemoCredentials() && (
            <p className="text-[10px] text-center text-[var(--text-muted)] mt-6 leading-relaxed">
              Local preview demo — password from <code className="text-[9px]">VITE_PORTAL_DEMO_PASSWORD</code>
            </p>
          )}
        </motion.div>

        <p className="text-center mt-8 text-sm text-[var(--text-secondary)]">
          Or{" "}
          <Link to="/candidate-jobs" className="text-emerald-600 hover:underline font-medium">
            browse open positions
          </Link>{" "}
          without signing in.
        </p>
      </section>
    </>
  );
}
