import employeeMe from "../_employee/me.js";
import employeeTeams from "../_employee/teams.js";
import employeeMicrosoftAuth from "../_employee/auth/microsoft.js";
import employeeMicrosoftCallback from "../_employee/auth/microsoft/callback.js";
import employeeRipplingAuth from "../_employee/auth/rippling.js";
import employeeAuthStatus from "../_employee/auth/status.js";
import employeeRipplingConnect from "../_employee/rippling/connect.js";
import employeeRipplingCallback from "../_employee/rippling/callback.js";
import { sendJson } from "../_http.js";

const routes = {
  me: employeeMe,
  teams: employeeTeams,
  "auth/microsoft": employeeMicrosoftAuth,
  "auth/microsoft/callback": employeeMicrosoftCallback,
  "auth/rippling": employeeRipplingAuth,
  "auth/status": employeeAuthStatus,
  "rippling/connect": employeeRipplingConnect,
  "rippling/callback": employeeRipplingCallback,
};

/** Single Vercel function for all /api/employee/* routes (Hobby plan limit). */
export default async function handler(req, res) {
  const segments = req.query.path;
  const pathKey = Array.isArray(segments) ? segments.join("/") : String(segments || "");
  const routeHandler = routes[pathKey];

  if (!routeHandler) {
    return sendJson(res, 404, { error: "Not found." });
  }

  try {
    await routeHandler(req, res);
  } catch (err) {
    console.error(`Employee API /${pathKey} error:`, err?.message);
    if (!res.headersSent) {
      return sendJson(res, 502, { error: "Request failed." });
    }
  }
}
