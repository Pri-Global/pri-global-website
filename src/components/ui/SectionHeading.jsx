export default function SectionHeading({
  label,
  heading,
  subheading,
  align = "center",
  className = "",
  light = false,
  as = "h2",
}) {
  const HeadingTag = as;
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-2xl xl:max-w-3xl 2xl:max-w-4xl ${alignClass} ${className}`}>
      {label && (
        <span
          className={`inline-block text-xs xl:text-sm font-semibold tracking-widest uppercase mb-3 xl:mb-4 ${
            light ? "text-royal/80" : "text-royal"
          }`}
        >
          {label}
        </span>
      )}
      <HeadingTag
        className={`font-heading text-3xl md:text-4xl xl:text-5xl 2xl:text-[3.25rem] font-bold leading-tight mb-4 xl:mb-5 ${
          light ? "text-white" : "text-[var(--text-primary)]"
        }`}
      >
        {heading}
      </HeadingTag>
      {subheading && (
        <p
          className={`text-base md:text-lg xl:text-xl leading-relaxed ${
            light ? "text-white/70" : "text-[var(--text-secondary)]"
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
