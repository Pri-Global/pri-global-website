import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Briefcase,
  Building2,
  Shield,
  ChevronRight,
} from "lucide-react";
import { readAuth, AUTH_KEYS } from "../../hooks/usePortalAuth";
import {
  getEmployeeSession,
  clearEmployeeSession,
} from "../ProtectedRoute";

/**
 * DEMO ONLY — detects which portal session is active in localStorage.
 */
function getActivePortal() {
  if (getEmployeeSession()?.loggedIn) return "employee";
  if (readAuth(AUTH_KEYS.candidate)?.loggedIn) return "candidate";
  if (readAuth(AUTH_KEYS.customer)?.loggedIn) return "customer";
  return null;
}

function getSessionEmail(portal) {
  if (portal === "employee") return getEmployeeSession()?.email;
  if (portal === "candidate") return readAuth(AUTH_KEYS.candidate)?.email;
  if (portal === "customer") return readAuth(AUTH_KEYS.customer)?.email;
  return null;
}

function emailInitial(email) {
  if (!email) return "U";
  return email.charAt(0).toUpperCase();
}

const PORTALS = [
  {
    id: "candidate",
    label: "Candidate Portal",
    sub: "Job search & applications",
    icon: Briefcase,
    color: "#22c55e",
    dashboard: "/candidate-dashboard",
    login: "/candidate-login",
    badgeLabel: "Candidate Portal",
  },
  {
    id: "customer",
    label: "Client Portal",
    sub: "Talent pipeline & services",
    icon: Building2,
    color: "#1A56DB",
    dashboard: "/customer-dashboard",
    login: "/customer-login",
    badgeLabel: "Client Portal",
  },
  {
    id: "employee",
    label: "Employee Portal",
    sub: "Internal team access",
    icon: Shield,
    color: "#8b5cf6",
    dashboard: "/employee-dashboard",
    login: "/employee-login",
    badgeLabel: "Employee Portal",
  },
];

export default function PortalMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(getActivePortal);
  const containerRef = useRef(null);

  const refreshAuth = useCallback(() => {
    setActivePortal(getActivePortal());
  }, []);

  useEffect(() => {
    refreshAuth();
    window.addEventListener("storage", refreshAuth);
    return () => window.removeEventListener("storage", refreshAuth);
  }, [refreshAuth]);

  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    refreshAuth();

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, refreshAuth]);

  const signOutAll = () => {
    // DEMO — clears all portal localStorage sessions
    clearEmployeeSession();
    localStorage.removeItem(AUTH_KEYS.candidate);
    localStorage.removeItem(AUTH_KEYS.customer);
    localStorage.removeItem("pri-employee-auth");
    setOpen(false);
    setActivePortal(null);
    navigate("/");
  };

  const isLoggedIn = Boolean(activePortal);
  const sessionEmail = isLoggedIn ? getSessionEmail(activePortal) : null;
  const initials = emailInitial(sessionEmail);
  const activeMeta = PORTALS.find((p) => p.id === activePortal);

  const handleLinkClick = () => {
    setOpen(false);
    refreshAuth();
  };

  return (
    <div ref={containerRef} className="relative z-[100]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 ${
          isLoggedIn
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]"
        }`}
        aria-label="Portal menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {isLoggedIn ? (
          <span className="text-sm font-semibold leading-none">{initials}</span>
        ) : (
          <UserCircle size={20} strokeWidth={1.5} />
        )}
        {isLoggedIn && (
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[var(--bg-card)]"
            aria-hidden
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-full mt-2 w-[260px] bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-xl p-2"
          >
            {/* Header */}
            <div className="px-2 py-2">
              {!isLoggedIn ? (
                <p className="text-[12px] text-[var(--text-muted)]">
                  Sign in to your portal
                </p>
              ) : (
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                    style={{ backgroundColor: activeMeta?.color ?? "var(--accent)" }}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">
                      Signed in as
                    </p>
                    <p className="text-[12px] font-medium text-[var(--text-primary)] truncate">
                      {sessionEmail}
                    </p>
                    <span
                      className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: activeMeta?.color ?? "#22c55e" }}
                    >
                      {activeMeta?.badgeLabel}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn && <div className="h-px bg-[var(--border)] mx-1 mb-1" />}

            {/* Portal options */}
            <div className="space-y-0.5">
              {PORTALS.map((portal) => {
                const Icon = portal.icon;
                const isActive = activePortal === portal.id;
                const to = isActive ? portal.dashboard : portal.login;

                return (
                  <Link
                    key={portal.id}
                    to={to}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-[10px] transition-colors duration-150 ease-in-out hover:bg-[var(--bg-secondary)] group"
                  >
                    <Icon
                      size={20}
                      style={{ color: portal.color }}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[var(--text-primary)]">
                          {portal.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-medium text-[#22c55e]">
                            ● Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-tight">
                        {portal.sub}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-[var(--text-muted)] shrink-0 opacity-60 group-hover:opacity-100"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="h-px bg-[var(--border)] mx-1 my-2" />

            {/* Footer */}
            <div className="px-2 pb-1">
              {!isLoggedIn ? (
                <p className="text-[11px] text-[var(--text-muted)] text-center">
                  New to PRI Global?{" "}
                  <Link
                    to="/candidate-register"
                    onClick={handleLinkClick}
                    className="text-royal hover:underline font-medium"
                  >
                    Create an account →
                  </Link>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={signOutAll}
                  className="w-full py-2 text-sm font-medium text-[var(--text-secondary)] rounded-[10px] transition-colors duration-150 hover:text-red-500 hover:bg-[var(--bg-secondary)]"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
