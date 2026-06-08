import LiveCounter from "../ui/LiveCounter";
import { parseMetric } from "../../utils/parseMetric";

export default function CaseStudyMetric({
  metric,
  label,
  animate = true,
  size = "md",
  variant = "default",
  className = "",
}) {
  const parsed = parseMetric(metric);
  const isCompactText = size === "sm" && !parsed.isNumeric;

  const valueColor =
    variant === "onDark"
      ? "text-white"
      : "text-royal dark:text-royaldark";
  const labelColor =
    variant === "onDark"
      ? "text-white/70"
      : "text-[var(--text-secondary)]";

  const sizeClass =
    size === "lg"
      ? "text-3xl md:text-4xl"
      : size === "sm"
        ? "text-xl"
        : "text-2xl";

  if (isCompactText) {
    return (
      <div className={`min-h-[4.5rem] flex flex-col justify-center ${className}`}>
        <p
          className={`text-[10px] font-bold uppercase tracking-wider leading-tight mb-1.5 ${valueColor}`}
        >
          {parsed.display}
        </p>
        <p className="text-xs font-medium text-[var(--text-primary)] leading-snug line-clamp-3">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {parsed.isNumeric && animate ? (
        <span
          className={`font-heading font-extrabold tabular-nums leading-none ${valueColor} ${sizeClass}`}
        >
          <LiveCounter value={parsed.value} suffix={parsed.suffix} />
        </span>
      ) : (
        <span
          className={`font-heading font-extrabold leading-none ${valueColor} ${sizeClass}`}
        >
          {parsed.display}
        </span>
      )}
      {label && (
        <p className={`text-xs mt-1.5 leading-snug ${labelColor}`}>{label}</p>
      )}
    </div>
  );
}
