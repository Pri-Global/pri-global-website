import { requireCandidateSession } from "../_candidate-auth.js";
import { listCandidateApplications } from "../_candidate-service.js";
import { sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  try {
    const session = requireCandidateSession(req);
    const applications = await listCandidateApplications(session.candidateId);
    sendJson(res, 200, { applications });
  } catch (err) {
    handleApiError(res, err, "Unable to load applications.");
  }
}
