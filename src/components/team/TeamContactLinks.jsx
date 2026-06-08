import { Phone, Mail } from "lucide-react";
import AnimatedIcon from "../ui/AnimatedIcon";
import LinkedInIcon from "./LinkedInIcon";

/** Shared contact row for leadership cards (PRI + PR1SM themes) */
export default function TeamContactLinks({
  member,
  theme = "pri",
  className = "",
}) {
  const hasAny = member.phone || member.email || member.linkedin;
  if (!hasAny) return null;

  const isPrism = theme === "prism";
  const linkClass = isPrism
    ? "group inline-flex items-center gap-2 text-sm text-[#4169E1] hover:text-white transition-colors"
    : "group inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-royal dark:hover:text-royaldark transition-colors";
  const iconBtnClass = isPrism
    ? "p-2 rounded-lg bg-[#0D1B3E] text-[#4169E1] hover:text-white transition-colors"
    : "p-2 rounded-lg bg-royal/10 text-royal hover:bg-royal/20 transition-colors";

  if (isPrism && !member.phone && !member.email && member.linkedin) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtnClass}
          aria-label={`${member.name} on LinkedIn`}
        >
          <LinkedInIcon size={14} />
        </a>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        isPrism ? "gap-2" : "gap-4"
      } ${className}`}
    >
      {member.phone && (
        <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
          <AnimatedIcon Icon={Phone} size={isPrism ? 14 : 15} className={isPrism ? "" : "text-royal"} />
          {!isPrism && member.phone}
        </a>
      )}
      {member.email && (
        <a href={`mailto:${member.email}`} className={linkClass}>
          <AnimatedIcon Icon={Mail} size={isPrism ? 14 : 15} className={isPrism ? "" : "text-royal"} />
          {!isPrism && member.email}
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={isPrism ? iconBtnClass : linkClass}
          aria-label={`${member.name} on LinkedIn`}
          title="LinkedIn"
        >
          <LinkedInIcon size={isPrism ? 14 : 15} />
          {!isPrism && <span>LinkedIn</span>}
        </a>
      )}
    </div>
  );
}
