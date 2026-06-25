import { requireEmployeeSession } from "../_employee-auth.js";
import { sendJson, handleApiError, methodNotAllowed } from "../_http.js";

/**
 * GET /api/employee/teams
 * Placeholder until Rippling + persisted Microsoft tokens are wired.
 * Returns empty list for now; SSO session is active.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  try {
    requireEmployeeSession(req);
    sendJson(res, 200, { teams: [], note: "Teams channel sync requires stored Microsoft refresh tokens (Phase 2)." });
  } catch (err) {
    handleApiError(res, err, "Unable to load Teams data.");
  }
}
