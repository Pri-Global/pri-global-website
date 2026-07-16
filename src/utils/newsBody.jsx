/** Simple markdown-style body: **bold**, line breaks, bullet lines, callout paragraphs */
export function renderNewsBody(body) {
  if (!body) return null;
  const paragraphs = body.trim().split(/\n\n+/);
  return paragraphs.map((para, pi) => {
    const lines = para.split("\n");
    const trimmedLines = lines.map((l) => l.trim()).filter(Boolean);
    const isList = trimmedLines.every((l) => l.startsWith("- ") || l.startsWith("• "));
    const isCallout =
      trimmedLines.length === 1 &&
      trimmedLines[0].startsWith("**") &&
      trimmedLines[0].endsWith("**");

    if (isCallout) {
      const text = trimmedLines[0].slice(2, -2);
      return (
        <blockquote
          key={pi}
          className="my-8 border-l-4 border-royal dark:border-royaldark pl-5 md:pl-6 py-1"
        >
          <p className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-snug">
            {text}
          </p>
        </blockquote>
      );
    }

    if (isList) {
      return (
        <ul key={pi} className="my-7 space-y-2.5 pl-1">
          {trimmedLines.map((line, li) => (
            <li
              key={li}
              className="flex gap-3 text-[1.05rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-relaxed"
            >
              <span className="text-royal dark:text-royaldark font-bold shrink-0 mt-0.5" aria-hidden>
                —
              </span>
              <span>{formatInline(line.replace(/^[-•]\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={pi}
        className="text-[1.05rem] md:text-[1.125rem] text-[var(--text-secondary)] leading-[1.8] mb-6 last:mb-0"
      >
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {formatInline(line)}
          </span>
        ))}
      </p>
    );
  });
}

function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function estimateReadMinutes(body) {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
