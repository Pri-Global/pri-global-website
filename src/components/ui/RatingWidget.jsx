import { Star, ExternalLink } from "lucide-react";
import AnimatedIcon from "./AnimatedIcon";
import { GLASSDOOR_URL, INDEED_REVIEWS_URL } from "../../constants/links";

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.floor(rating) ? "fill-amber-400" : "fill-none opacity-40"}
        />
      ))}
    </div>
  );
}

export default function RatingWidget({ className = "" }) {
  return (
    <div
      className={`grid sm:grid-cols-2 gap-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 ${className}`}
    >
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#0caa41]">Glassdoor</p>
        <StarRow rating={4} />
        <p className="font-heading text-3xl font-bold text-[var(--text-primary)]">4.1 / 5.0</p>
        <p className="text-sm text-[var(--text-secondary)]">65+ Employee Reviews</p>
        <a
          href={GLASSDOOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-royal dark:text-royaldark hover:underline"
        >
          View on Glassdoor <AnimatedIcon Icon={ExternalLink} size={14} className="text-royal dark:text-royaldark" />
        </a>
      </div>

      <div className="space-y-2 sm:border-l sm:border-[var(--border)] sm:pl-6">
        <p className="text-sm font-bold text-[#2164f3]">indeed</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
          Read what current and former employees say about working at PRI Global.
        </p>
        <a
          href={INDEED_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-royal dark:text-royaldark hover:underline"
        >
          Read reviews on Indeed <AnimatedIcon Icon={ExternalLink} size={14} className="text-royal dark:text-royaldark" />
        </a>
      </div>
    </div>
  );
}
