import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import BrandLogo from "../components/ui/BrandLogo";
import SEO from "../components/SEO";
import { setEmployeeSession, getEmployeeSession } from "../components/ProtectedRoute";
import {
  EMPLOYEE_DEMO,
  getDemoPassword,
  matchEmployeeDemo,
} from "../data/portalDemoCredentials";
import { showDevDemoCredentials } from "../utils/portalEnv";
import PortalPreviewBanner from "../components/portal/PortalPreviewBanner";
import PortalDemoLoginHelp from "../components/portal/PortalDemoLoginHelp";
import {
  isSupabaseConfigured,
  signInWithSupabase,
  resetSupabasePassword,
  formatAuthError,
  employeeSessionFromUser,
  hasPortalAccess,
} from "../lib/portalSupabaseAuth";

const shake = {
  shake: {
    x: [0, -12, 12, -10, 10, -6, 6, 0],
    transition: { duration: 0.5 },
  },
};

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetNotice, setResetNotice] = useState("");
  const authed = Boolean(getEmployeeSession()?.loggedIn);

  useEffect(() => {
    if (authed) {
      navigate("/employee-dashboard", { replace: true });
    }
  }, [authed, navigate]);

  if (authed) {
    return (
      <>
        <SEO title="Employee Portal" description="PRI Global employee portal login." url="/employee-login" noindex />
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
          <p className="text-sm text-[var(--text-muted)]">Opening your employee dashboard…</p>
        </section>
      </>
    );
  }

  const completeDemoLogin = (normalized) => {
    const demoSession = matchEmployeeDemo(normalized, password);
    if (!demoSession) return false;

    setEmployeeSession(employeeSessionFromUser(demoSession, remember));
    navigate("/employee-dashboard");
    return true;
  };

  const fail = (message) => {
    setError(message);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const fillDemo = () => {
    setEmail(EMPLOYEE_DEMO.email);
    setPassword(getDemoPassword());
    setError("");
    setResetNotice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const normalized = email.trim().toLowerCase();
    const finish = () => setSubmitting(false);

    if (isSupabaseConfigured) {
      const result = await signInWithSupabase(normalized, password);
      if (result.notConfigured) {
        finish();
        if (completeDemoLogin(normalized)) return;
        fail("Employee login is not configured yet.");
        return;
      }
      if (result.ok) {
        if (!hasPortalAccess(result.user, "employee")) {
          finish();
          fail("This account is not registered for the Employee Portal.");
          return;
        }
        setEmployeeSession(employeeSessionFromUser(result.user, remember));
        finish();
        navigate("/employee-dashboard");
        return;
      }

      finish();
      if (completeDemoLogin(normalized)) return;
      fail(formatAuthError(result.error));
      return;
    }

    finish();
    if (completeDemoLogin(normalized)) return;
    fail("Invalid credentials. Please contact IT if you need assistance.");
  };

  const handleForgotPassword = async () => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      fail("Enter your email address first.");
      return;
    }
    if (!isSupabaseConfigured) {
      fail("Password reset is not available. Contact IT at 636.256.7172.");
      return;
    }
    setSubmitting(true);
    const result = await resetSupabasePassword(normalized, "/employee-login");
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
    <SEO title="Employee Portal" description="PRI Global employee portal login." url="/employee-login" noindex />
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
      <motion.div
        animate={shaking ? "shake" : undefined}
        variants={shake}
        className="w-full max-w-[420px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <BrandLogo size="xl" className="mb-5" />
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            Employee Portal
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 text-center">
            Sign in with your PRI Global account
          </p>
        </div>

        <PortalPreviewBanner compact className="mb-6" />
        <PortalDemoLoginHelp demoEmail={EMPLOYEE_DEMO.email} onFillDemo={fillDemo} className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="emp-email" className="sr-only">
              Email
            </label>
            <input
              id="emp-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>
          <div>
            <label htmlFor="emp-password" className="sr-only">
              Password
            </label>
            <input
              id="emp-password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-[var(--border)] text-royal focus:ring-royal"
            />
            Remember me
          </label>

          {resetNotice && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
              {resetNotice}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={submitting}
            className="w-full text-center text-xs text-[var(--text-muted)] hover:text-royal transition-colors disabled:opacity-50"
          >
            Forgot password?
          </button>
        </form>

        <div className="border-t border-[var(--border)] my-6" />

        <p className="text-xs text-center text-[var(--text-muted)] leading-relaxed">
          Having trouble? Contact IT support at{" "}
          <a href="tel:6362567172" className="text-royal hover:underline">
            636.256.7172
          </a>
        </p>

        {showDevDemoCredentials() && (
          <p className="text-[10px] text-center text-[var(--text-muted)] mt-4 leading-relaxed">
            Local demo — password from <code className="text-[9px]">VITE_PORTAL_DEMO_PASSWORD</code>
          </p>
        )}
      </motion.div>
    </section>
    </>
  );
}
