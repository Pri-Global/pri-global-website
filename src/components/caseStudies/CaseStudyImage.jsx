import { useState } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  UtensilsCrossed,
  Plane,
  Landmark,
  HeartPulse,
  Pill,
  Shield,
  Database,
  ShoppingBag,
  Cloud,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import AnimatedIcon from "../ui/AnimatedIcon";

const ICON_MAP = {
  Factory,
  UtensilsCrossed,
  Plane,
  Landmark,
  HeartPulse,
  Pill,
  Shield,
  Database,
  ShoppingBag,
  Cloud,
  CreditCard,
  GraduationCap,
};

export default function CaseStudyImage({
  study,
  variant = "card",
  showBadge = true,
  className = "",
  animate = true,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const Icon = ICON_MAP[study.industryIcon] || Factory;

  const isCard = variant === "card";
  const isFeatured = variant === "featured";

  const frameClass = `relative overflow-hidden bg-[var(--bg-secondary)] ${
    isCard
      ? "aspect-square border-b border-[var(--border-subtle)]"
      : isFeatured
        ? "aspect-square w-full max-w-[320px] rounded-2xl border border-[var(--border)] shadow-md"
        : "aspect-square w-full rounded-2xl border border-[var(--border)]"
  } ${className}`;

  const content = (
    <>
      {!failed ? (
        <>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-royal/30 border-t-royal rounded-full animate-spin" />
            </div>
          )}
          <motion.img
            src={study.imageUrl}
            alt={study.title}
            initial={animate ? { opacity: 0, scale: 0.92 } : false}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={isCard ? { scale: 1.04 } : { scale: 1.02 }}
            className={`absolute inset-0 w-full h-full object-contain ${
              isCard ? "p-4" : "p-5 md:p-6"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            loading="lazy"
            decoding="async"
          />
        </>
      ) : (
        <div className="group absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--text-muted)]">
          <AnimatedIcon Icon={Icon} size={40} className="text-royal/40 dark:text-royaldark/40" aria-hidden />
          <span className="text-xs">{study.industry}</span>
        </div>
      )}

      {showBadge && isCard && (
        <motion.span
          initial={animate ? { opacity: 0, y: 8 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-sm border border-[var(--border)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] shadow-sm"
        >
          {study.industry}
        </motion.span>
      )}
    </>
  );

  if (animate && isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={frameClass}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={frameClass}>{content}</div>;
}
