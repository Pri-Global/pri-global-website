import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { isPortalPreviewMode } from "../../utils/portalEnv";

export default function PortalPreviewBanner({ compact = false, className = "" }) {
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
