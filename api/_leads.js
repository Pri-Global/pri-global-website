import { readJsonBody, sendJson, handleApiError } from "./_http.js";

const leads = [];

export async function handleLeadSubmission(req, res) {
  try {
    const body = await readJsonBody(req);
    const { to, subject, body: messageBody, source, fields, honeypot } = body || {};

    if (honeypot) {
      return sendJson(res, 200, { ok: true, id: "ignored" });
    }

    if (!to || !subject || !messageBody) {
      return sendJson(res, 400, { error: "Missing required lead fields." });
    }

    const entry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      to,
      subject: String(subject).slice(0, 200),
      body: String(messageBody).slice(0, 8000),
      source: String(source || "website").slice(0, 80),
      fields: fields && typeof fields === "object" ? fields : {},
      receivedAt: new Date().toISOString(),
    };

    leads.unshift(entry);
    if (leads.length > 100) leads.length = 100;

    console.info("[lead]", JSON.stringify(entry));

    return sendJson(res, 201, { ok: true, id: entry.id });
  } catch (err) {
    return handleApiError(res, err, "Lead submission failed.");
  }
}
