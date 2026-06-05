import { motion } from "framer-motion";
import priGlobalLogo from "../../assets/logo/pri-global-logo.png";

const HEIGHT = {
  sm: "h-7",
  md: "h-9",
  lg: "h-11",
  xl: "h-14",
  "2xl": "h-16",
};

/**
 * Official PRI Global wordmark.
 * @param {"default" | "onDark"} variant — invert for navy/dark backgrounds
 */
export default function BrandLogo({
  size = "md",
  variant = "default",
  className = "",
  animate = false,
}) {
  const tone =
    variant === "onDark"
      ? "brightness-0 invert"
      : "dark:brightness-0 dark:invert";

  const img = (
    <img
      src={priGlobalLogo}
      alt="PRI Global"
      width={160}
      height={48}
      className={`${HEIGHT[size]} w-auto max-w-[min(200px,55vw)] object-contain object-left ${tone} ${className}`}
      decoding="async"
    />
  );

  if (!animate) return img;

  return (
    <motion.span
      className="inline-flex"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {img}
    </motion.span>
  );
}
