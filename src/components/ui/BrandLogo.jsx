import { motion } from "framer-motion";
import priGlobalLogo from "../../assets/logo/pri-global-logo.png";
import priMarkSvg from "../../assets/logo/PRI.svg";

const WORDMARK_HEIGHT = {
  sm: "h-9",
  md: "h-12",
  lg: "h-14",
  xl: "h-[4.5rem]",
  "2xl": "h-24",
};

const WORDMARK_MAX_WIDTH = {
  sm: "max-w-[130px]",
  md: "max-w-[220px]",
  lg: "max-w-[260px]",
  xl: "max-w-[300px]",
  "2xl": "max-w-[340px]",
};

/** Square frame — wide SVG is cropped to the P on the left */
const MARK_FRAME = {
  xs: "h-6 w-6",
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
  "2xl": "h-28 w-28",
  "3xl": "h-36 w-36",
  "4xl": "h-44 w-44",
};

/**
 * @param {"default" | "onDark"} variant
 *   default — navy P on transparent (light backgrounds)
 *   onDark — white P on transparent (royal / navy backgrounds)
 * @param {boolean} mark — P icon (PRI.svg) vs full wordmark
 */
export default function BrandLogo({
  size = "md",
  variant = "default",
  mark = false,
  className = "",
  animate = false,
}) {
  const onDarkTone = "brightness-0 invert";
  const lightDarkModeTone = "dark:brightness-0 dark:invert";

  const img = mark ? (
    <span
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 ${MARK_FRAME[size] || MARK_FRAME.md} ${className}`}
    >
      <img
        src={priMarkSvg}
        alt="PRI"
        className={`h-full w-auto min-w-[200%] max-w-none object-left object-contain ${
          variant === "onDark" ? onDarkTone : lightDarkModeTone
        }`}
        decoding="async"
      />
    </span>
  ) : (
    <img
      src={priGlobalLogo}
      alt="PRI Global"
      width={280}
      height={84}
      className={`${WORDMARK_HEIGHT[size]} w-auto ${WORDMARK_MAX_WIDTH[size]} sm:max-w-none object-contain object-left ${
        variant === "onDark" ? onDarkTone : lightDarkModeTone
      } ${className}`}
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

const AVATAR_BOX = {
  xs: "h-7 w-7",
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const AVATAR_MARK = {
  xs: "sm",
  sm: "md",
  md: "lg",
  lg: "xl",
};

/** P mark on royal circle — SVG stays transparent, no white tile */
export function PriMarkAvatar({ size = "sm", className = "" }) {
  return (
    <div
      className={`${AVATAR_BOX[size] || AVATAR_BOX.sm} rounded-full bg-royal flex items-center justify-center shrink-0 ${className}`}
      aria-hidden
    >
      <BrandLogo mark size={AVATAR_MARK[size] || "sm"} variant="onDark" />
    </div>
  );
}
