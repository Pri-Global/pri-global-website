export default function SectionHeading({
  label,
  heading,
  subheading,
  align = "center",
  className = "",
  light = false,
}) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {label && (
        <span
          className={`inline-block text-xs font-semibold tracking-widest uppercase mb-3 ${
            light ? "text-royal/80" : "text-royal"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold leading-tight mb-4 ${
          light ? "text-white" : "text-[var(--text-primary)]"
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-[var(--text-secondary)]"
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
