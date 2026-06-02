const illustrations = {
  tech:       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  talent:     "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  ai:         "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  consulting: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  cloud:      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  security:   "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80",
};

export default function IllustrationPlaceholder({ type = "tech", className = "", alt = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-[var(--bg-card)] ${className}`}>
      <img
        src={illustrations[type]}
        alt={alt || type}
        className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
        loading="lazy"
        decoding="async"
        onLoad={(e) => { e.target.style.opacity = 1; }}
      />
    </div>
  );
}
