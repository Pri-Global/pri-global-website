import register from "../_candidate/register.js";
import login from "../_candidate/login.js";
import profile from "../_candidate/profile.js";
import applications from "../_candidate/applications.js";
import apply from "../_candidate/apply.js";
import dashboard from "../_candidate/dashboard.js";
import { sendJson } from "../_http.js";

const routes = {
  register,
  login,
  profile,
  applications,
  apply,
  dashboard,
};

/** Single Vercel function for all /api/candidate/* routes (Hobby plan limit). */
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
    console.error(`Candidate API /${pathKey} error:`, err?.message);
    if (!res.headersSent) {
      return sendJson(res, 502, { error: "Request failed." });
    }
  }
}
