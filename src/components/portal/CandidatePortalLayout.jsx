import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import PortalLayout from "./PortalLayout";
import { AUTH_KEYS, isLoggedIn, usePortalAuth } from "../../hooks/usePortalAuth";
import { CANDIDATE_NAV } from "../../data/portalNav";

const ACCENT = "#22c55e";

const SUBTITLES = {
  "/candidate-dashboard": "Your career journey with PRI Global",
  "/candidate-profile": "Manage your professional profile",
  "/candidate-jobs": "Live openings from PRI Global's job board",
};

/**
 * Layout route — PortalLayout + Outlet stay mounted while switching
 * dashboard / profile / jobs (relative child routes in App.jsx).
 */
export default function CandidatePortalLayout() {
  const { pathname } = useLocation();
  const authed = isLoggedIn(AUTH_KEYS.candidate);
  const { session, logout } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");
  const isJobs = pathname === "/candidate-jobs";

  if (!authed) {
    if (isJobs) {
      return (
        <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              <Link to="/candidate-login" className="text-emerald-600 hover:underline font-medium">
                Sign in
              </Link>{" "}
              to save jobs and track applications in your candidate portal.
            </p>
            <Outlet />
          </div>
        </section>
      );
    }
    return <Navigate to="/candidate-login" replace />;
  }

  return (
    <PortalLayout
      portalLabel="Candidate Portal"
      accentColor={ACCENT}
      userName={session?.name || "Candidate"}
      userSubtitle={SUBTITLES[pathname] || "Candidate Portal"}
      navItems={CANDIDATE_NAV}
      profileLink="/candidate-profile"
      onLogout={logout}
    >
      <Outlet />
    </PortalLayout>
  );
}
