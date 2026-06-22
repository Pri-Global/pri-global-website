/**
 * Opens mailto for lead capture and copies the body to clipboard as a fallback
 * when no mail client is available (common on mobile).
 */
export async function submitLeadEmail({ to, subject, body }) {
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  let copied = false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      copied = true;
    }
  } catch {
    /* clipboard may be blocked */
  }

  window.location.href = mailto;

  return { copied };
}
