import { motion } from "framer-motion";
import priGlobalLogo from "../../assets/logo/pri-global-logo.png";

const HEIGHT = {
  sm: "h-9",
  md: "h-12",
  lg: "h-14",
  xl: "h-[4.5rem]",
  "2xl": "h-24",
};

const MAX_WIDTH = {
  sm: "max-w-[130px]",
  md: "max-w-[220px]",
  lg: "max-w-[260px]",
  xl: "max-w-[300px]",
  "2xl": "max-w-[340px]",
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
      width={280}
      height={84}
      className={`${HEIGHT[size]} w-auto ${MAX_WIDTH[size]} sm:max-w-none object-contain object-left ${tone} ${className}`}
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
