import { fetchLiveJobs, isJobdivaConfigured } from "./_jobdiva-v2.js";
import { methodNotAllowed, sendJson } from "./_http.js";
import { handleLeadSubmission } from "./_leads.js";

/** GET /api/jobs — live openings. POST /api/leads (rewritten here as ?route=leads) — lead capture. */
export default async function handler(req, res) {
  if (req.query?.route === "leads") {
    if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
    return handleLeadSubmission(req, res);
  }

  if (req.method !== "GET") {
    return methodNotAllowed(res, ["GET"]);
  }

  if (!isJobdivaConfigured()) {
    return sendJson(res, 503, { error: "Job listings are not configured." });
  }

  try {
    const keyword = req.query?.keyword ?? "";
    const count = Math.min(Number(req.query?.count) || 100, 200);
    const result = await fetchLiveJobs({ keyword, count });
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return sendJson(res, 200, result);
  } catch (err) {
    console.error("Jobs API error:", err?.code || err?.message, err?.detail || "");
    return sendJson(res, 502, { error: "Unable to load job listings." });
  }
}
