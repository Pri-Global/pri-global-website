import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import { AUTH_KEYS, isLoggedIn, writeAuth } from "../../hooks/usePortalAuth";
import { inputClass, shakeVariants } from "../../components/portal/portalStyles";
import {
  CLIENT_DEMO_ACCOUNTS,
  matchClientDemo,
} from "../../data/portalDemoCredentials";
import { showDevDemoCredentials } from "../../utils/portalEnv";
import PortalPreviewBanner from "../../components/portal/PortalPreviewBanner";
import {
  isSupabaseConfigured,
  signInWithSupabase,
  resetSupabasePassword,
  formatAuthError,
  customerSessionFromUser,
  hasPortalAccess,
} from "../../lib/portalSupabaseAuth";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("hiring");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetNotice, setResetNotice] = useState("");

  if (isLoggedIn(AUTH_KEYS.customer)) {
    return <Navigate to="/customer-dashboard" replace />;
  }

  const fail = (message) => {
    setError(message);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const completeDemoLogin = (normalized) => {
    const demoSession = matchClientDemo(normalized, password, tab);
    if (!demoSession) return false;

    writeAuth(AUTH_KEYS.customer, {
      ...demoSession,
      loginTime: Date.now(),
    });
    navigate("/customer-dashboard");
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
        fail("Client login is not configured yet.");
        return;
      }
      if (result.ok) {
        if (!hasPortalAccess(result.user, "customer")) {
          setSubmitting(false);
          fail("This account is not registered for the Client Portal.");
          return;
        }
        writeAuth(AUTH_KEYS.customer, customerSessionFromUser(result.user, tab));
        setSubmitting(false);
        navigate("/customer-dashboard");
        return;
      }

      setSubmitting(false);
      if (completeDemoLogin(normalized)) return;
      fail(formatAuthError(result.error));
      return;
    }

    setSubmitting(false);
    if (completeDemoLogin(normalized)) return;
    fail("Invalid credentials. Request access or contact your account manager.");
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
    const result = await resetSupabasePassword(normalized, "/customer-login");
    setSubmitting(false);
    if (!result.ok) {
      fail(result.error);
      return;
    }
    setError("");
    setResetNotice(`Password reset link sent to ${normalized}. Check your inbox.`);
  };

  const accent = tab === "hiring" ? "#1A56DB" : "#f59e0b";

  return (
    <>
      <SEO title="Client Portal" description="PRI Global client portal — manage talent pipeline, projects, and PR1SM.AI access." url="/customer-login" noindex />
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
        <motion.div animate={shaking ? "shake" : ""} variants={shakeVariants} className="w-full max-w-[440px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <BrandLogo size="xl" className="mb-5" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Client Portal</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">
              Sign in to your talent pipeline, projects, and PR1SM.AI dashboard.
            </p>
          </div>

          <div className="flex rounded-xl border border-[var(--border)] p-1 mb-6">
            {[
              { id: "hiring", label: "Hiring Client" },
              { id: "services", label: "Services / PR1SM.AI" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setTab(t.id); setError(""); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${tab === t.id ? "text-white" : "text-[var(--text-muted)]"}`}
                style={tab === t.id ? { backgroundColor: t.id === "hiring" ? "#1A56DB" : "#f59e0b" } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>

          <PortalPreviewBanner compact className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
            {resetNotice && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
                {resetNotice}
              </p>
            )}
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <Button type="submit" className="w-full" style={{ backgroundColor: accent }} disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In →"}
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

          {showDevDemoCredentials() && (
            <div className="mt-6 space-y-2 text-[10px] text-center text-[var(--text-muted)] leading-relaxed">
              <p>Local demo — Hiring: {CLIENT_DEMO_ACCOUNTS.hiring.email}</p>
              <p>Local demo — Services: {CLIENT_DEMO_ACCOUNTS.services.email}</p>
            </div>
          )}

          <Button to="/customer-register" variant="ghost" size="sm" className="w-full mt-4">
            Request Access →
          </Button>
        </motion.div>
      </section>
    </>
  );
}
