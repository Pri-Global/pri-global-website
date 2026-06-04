/** MIME type for video source element from file extension */
export function videoMimeType(src) {
  if (!src) return "video/mp4";
  const lower = src.split("?")[0].toLowerCase();
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".webm")) return "video/webm";
  return "video/mp4";
}
