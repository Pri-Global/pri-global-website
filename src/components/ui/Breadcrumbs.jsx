import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * @param {{ items: Array<{ name: string, url?: string }> }} props
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--text-muted)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight size={14} className="shrink-0 opacity-60" aria-hidden="true" />
              )}
              {isLast || !item.url ? (
                <span className="text-[var(--text-secondary)] font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-royal dark:hover:text-royaldark transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
