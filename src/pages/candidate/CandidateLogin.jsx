import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import { AUTH_KEYS, isLoggedIn, writeAuth } from "../../hooks/usePortalAuth";
import { inputClass, shakeVariants } from "../../components/portal/portalStyles";

// DEMO — Replace with real auth in production
const DEMO_EMAIL = "candidate@example.com";
const DEMO_PASSWORD = "Candidate2025!";

export default function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  if (isLoggedIn(AUTH_KEYS.candidate)) {
    return <Navigate to="/candidate-dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_EMAIL && password === DEMO_PASSWORD) {
      writeAuth(AUTH_KEYS.candidate, {
        loggedIn: true,
        email: normalized,
        name: "Alex Johnson",
        role: "candidate",
        loginTime: Date.now(),
        remember,
      });
      navigate("/candidate-dashboard");
      return;
    }
    setError("Invalid credentials. New to PRI Global? Create an account.");
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  return (
    <>
      <SEO
        title="Candidate Portal"
        description="PRI Global candidate portal — search IT jobs, track applications, and connect with recruiters."
        url="/candidate-login"
        noindex
      />
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
        <motion.div
          animate={shaking ? "shake" : ""}
          variants={shakeVariants}
          className="w-full max-w-[440px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col items-center mb-8">
            <BrandLogo size="xl" className="mb-5" />
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">Candidate Portal</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center leading-relaxed">
              Access your job applications, profile, and career opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
            <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-emerald-500" />
              Remember me
            </label>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
            <Button type="submit" className="w-full !bg-emerald-600 hover:!bg-emerald-700">
              Sign In →
            </Button>
            <button type="button" className="w-full text-center text-xs text-[var(--text-muted)] hover:text-emerald-600 transition-colors">
              Forgot password?
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)]">— or —</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <Button to="/candidate-register" variant="ghost" className="w-full">
            Create an Account →
          </Button>

          <p className="text-[10px] text-center text-[var(--text-muted)] mt-6">
            Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>
        </motion.div>
      </section>
    </>
  );
}
