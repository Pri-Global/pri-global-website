import { redirect } from "../../_employee-auth.js";
import { getRipplingAuthorizeUrl, isRipplingConfigured } from "../../_rippling-api.js";
import { getServerEnv } from "../../_runtime-env.js";
import { methodNotAllowed } from "../../_http.js";

/** GET /api/employee/rippling/connect — admin starts Rippling OAuth (once per company). */
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const env = getServerEnv();
  if (!isRipplingConfigured(env)) {
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Rippling is not configured. Add RIPPLING_* variables to .env." }));
    return;
  }

  redirect(res, getRipplingAuthorizeUrl(env));
}
