import { isMicrosoftConfigured } from "../../_employee-auth.js";
import { isRipplingConfigured, isRipplingConnected, getRipplingTokens } from "../../_rippling-api.js";
import { sendJson, methodNotAllowed } from "../../_http.js";
import { getServerEnv } from "../../_runtime-env.js";

/** GET /api/employee/auth/status — public config flags for login UI. */
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const env = getServerEnv();
  const rippling = getRipplingTokens(env);

  sendJson(res, 200, {
    microsoftConfigured: isMicrosoftConfigured(env),
    ripplingConfigured: isRipplingConfigured(env),
    ripplingConnected: isRipplingConnected(env),
    ripplingCompany: rippling?.companyName || null,
  });
}
