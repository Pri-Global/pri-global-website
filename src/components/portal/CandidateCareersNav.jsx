import { Link, useLocation } from "react-router-dom";
import { WORKING_AT_PRI_URL, JOB_SEEKER_FAQ_URL } from "../../constants/links";

const LINKS = [
  { label: "Job Search", to: "/candidate-jobs", internal: true },
  { label: "Working at PRI", to: WORKING_AT_PRI_URL, internal: true },
  { label: "Job Seeker FAQ", to: JOB_SEEKER_FAQ_URL, internal: true },
];

export default function CandidateCareersNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="flex flex-wrap gap-1 border-b border-[var(--border)] mb-6"
      aria-label="Candidate resources"
    >
      {LINKS.map((link) => {
        const active = pathname === link.to;
        const className = `px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
          active
            ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`;

        return (
          <Link key={link.label} to={link.to} className={className}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
