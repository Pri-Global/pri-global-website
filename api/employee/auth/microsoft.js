import {
  createOAuthState,
  isMicrosoftConfigured,
  redirect,
  redirectToEmployeeLogin,
} from "../../_employee-auth.js";
import { getMicrosoftAuthorizeUrl } from "../../_microsoft-graph.js";
import { getServerEnv } from "../../_runtime-env.js";
import { methodNotAllowed } from "../../_http.js";

/** GET /api/employee/auth/microsoft — start Microsoft 365 SSO. */
export default async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const env = getServerEnv();
  if (!isMicrosoftConfigured(env)) {
    redirectToEmployeeLogin(res, env, { error: "Microsoft login is not configured yet." });
    return;
  }

  const state = createOAuthState(env);
  redirect(res, getMicrosoftAuthorizeUrl(state, env));
}
