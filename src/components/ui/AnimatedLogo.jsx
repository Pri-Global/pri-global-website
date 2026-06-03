/**
 * AnimatedLogo — left-to-right reveal on hover (AWS, Azure, Databricks).
 */
const BLUE_FILTER =
  "brightness(0) saturate(100%) invert(22%) sepia(98%) saturate(1152%) hue-rotate(215deg) brightness(101%) contrast(96%)";

export default function AnimatedLogo({
  src,
  alt,
  className = "h-10 w-auto object-contain",
  style,
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`logo-wipe-lr ${className}`}
      style={{ filter: style?.filter ?? BLUE_FILTER, ...style }}
      loading="lazy"
      decoding="async"
    />
  );
}
