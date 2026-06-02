import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink   = motion(Link);
const MotionAnchor = motion.a;
const MotionButton = motion.button;

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-royal disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:   "bg-royal text-white hover:bg-[var(--accent-hover)] shadow-sm shadow-royal/20",
  secondary: "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border-subtle)]",
  ghost:     "bg-transparent text-[var(--text-primary)] hover:bg-[var(--border-subtle)]",
  dark:      "bg-navy text-white hover:bg-navy/90 dark:bg-white dark:text-navy dark:hover:bg-white/90",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const tapSpring = { type: "spring", stiffness: 400, damping: 17 };

const Button = forwardRef(function Button(
  { children, variant = "primary", size = "md", to, href, className = "", ...props },
  ref
) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const motionProps = {
    whileHover: { scale: 1.025 },
    whileTap:   { scale: 0.965 },
    transition: tapSpring,
  };

  if (to) {
    return (
      <MotionLink ref={ref} to={to} className={classes} {...motionProps} {...props}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <MotionAnchor ref={ref} href={href} className={classes} {...motionProps} {...props}>
        {children}
      </MotionAnchor>
    );
  }

  return (
    <MotionButton ref={ref} className={classes} {...motionProps} {...props}>
      {children}
    </MotionButton>
  );
});

export default Button;
