import { ResourceFilterIcon } from "../../utils/resourceFilterIcons";

export default function FilterPills({
  label,
  options,
  value,
  onChange,
  counts = {},
  iconGroup,
  className = "",
}) {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          const count = counts[option];

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? "bg-royal text-white shadow-sm shadow-royal/20"
                  : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-royal/30"
              }`}
            >
              {iconGroup && (
                <ResourceFilterIcon
                  group={iconGroup}
                  option={option}
                  size={14}
                  className={active ? "opacity-95" : "opacity-80"}
                />
              )}
              <span>
                {option}
                {typeof count === "number" ? ` (${count})` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
