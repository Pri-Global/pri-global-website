import priMarkSvg from "../../assets/logo/PRI.svg";

const sizes = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  hero: "text-2xl sm:text-3xl",
};

const markMaskStyle = {
  WebkitMaskImage: `url(${priMarkSvg})`,
  maskImage: `url(${priMarkSvg})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskPosition: "left center",
  maskPosition: "left center",
};

function GradientPriMark({ className = "" }) {
  return (
    <span
      className={`inline-flex h-[0.92em] w-[0.92em] shrink-0 items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      <span
        className="h-full w-[200%] max-w-none shrink-0 bg-gradient-to-r from-[#2B6FD4] to-[#D91E5A]"
        style={markMaskStyle}
      />
    </span>
  );
}

/** PRI Jobs wordmark — gradient P mark + gradient "Jobs", aligned to one cap-height. */
export default function PriJobsMark({
  size = "md",
  variant = "default",
  className = "",
}) {
  const textSize = sizes[size] || sizes.md;

  return (
    <div
      className={`inline-flex items-center gap-[0.28em] leading-none ${textSize} ${className}`}
    >
      <GradientPriMark />
      <span className="font-heading font-bold bg-gradient-to-r from-[#2B6FD4] to-[#D91E5A] bg-clip-text text-transparent">
        Jobs
      </span>
    </div>
  );
}
