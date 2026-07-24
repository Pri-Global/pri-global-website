const LEADS_STORAGE_KEY = "pri-global-leads";
const MIN_SUBMIT_INTERVAL_MS = 8000;
let lastSubmitAt = 0;

function saveLeadLocally(entry) {
  try {
    const existing = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || "[]");
    existing.unshift(entry);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
  } catch {
    /* private mode */
  }
}

function downloadLead(entry) {
  const blob = new Blob([JSON.stringify(entry, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `pri-global-lead-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function postLeadToApi(payload) {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return { ok: true, id: data.id };
  } catch {
    return { ok: false };
  }
}

/**
 * Validates, stores locally, posts to /api/leads when available, and opens mailto fallback.
 */
export async function submitLead({
  to,
  subject,
  body,
  source = "website",
  fields = {},
  honeypot = "",
}) {
  if (honeypot) {
    return { ok: true, copied: false, stored: false, skipped: true };
  }

  const now = Date.now();
  if (now - lastSubmitAt < MIN_SUBMIT_INTERVAL_MS) {
    return { ok: false, error: "Please wait a moment before submitting again." };
  }
  lastSubmitAt = now;

  const entry = {
    id: `lead_${now}`,
    to,
    subject,
    body,
    source,
    fields,
    submittedAt: new Date().toISOString(),
  };

  saveLeadLocally(entry);

  const apiResult = await postLeadToApi(entry);
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  let copied = false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      copied = true;
    }
  } catch {
    /* clipboard blocked */
  }

  window.location.href = mailto;

  return {
    ok: true,
    copied,
    stored: true,
    api: apiResult.ok,
    id: apiResult.id || entry.id,
  };
}

export { downloadLead, saveLeadLocally };

/** Backward-compatible wrapper */
export async function submitLeadEmail({ to, subject, body, honeypot = "" }) {
  return submitLead({ to, subject, body, honeypot });
}
