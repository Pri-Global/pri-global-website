import {
  createEmployeeSessionToken,
  isEmailDomainAllowed,
  redirectToEmployeeCallback,
  redirectToEmployeeLogin,
  verifyOAuthState,
} from "../../../_employee-auth.js";
import { exchangeMicrosoftCode, fetchMicrosoftProfile } from "../../../_microsoft-graph.js";
import { getServerEnv } from "../../../_runtime-env.js";

/** GET /api/employee/auth/microsoft/callback — OAuth callback from Microsoft. */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method not allowed");
    return;
  }

  const env = getServerEnv();
  const url = new URL(req.url, "http://localhost");
  const error = url.searchParams.get("error_description") || url.searchParams.get("error");
  if (error) {
    redirectToEmployeeLogin(res, env, { error: "Microsoft sign-in was cancelled or failed." });
    return;
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state || !verifyOAuthState(state, env)) {
    redirectToEmployeeLogin(res, env, { error: "Invalid sign-in session. Please try again." });
    return;
  }

  try {
    const tokens = await exchangeMicrosoftCode(code, env);
    const profile = await fetchMicrosoftProfile(tokens.access_token);

    if (!profile.email) {
      redirectToEmployeeLogin(res, env, { error: "Microsoft account has no work email." });
      return;
    }

    if (!isEmailDomainAllowed(profile.email, env)) {
      redirectToEmployeeLogin(res, env, { error: "This email domain is not allowed for the employee portal." });
      return;
    }

    const sessionToken = createEmployeeSessionToken(profile, env);
    redirectToEmployeeCallback(res, env, {
      token: sessionToken,
      email: profile.email,
      name: profile.name,
      jobTitle: profile.jobTitle,
    });
  } catch (err) {
    console.error("Microsoft OAuth callback error:", err?.code || err?.message);
    redirectToEmployeeLogin(res, env, { error: "Unable to complete Microsoft sign-in." });
  }
}
