import { videoMimeType } from "./videoMime.js";

/**
 * Browser-friendly <source> list: MP4 (H.264) first, QuickTime .mov as Safari fallback.
 * @param {string} src — primary path from VIDEOS (may be .mp4 or .mov)
 * @returns {{ src: string, type: string }[]}
 */
export function getVideoSources(src) {
  if (!src) return [];

  const base = src.split("?")[0];
  const lower = base.toLowerCase();

  if (lower.endsWith(".mp4")) {
    return [{ src: base, type: "video/mp4" }];
  }

  if (lower.endsWith(".mov")) {
    const mp4 = base.replace(/\.mov$/i, ".mp4");
    return [
      { src: mp4, type: "video/mp4" },
      { src: base, type: "video/quicktime" },
    ];
  }

  if (lower.endsWith(".webm")) {
    return [{ src: base, type: "video/webm" }];
  }

  return [{ src: base, type: videoMimeType(base) }];
}

/** Hero background — short H.264 loop (all major browsers). */
export const HERO_BACKGROUND_SOURCES = [
  { src: "/videos/PRI-Branding-hero.mp4", type: "video/mp4" },
  { src: "/videos/PRI-Branding-Video_4.13.20-480p.mov", type: "video/quicktime" },
];
