import { requireCandidateSession } from "../_candidate-auth.js";
import { submitCandidateApplication } from "../_candidate-service.js";
import { readJsonBody, sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);
  try {
    const session = requireCandidateSession(req);
    const body = await readJsonBody(req);
    const result = await submitCandidateApplication(session.candidateId, body);
    sendJson(res, 201, { ok: true, result });
  } catch (err) {
    handleApiError(res, err, "Unable to submit application.");
  }
}
