/** Simple markdown-style body: **bold**, line breaks, bullet lines */
export function renderNewsBody(body) {
  if (!body) return null;
  const paragraphs = body.trim().split(/\n\n+/);
  return paragraphs.map((para, pi) => {
    const lines = para.split("\n");
    const isList = lines.every((l) => l.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={pi} className="list-disc pl-5 space-y-1 my-4 text-[var(--text-secondary)]">
          {lines.map((line, li) => (
            <li key={li}>{formatInline(line.replace(/^-\s*/, ""))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={pi} className="text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0">
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
