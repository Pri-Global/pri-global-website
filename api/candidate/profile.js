import { requireCandidateSession } from "../_candidate-auth.js";
import { loadCandidateProfile, saveCandidateProfile } from "../_candidate-service.js";
import { readJsonBody, sendJson, handleApiError, methodNotAllowed } from "../_http.js";

export default async function handler(req, res) {
  try {
    const session = requireCandidateSession(req);

    if (req.method === "GET") {
      const profile = await loadCandidateProfile(session.candidateId, session.email);
      sendJson(res, 200, { profile });
      return;
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const body = await readJsonBody(req);
      const profile = await saveCandidateProfile(session.candidateId, {
        ...body,
        email: body.email || session.email,
      });
      sendJson(res, 200, { profile });
      return;
    }

    methodNotAllowed(res, ["GET", "PUT", "PATCH"]);
  } catch (err) {
    handleApiError(res, err, "Unable to load profile.");
  }
}
