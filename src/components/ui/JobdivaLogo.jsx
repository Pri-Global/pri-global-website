import jobdivaLogo from "../../assets/logo/jobdiva-logo.png";

const HEIGHT = {
  sm: "h-7",
  md: "h-9",
  lg: "h-12",
  xl: "h-16",
  hero: "h-20 sm:h-24 md:h-28",
};

/** JobDiva wordmark — transparent PNG, best on dark backgrounds. */
export default function JobdivaLogo({ size = "md", className = "" }) {
  return (
    <img
      src={jobdivaLogo}
      alt="JobDiva"
      width={280}
      height={80}
      className={`${HEIGHT[size] || HEIGHT.md} w-auto object-contain ${className}`}
      decoding="async"
    />
  );
}
