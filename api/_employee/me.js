import { requireEmployeeSession } from "../_employee-auth.js";
import { sendJson, handleApiError, methodNotAllowed } from "../_http.js";

/** GET /api/employee/me — signed-in employee profile from session token. */
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);
  try {
    const session = requireEmployeeSession(req);
    sendJson(res, 200, {
      profile: {
        email: session.email,
        name: session.name,
        jobTitle: session.jobTitle || "",
        microsoftId: session.microsoftId || null,
      },
    });
  } catch (err) {
    handleApiError(res, err, "Unable to load employee profile.");
  }
}
