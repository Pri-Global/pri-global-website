import { Link, useLocation } from "react-router-dom";
import { Info } from "lucide-react";
import { isEmployeePortalTestMode, isPortalPreviewMode } from "../../utils/portalEnv";
import { EMPLOYEE_TEST_ACCOUNT } from "../../data/portalDemoCredentials";
import { AUTH_KEYS, readAuth } from "../../hooks/usePortalAuth";
import { isLiveCandidateSession } from "../../services/candidatePortal";
import { getEmployeeSession } from "../ProtectedRoute";
import { isLiveEmployeeSession } from "../../services/employeePortal";

export default function PortalPreviewBanner({ compact = false, className = "" }) {
  const { pathname } = useLocation();
  const isEmployeeRoute = pathname.startsWith("/employee");
  const isCandidateRoute = pathname.startsWith("/candidate");

  if (isCandidateRoute && isLiveCandidateSession(readAuth(AUTH_KEYS.candidate))) {
    return null;
  }

  if (isEmployeeRoute && isEmployeePortalTestMode()) {
    if (isLiveEmployeeSession(getEmployeeSession())) {
      return null;
    }
    const body = (
      <>
        <span className="font-semibold text-[var(--text-primary)]">Test access only</span> — preview login with{" "}
        <code className="text-[11px]">{EMPLOYEE_TEST_ACCOUNT.email}</code>, or use Sign in with Microsoft above.
      </>
    );

    if (compact) {
      return (
        <div
          className={`rounded-xl border border-violet-500/25 bg-violet-500/10 px-4 py-3 text-xs text-[var(--text-secondary)] leading-relaxed ${className}`}
          role="status"
        >
          {body}
        </div>
      );
    }

    return (
      <div
        className={`flex items-start gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-[var(--text-secondary)] ${className}`}
        role="status"
      >
        <Info size={18} className="shrink-0 text-violet-600 dark:text-violet-400 mt-0.5" aria-hidden />
        <p className="leading-relaxed">{body}</p>
      </div>
    );
  }

  if (!isPortalPreviewMode()) return null;

  if (compact) {
    return (
      <div
        className={`rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-[var(--text-secondary)] leading-relaxed ${className}`}
        role="status"
      >
        <span className="font-semibold text-[var(--text-primary)]">Preview mode</span> — sample data
        only, not live systems.{" "}
        <Link to="/get-pricing" className="font-medium text-royal dark:text-royaldark hover:underline">
          Request access
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-[var(--text-secondary)] ${className}`}
      role="status"
    >
      <Info size={18} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" aria-hidden />
      <p className="leading-relaxed">
        <span className="font-semibold text-[var(--text-primary)]">Preview mode.</span> Dashboards
        show sample data and are not connected to live HR, billing, or applicant systems. For portal
        access or questions,{" "}
        <Link to="/get-pricing" className="font-medium text-royal dark:text-royaldark hover:underline">
          talk to our team
        </Link>{" "}
        or{" "}
        <Link to="/about#contact" className="font-medium text-royal dark:text-royaldark hover:underline">
          contact us
        </Link>
        .
      </p>
    </div>
  );
}
