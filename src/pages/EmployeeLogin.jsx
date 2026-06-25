import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import BrandLogo from "../components/ui/BrandLogo";
import SEO from "../components/SEO";
import { setEmployeeSession, getEmployeeSession } from "../components/ProtectedRoute";
import {
  EMPLOYEE_TEST_ACCOUNT,
  getDemoPassword,
  isDemoLoginConfigured,
  matchEmployeeDemo,
} from "../data/portalDemoCredentials";
import { showDevDemoCredentials } from "../utils/portalEnv";
import PortalPreviewBanner from "../components/portal/PortalPreviewBanner";
import {
  fetchEmployeeAuthStatus,
  loginWithRipplingEmail,
  persistRipplingEmployeeSession,
  startMicrosoftEmployeeLogin,
  startRipplingAdminConnect,
} from "../services/employeePortal";

const shake = {
  shake: {
    x: [0, -12, 12, -10, 10, -6, 6, 0],
    transition: { duration: 0.5 },
  },
};

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(searchParams.get("error") || "");
  const [notice, setNotice] = useState(
    searchParams.get("rippling") === "connected"
      ? `Rippling connected for ${searchParams.get("company") || "your company"}. Employees can sign in with their Rippling work email.`
      : ""
  );
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState({
    microsoftConfigured: false,
    ripplingConfigured: false,
    ripplingConnected: false,
    ripplingCompany: null,
  });
  const [showTestLogin, setShowTestLogin] = useState(false);
  const authed = Boolean(getEmployeeSession()?.loggedIn);

  useEffect(() => {
    if (authed) navigate("/employee-dashboard", { replace: true });
  }, [authed, navigate]);

  useEffect(() => {
    fetchEmployeeAuthStatus()
      .then(setAuthStatus)
      .catch(() => {});
  }, []);

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

  const fail = (message) => {
    setError(message);
    setNotice("");
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const fillTestAccount = () => {
    setEmail(EMPLOYEE_TEST_ACCOUNT.email);
    setPassword(getDemoPassword());
    setError("");
  };

  const handleMicrosoftLogin = () => {
    setError("");
    if (!authStatus.microsoftConfigured) {
      fail("Microsoft login is not configured yet (no Azure access).");
      return;
    }
    startMicrosoftEmployeeLogin();
  };

  const handleRipplingLogin = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      const result = await loginWithRipplingEmail(email.trim().toLowerCase());
      persistRipplingEmployeeSession(result, remember);
      navigate("/employee-dashboard");
    } catch (err) {
      fail(err.message || "Rippling sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    const normalized = email.trim().toLowerCase();
    const demoSession = matchEmployeeDemo(normalized, password);
    setSubmitting(false);

    if (demoSession) {
      setEmployeeSession({
        ...demoSession,
        authProvider: "test",
        loginTime: Date.now(),
        remember,
      });
      navigate("/employee-dashboard");
      return;
    }

    fail(`Use the test account (${EMPLOYEE_TEST_ACCOUNT.email}) or your Rippling work email.`);
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
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Employee Portal</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1 text-center">
              Sign in with your Rippling work email
            </p>
          </div>

          <PortalPreviewBanner compact className="mb-6" />

          {notice && (
            <p className="mb-4 text-sm text-emerald-600 dark:text-emerald-400" role="status">
              {notice}
            </p>
          )}

          {error && (
            <p className="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          {authStatus.ripplingConnected ? (
            <form onSubmit={handleRipplingLogin} className="space-y-4">
              <input
                type="email"
                placeholder="you@priglobal.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm"
              />
              <Button type="submit" className="w-full !bg-violet-600 hover:!bg-violet-700" disabled={submitting}>
                {submitting ? "Checking Rippling…" : "Sign in with Rippling work email"}
              </Button>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                We verify your email against Rippling employee records for{" "}
                {authStatus.ripplingCompany || "PRI Global"}. Do not share your Rippling password here — it is never
                stored or sent to this site.
              </p>
            </form>
          ) : authStatus.ripplingConfigured ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Rippling is configured but not connected yet. A Rippling admin must authorize the app once.
              </p>
              <Button type="button" className="w-full !bg-violet-600 hover:!bg-violet-700" onClick={startRipplingAdminConnect}>
                Connect Rippling (Admin)
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              Rippling OAuth is not configured. Add <code className="text-[10px]">RIPPLING_CLIENT_ID</code>,{" "}
              <code className="text-[10px]">RIPPLING_CLIENT_SECRET</code>, and{" "}
              <code className="text-[10px]">RIPPLING_APP_NAME</code> to <code className="text-[10px]">.env</code> after
              registering a partner app at{" "}
              <a href="https://developer.rippling.com" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">
                developer.rippling.com
              </a>
              .
            </div>
          )}

          <div className="border-t border-[var(--border)] my-6" />

          <Button
            type="button"
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleMicrosoftLogin}
            disabled={!authStatus.microsoftConfigured}
          >
            <MicrosoftIcon />
            Microsoft 365 {authStatus.microsoftConfigured ? "" : "(not configured)"}
          </Button>

          <button
            type="button"
            onClick={() => setShowTestLogin((open) => !open)}
            className="w-full mt-4 text-xs font-semibold text-[var(--text-muted)] hover:text-violet-600 transition-colors"
          >
            {showTestLogin ? "Hide test account" : "Use preview test account instead"}
          </button>

          {showTestLogin && (
            <div className="mt-4 space-y-3">
              {(isDemoLoginConfigured() || import.meta.env.DEV) && (
                <button
                  type="button"
                  onClick={fillTestAccount}
                  className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Fill test credentials
                </button>
              )}
              <form onSubmit={handleTestSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm"
                />
                <Button type="submit" className="w-full" variant="secondary" disabled={submitting}>
                  Sign in with test account
                </Button>
              </form>
            </div>
          )}

          {showDevDemoCredentials() && (
            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4 leading-relaxed">
              Test password via <code className="text-[9px]">VITE_PORTAL_DEMO_PASSWORD</code>
            </p>
          )}
        </motion.div>
      </section>
    </>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}
