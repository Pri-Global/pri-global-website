export const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-royal/30";

export const labelClass = "block text-sm font-medium text-[var(--text-primary)] mb-1.5";

export const shakeVariants = {
  shake: {
    x: [0, -12, 12, -10, 10, -6, 6, 0],
    transition: { duration: 0.5 },
  },
};

export const STATUS_STYLES = {
  green: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  amber: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  blue: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  gray: "bg-[var(--border-subtle)] text-[var(--text-muted)]",
};
