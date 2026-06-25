import { requireCandidateSession } from "../_candidate-auth.js";
import { getDashboardData } from "../_candidate-service.js";
import { sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  try {
    const session = requireCandidateSession(req);
    const url = new URL(req.url, "http://localhost");
    const savedRaw = url.searchParams.get("savedJobIds") || "";
    const savedJobIds = savedRaw
      .split(",")
      .map((id) => Number(id))
      .filter(Boolean);

    const data = await getDashboardData(session.candidateId, savedJobIds, session.email);
    sendJson(res, 200, data);
  } catch (err) {
    handleApiError(res, err, "Unable to load dashboard.");
  }
}
