const LEGACY_POSTERS = {
  "hero-network-poster": "/news/hero-network-poster.svg",
};

export function getNewsThumbnail(item) {
  if (!item) return null;

  if (item.image) {
    return {
      src: item.image,
      fit: item.imageFit || "cover",
      alt: item.imageAlt || item.title,
    };
  }

  if (item.posterImage && LEGACY_POSTERS[item.posterImage]) {
    return {
      src: LEGACY_POSTERS[item.posterImage],
      fit: "cover",
      alt: item.title,
    };
  }

  return null;
}
