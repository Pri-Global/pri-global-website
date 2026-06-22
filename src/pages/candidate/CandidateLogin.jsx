import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import CandidateCareersNav from "../../components/portal/CandidateCareersNav";
import { AUTH_KEYS, isLoggedIn, writeAuth } from "../../hooks/usePortalAuth";
import { inputClass, shakeVariants } from "../../components/portal/portalStyles";
import {
  CANDIDATE_DEMO,
  matchCandidateDemo,
} from "../../data/portalDemoCredentials";
import { showDevDemoCredentials } from "../../utils/portalEnv";
import PortalPreviewBanner from "../../components/portal/PortalPreviewBanner";
import {
  isSupabaseConfigured,
  signInWithSupabase,
  resetSupabasePassword,
  formatAuthError,
  candidateSessionFromUser,
  hasPortalAccess,
} from "../../lib/portalSupabaseAuth";

export default function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetNotice, setResetNotice] = useState("");

  if (isLoggedIn(AUTH_KEYS.candidate)) {
    return <Navigate to="/candidate-dashboard" replace />;
  }

  const fail = (message) => {
    setError(message);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const completeDemoLogin = (normalized) => {
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

    if (isSupabaseConfigured) {
      const result = await signInWithSupabase(normalized, password);
      if (result.notConfigured) {
        setSubmitting(false);
        if (completeDemoLogin(normalized)) return;
        fail("Candidate login is not configured yet.");
        return;
      }
      if (result.ok) {
        if (!hasPortalAccess(result.user, "candidate")) {
          setSubmitting(false);
          fail("This account is not registered for the Candidate Portal.");
          return;
        }
        writeAuth(AUTH_KEYS.candidate, candidateSessionFromUser(result.user, remember));
        setSubmitting(false);
        navigate("/candidate-dashboard");
        return;
      }

      setSubmitting(false);
      if (completeDemoLogin(normalized)) return;
      fail(formatAuthError(result.error));
      return;
    }

    setSubmitting(false);
    if (completeDemoLogin(normalized)) return;
    fail("Invalid credentials. New to PRI Global? Create an account.");
  };

  const handleForgotPassword = async () => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      fail("Enter your email address first.");
      return;
    }
    if (!isSupabaseConfigured) {
      fail("Password reset is not available in demo mode.");
      return;
    }
    setSubmitting(true);
    const result = await resetSupabasePassword(normalized, "/candidate-login");
    setSubmitting(false);
    if (!result.ok) {
      fail(result.error);
      return;
    }
    setError("");
    setResetNotice(`Password reset link sent to ${normalized}. Check your inbox.`);
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
          animate={shaking ? "shake" : ""}
          variants={shakeVariants}
          className="w-full max-w-[440px] mx-auto bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col items-center mb-8">
            <BrandLogo size="xl" className="mb-5" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Candidate Portal</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center leading-relaxed">
              Sign in to track applications, messages, and job opportunities.
            </p>
          </div>

          <PortalPreviewBanner compact className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="candidate-login-email" className="sr-only">Email</label>
            <input id="candidate-login-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} autoComplete="email" />
            <label htmlFor="candidate-login-password" className="sr-only">Password</label>
            <input id="candidate-login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} autoComplete="current-password" />
            <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-emerald-500" />
              Remember me
            </label>
            {resetNotice && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
                {resetNotice}
              </p>
            )}
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <Button type="submit" className="w-full !bg-emerald-600 hover:!bg-emerald-700" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In →"}
            </Button>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={submitting}
              className="w-full text-center text-xs text-[var(--text-muted)] hover:text-emerald-600 transition-colors disabled:opacity-50"
            >
              Forgot password?
            </button>
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
              Local demo email: {CANDIDATE_DEMO.email}
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
