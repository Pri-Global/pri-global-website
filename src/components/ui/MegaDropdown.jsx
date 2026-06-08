import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { scrollToPageTop } from "../../utils/scrollToPageTop";
import AnimatedIcon from "./AnimatedIcon";

function DropdownLink({ item, onClose }) {
  const Icon = item.icon;
  const inner = (
    <>
      <span className="w-9 h-9 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center shrink-0">
        <AnimatedIcon Icon={Icon} size={18} className="text-royal dark:text-royaldark" />
      </span>
      <span className="min-w-0">
        <span className="block font-heading font-semibold text-sm text-[var(--text-primary)]">
          {item.label}
        </span>
        {item.desc && (
          <span className="block text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
            {item.desc}
          </span>
        )}
      </span>
      {item.external && <ExternalLink size={12} className="text-[var(--text-muted)] shrink-0 ml-auto" />}
    </>
  );

  const className =
    "flex items-start gap-3 p-3 rounded-lg hover:bg-royal/5 dark:hover:bg-royaldark/10 transition-colors group";

  if (item.external) {
    return (
      <a
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClose}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link to={item.to} className={className} onClick={() => { onClose(); scrollToPageTop(); }}>
      {inner}
    </Link>
  );
}

export default function MegaDropdown({
  label,
  badge,
  isOpen,
  onOpen,
  onClose,
  onToggle,
  wide = false,
  children,
  triggerClassName = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] ${triggerClassName}`}
        aria-expanded={isOpen}
      >
        {label}
        {badge}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className={`absolute top-full left-0 mt-2 z-50 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] dark:bg-[#16181e] shadow-xl p-6 ${
              wide ? "w-[480px]" : "w-80"
            }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItemList({ items, onClose }) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <DropdownLink key={item.label} item={item} onClose={onClose} />
      ))}
    </div>
  );
}

export function DropdownColumns({ columns, cta, onClose }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
              {col.title}
            </p>
            <div className="space-y-1">
              {col.items.map((item) => (
                <DropdownLink key={item.label} item={item} onClose={onClose} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {cta && (
        <Link
          to={cta.to}
          onClick={() => { onClose(); scrollToPageTop(); }}
          className="mt-5 block p-4 rounded-xl bg-royal/8 dark:bg-royaldark/12 border border-royal/20 hover:border-royal/40 transition-colors"
        >
          <p className="font-heading font-semibold text-sm text-[var(--text-primary)]">{cta.title}</p>
          <p className="text-xs text-royal dark:text-royaldark mt-1">{cta.action}</p>
        </Link>
      )}
    </>
  );
}
