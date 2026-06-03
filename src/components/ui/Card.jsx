import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = false, ...props }) {
  const hoverProps = hover
    ? {
        whileHover: {
          y: -6,
          boxShadow: "0 16px 40px -8px rgba(13,27,62,0.12)",
          transition: { type: "spring", stiffness: 280, damping: 18 },
        },
      }
    : {};

  return (
    <motion.div
      className={`group bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-6 ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
