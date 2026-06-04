import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { INITIALS_COLORS, PRISM_INITIALS_COLORS } from "../../data/team";

/**
 * @param {"circle" | "rounded" | "portrait"} shape
 * @param {"pri" | "prism"} theme
 */
export default function TeamPhoto({
  member,
  size = 120,
  shape = "rounded",
  theme = "pri",
  fill = false,
  className = "",
}) {
  const sources = useMemo(
    () => [member.photoUrl, member.photo].filter(Boolean),
    [member.photoUrl, member.photo]
  );
  const [sourceIndex, setSourceIndex] = useState(0);
  const showInitials = sourceIndex >= sources.length;
  const palette = theme === "prism" ? PRISM_INITIALS_COLORS : INITIALS_COLORS;
  const bg = palette[member.initials] || "#1A56DB";

  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "portrait"
        ? "rounded-2xl aspect-[4/5]"
        : "rounded-xl aspect-square";

  const w = shape === "portrait" && !fill ? undefined : size;
  const style = fill
    ? undefined
    : shape === "portrait"
      ? { width: size, maxWidth: "100%" }
      : { width: w, height: w };

  const noRing = className.includes("ring-0");

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`overflow-hidden ${fill ? "w-full h-full" : "shrink-0"} ${shapeClass} ${
        noRing
          ? ""
          : theme === "prism"
            ? "ring-2 ring-[#1A56DB]/60"
            : "ring-2 ring-royal/20"
      } ${className}`}
      style={style}
    >
      {!showInitials ? (
        <img
          src={sources[sourceIndex]}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          onError={() => setSourceIndex((i) => i + 1)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="w-full h-full min-h-[120px] flex items-center justify-center font-heading font-bold text-white"
          style={{ backgroundColor: bg, fontSize: Math.max(18, size * 0.22) }}
        >
          {member.initials}
        </div>
      )}
    </motion.div>
  );
}
