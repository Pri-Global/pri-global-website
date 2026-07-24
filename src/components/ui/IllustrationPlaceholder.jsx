const illustrations = {
  tech: "/images/offices/new-office-1.jpg",
  talent: "/images/offices/8M1A3994.jpg",
  ai: "/images/offices/new-office-6.jpg",
  consulting: "/images/offices/new-office-7.jpg",
  cloud: "/images/offices/new-office-8.jpg",
  security: "/images/offices/new-office-9.jpg",
};

export default function IllustrationPlaceholder({ type = "tech", className = "", alt = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-[var(--bg-card)] ${className}`}>
      <img
        src={illustrations[type] || illustrations.tech}
        alt={alt || type}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
