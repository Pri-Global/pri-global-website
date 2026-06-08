import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import { AUTH_KEYS, isLoggedIn, writeAuth } from "../../hooks/usePortalAuth";
import { inputClass, shakeVariants } from "../../components/portal/portalStyles";

// DEMO — Replace with real auth in production
const DEMO_ACCOUNTS = {
  hiring: { email: "hiring@company.com", password: "Client2025!", company: "Acme Corp", type: "hiring" },
  services: { email: "services@company.com", password: "Services2025!", company: "Acme Corp", type: "services" },
};

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("hiring");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  if (isLoggedIn(AUTH_KEYS.customer)) {
    return <Navigate to="/customer-dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const demo = DEMO_ACCOUNTS[tab];
    const normalized = email.trim().toLowerCase();
    if (normalized === demo.email && password === demo.password) {
      writeAuth(AUTH_KEYS.customer, {
        loggedIn: true,
        email: normalized,
        company: demo.company,
        type: demo.type,
        loginTime: Date.now(),
      });
      navigate("/customer-dashboard");
      return;
    }
    setError("Invalid credentials. Request access or contact your account manager.");
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
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
              Access your talent pipeline, project status, and PR1SM.AI dashboard.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" style={{ backgroundColor: accent }}>
              Sign In →
            </Button>
          </form>

          <p className="text-[10px] text-center text-[var(--text-muted)] mt-6">
            Demo {tab}: {DEMO_ACCOUNTS[tab].email} / {DEMO_ACCOUNTS[tab].password}
          </p>
          <Button to="/customer-register" variant="ghost" size="sm" className="w-full mt-4">
            Request Access →
          </Button>
        </motion.div>
      </section>
    </>
  );
}
