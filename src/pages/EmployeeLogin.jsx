import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import BrandLogo from "../components/ui/BrandLogo";
import { setEmployeeSession, getEmployeeSession } from "../components/ProtectedRoute";

// DEMO CREDENTIALS - Replace with real auth in production
const DEMO_EMAIL = "employee@priglobal.com";
const DEMO_PASSWORD = "PRI2025!";

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

  if (getEmployeeSession()?.loggedIn) {
    return <Navigate to="/employee-dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setEmployeeSession({
        loggedIn: true,
        email: normalized,
        loginTime: Date.now(),
        remember,
      });
      navigate("/employee-dashboard");
      return;
    }
    setError("Invalid credentials. Please contact IT if you need assistance.");
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
      <motion.div
        animate={shaking ? "shake" : ""}
        variants={shake}
        className="w-full max-w-[420px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <BrandLogo size="xl" className="mb-5" />
          <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            Employee Portal
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 text-center">
            Sign in to access internal resources
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="emp-email" className="sr-only">
              Email
            </label>
            <input
              id="emp-email"
              type="email"
              autoComplete="email"
              placeholder="your@priglobal.com"
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

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <button
            type="button"
            className="w-full text-center text-xs text-[var(--text-muted)] hover:text-royal transition-colors"
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
      </motion.div>
    </section>
  );
}
