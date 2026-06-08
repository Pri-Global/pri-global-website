import { motion } from "framer-motion";
import AnimatedIcon from "../ui/AnimatedIcon";

const COLOR_MAP = {
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  royal: "bg-royal/10 text-royal dark:text-royaldark border-royal/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  default: "bg-[var(--border-subtle)] text-[var(--text-primary)] border-[var(--border)]",
};

export default function PortalCard({ icon: Icon, value, label, trend, color = "default", className = "" }) {
  const tone = COLOR_MAP[color] || COLOR_MAP.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 ${className}`}
    >
      {Icon && (
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${tone}`}>
          <AnimatedIcon Icon={Icon} size={18} className="currentColor" />
        </div>
      )}
      <p className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{value}</p>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{label}</p>
      {trend && <p className="text-xs text-[var(--text-muted)] mt-2">{trend}</p>}
    </motion.div>
  );
}
