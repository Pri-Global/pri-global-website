import crypto from "crypto";
import { getServerEnv } from "./_runtime-env.js";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

export function getEmployeeSessionSecret(env = getServerEnv()) {
  const secret =
    env.EMPLOYEE_SESSION_SECRET?.trim() ||
    env.JOBDIVA_SESSION_SECRET?.trim() ||
    env.MICROSOFT_CLIENT_SECRET?.trim();
  if (!secret) {
    const err = new Error("Employee session secret is not configured.");
    err.code = "NO_SESSION_SECRET";
    throw err;
  }
  return secret;
}

export function getSiteOrigin(env = getServerEnv()) {
  const configured = env.SITE_URL?.trim() || env.VITE_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3333";
}

export function getMicrosoftRedirectUri(env = getServerEnv()) {
  return `${getSiteOrigin(env)}/api/employee/auth/microsoft/callback`;
}

export function getMicrosoftConfig(env = getServerEnv()) {
  const clientId = env.MICROSOFT_CLIENT_ID?.trim();
  const clientSecret = env.MICROSOFT_CLIENT_SECRET?.trim();
  const tenantId = env.MICROSOFT_TENANT_ID?.trim() || "common";

  if (!clientId || !clientSecret) {
    const err = new Error("Microsoft login is not configured.");
    err.code = "NO_MICROSOFT_CONFIG";
    throw err;
  }

  return { clientId, clientSecret, tenantId };
}

export function isMicrosoftConfigured(env = getServerEnv()) {
  try {
    getMicrosoftConfig(env);
    return true;
  } catch {
    return false;
  }
}

export function getAllowedEmailDomains(env = getServerEnv()) {
  const raw = env.EMPLOYEE_ALLOWED_EMAIL_DOMAINS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailDomainAllowed(email, env = getServerEnv()) {
  const domains = getAllowedEmailDomains(env);
  if (domains.length === 0) return true;
  const domain = String(email || "").split("@")[1]?.toLowerCase();
  return Boolean(domain && domains.includes(domain));
}

function signPayload(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifySignedPayload(token, secret) {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function createOAuthState(env = getServerEnv()) {
  return signPayload({ nonce: crypto.randomBytes(16).toString("hex"), exp: Date.now() + OAUTH_STATE_TTL_MS }, getEmployeeSessionSecret(env));
}

export function verifyOAuthState(state, env = getServerEnv()) {
  const payload = verifySignedPayload(state, getEmployeeSessionSecret(env));
  if (!payload?.exp || payload.exp < Date.now()) return false;
  return true;
}

export function createEmployeeSessionToken(
  { email, name, microsoftId, ripplingEmployeeId, jobTitle, authProvider = "microsoft" },
  env = getServerEnv()
) {
  const payload = {
    email: email.toLowerCase(),
    name: name || email,
    microsoftId: microsoftId || null,
    ripplingEmployeeId: ripplingEmployeeId || null,
    authProvider,
    jobTitle: jobTitle || "",
    exp: Date.now() + SESSION_TTL_MS,
  };
  return signPayload(payload, getEmployeeSessionSecret(env));
}

export function verifyEmployeeSessionToken(token, env = getServerEnv()) {
  const payload = verifySignedPayload(token, getEmployeeSessionSecret(env));
  if (!payload?.email || !payload?.exp || payload.exp < Date.now()) return null;
  return payload;
}

export function getBearerToken(req) {
  const header = req.headers?.authorization || req.headers?.Authorization || "";
  const match = String(header).match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export function requireEmployeeSession(req, env = getServerEnv()) {
  const token = getBearerToken(req);
  const session = verifyEmployeeSessionToken(token, env);
  if (!session) {
    const err = new Error("Unauthorized");
    err.code = "UNAUTHORIZED";
    err.status = 401;
    throw err;
  }
  return session;
}

export function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader("Location", location);
  res.end();
}

export function redirectToEmployeeLogin(res, env, { error } = {}) {
  const origin = getSiteOrigin(env);
  const params = new URLSearchParams();
  if (error) params.set("error", error);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  redirect(res, `${origin}/employee-login${suffix}`);
}

export function redirectToEmployeeCallback(res, env, { token, email, name, jobTitle }) {
  const origin = getSiteOrigin(env);
  const params = new URLSearchParams({
    token,
    email,
    name: name || email,
  });
  if (jobTitle) params.set("jobTitle", jobTitle);
  redirect(res, `${origin}/employee-auth-callback?${params.toString()}`);
}
