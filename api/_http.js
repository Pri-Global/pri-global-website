export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

export function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function methodNotAllowed(res, methods = ["GET"]) {
  res.setHeader("Allow", methods.join(", "));
  sendJson(res, 405, { error: "Method not allowed" });
}

export function handleApiError(res, err, fallback = "Request failed.") {
  const status = err?.status || (err?.code === "UNAUTHORIZED" ? 401 : 502);
  const message =
    err?.code === "UNAUTHORIZED"
      ? "Please sign in again."
      : err?.code === "NO_JOBDIVA_CONFIG"
        ? "Candidate portal is not configured."
        : err?.code === "EMAIL_EXISTS"
          ? "An account with this email already exists. Please sign in."
          : err?.code === "INVALID_CREDENTIALS"
            ? "Email or password incorrect."
            : err?.code === "NOT_FOUND"
              ? "Candidate profile not found."
              : err?.message || fallback;

  if (status >= 500) console.error("API error:", err?.code || err?.message, err?.detail || "");
  sendJson(res, status, { error: message });
}
