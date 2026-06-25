import { getSiteOrigin, redirect } from "../../_employee-auth.js";
import { connectRipplingFromCode, isRipplingConfigured } from "../../_rippling-api.js";
import { getServerEnv } from "../../_runtime-env.js";

/** GET /api/employee/rippling/callback — Rippling OAuth callback after admin install. */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method not allowed");
    return;
  }

  const env = getServerEnv();
  const origin = getSiteOrigin(env);
  const url = new URL(req.url, "http://localhost");
  const error = url.searchParams.get("error_description") || url.searchParams.get("error");
  const code = url.searchParams.get("code");

  if (error || !isRipplingConfigured(env)) {
    redirect(res, `${origin}/employee-login?error=${encodeURIComponent("Rippling connection failed.")}`);
    return;
  }

  if (!code) {
    redirect(res, `${origin}/employee-login?error=${encodeURIComponent("Missing Rippling authorization code.")}`);
    return;
  }

  try {
    const stored = await connectRipplingFromCode(code, env);
    const params = new URLSearchParams({
      rippling: "connected",
      company: stored.companyName || "PRI Global",
    });
    redirect(res, `${origin}/employee-login?${params.toString()}`);
  } catch (err) {
    console.error("Rippling callback error:", err?.code || err?.message);
    redirect(res, `${origin}/employee-login?error=${encodeURIComponent("Unable to connect Rippling.")}`);
  }
}
