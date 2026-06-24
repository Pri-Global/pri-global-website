import { Sparkles } from "lucide-react";
import { showPortalDemoLogin } from "../../utils/portalEnv";

/**
 * One-click demo fill for preview portals (local + production when VITE_PORTAL_DEMO_PASSWORD is set).
 */
export default function PortalDemoLoginHelp({ demoEmail, onFillDemo, className = "" }) {
  if (!showPortalDemoLogin()) return null;

  return (
    <div
      className={`rounded-xl border border-dashed border-royal/25 bg-royal/[0.04] px-4 py-3 ${className}`}
    >
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
        <span className="font-semibold text-[var(--text-primary)]">Preview demo</span> — explore the
        dashboard with sample data. No real account required.
      </p>
      <button
        type="button"
        onClick={onFillDemo}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-royal dark:text-royaldark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/40 rounded"
      >
        <Sparkles size={14} aria-hidden />
        Try demo account
      </button>
    </div>
  );
}
