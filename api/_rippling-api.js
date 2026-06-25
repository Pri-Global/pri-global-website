import { getServerEnv } from "./_runtime-env.js";
import { getRipplingTokens, saveRipplingTokens, isRipplingConnected } from "./_rippling-store.js";
import { getSiteOrigin } from "./_employee-auth.js";

export { getRipplingTokens, saveRipplingTokens, isRipplingConnected };

const TOKEN_URL = "https://api.rippling.com/api/o/token/";
const API_BASE = "https://api.rippling.com/platform/api";

export function getRipplingConfig(env = getServerEnv()) {
  const clientId = env.RIPPLING_CLIENT_ID?.trim();
  const clientSecret = env.RIPPLING_CLIENT_SECRET?.trim();
  const appName = env.RIPPLING_APP_NAME?.trim();

  if (!clientId || !clientSecret || !appName) {
    const err = new Error("Rippling is not configured.");
    err.code = "NO_RIPPLING_CONFIG";
    throw err;
  }

  return {
    clientId,
    clientSecret,
    appName,
    scopes:
      env.RIPPLING_SCOPES?.trim() ||
      "company employee:read employee:workEmail:read employee:name:read employee:title:read",
  };
}

export function isRipplingConfigured(env = getServerEnv()) {
  try {
    getRipplingConfig(env);
    return true;
  } catch {
    return false;
  }
}

export function getRipplingRedirectUri(env = getServerEnv()) {
  return `${getSiteOrigin(env)}/api/employee/rippling/callback`;
}

export function getRipplingAuthorizeUrl(env = getServerEnv()) {
  const { appName } = getRipplingConfig(env);
  return `https://app.rippling.com/apps/PLATFORM/${encodeURIComponent(appName)}/authorize`;
}

function basicAuthHeader(env = getServerEnv()) {
  const { clientId, clientSecret } = getRipplingConfig(env);
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

export async function exchangeRipplingCode(code, env = getServerEnv()) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getRipplingRedirectUri(env),
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(env),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.error_description || payload.error || "Rippling token exchange failed.");
    err.code = "RIPPLING_AUTH_FAILED";
    err.status = res.status;
    throw err;
  }
  return payload;
}

export async function refreshRipplingAccessToken(refreshToken, env = getServerEnv()) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(env),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.error_description || "Rippling token refresh failed.");
    err.code = "RIPPLING_AUTH_FAILED";
    throw err;
  }
  return payload;
}

async function ripplingFetch(path, accessToken, { method = "GET" } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.detail || payload.message || `Rippling API ${path} failed.`);
    err.code = "RIPPLING_API_FAILED";
    err.status = res.status;
    throw err;
  }
  return payload;
}

export async function fetchRipplingCompany(accessToken) {
  return ripplingFetch("/companies/current", accessToken);
}

export async function markRipplingAppInstalled(accessToken) {
  return ripplingFetch("/mark_app_installed", accessToken, { method: "POST" });
}

function normalizeEmployee(row = {}) {
  const email = (
    row.workEmail ||
    row.work_email ||
    row.email ||
    row.primaryEmail ||
    ""
  ).toLowerCase();
  const firstName = row.firstName || row.first_name || "";
  const lastName = row.lastName || row.last_name || "";
  const name =
    row.name ||
    row.displayName ||
    `${firstName} ${lastName}`.trim() ||
    email;

  return {
    id: row.id || row._id || row.employeeId,
    email,
    name,
    jobTitle: row.title || row.jobTitle || row.role || "",
    department: row.department || row.departmentName || "",
  };
}

export async function fetchRipplingEmployees(accessToken) {
  const employees = [];
  let offset = 0;
  const limit = 100;

  while (offset < 1000) {
    const payload = await ripplingFetch(`/employees?limit=${limit}&offset=${offset}`, accessToken);
    const batch = Array.isArray(payload) ? payload : payload.data || payload.results || [];
    if (!batch.length) break;
    employees.push(...batch.map(normalizeEmployee).filter((row) => row.email));
    if (batch.length < limit) break;
    offset += limit;
  }

  return employees;
}

export async function getRipplingAccessToken(env = getServerEnv()) {
  const stored = getRipplingTokens(env);
  if (!stored?.accessToken) {
    const err = new Error("Rippling is not connected yet.");
    err.code = "RIPPLING_NOT_CONNECTED";
    err.status = 503;
    throw err;
  }

  if (stored.expiresAt && stored.expiresAt > Date.now() + 60_000) {
    return stored.accessToken;
  }

  if (!stored.refreshToken) {
    return stored.accessToken;
  }

  const refreshed = await refreshRipplingAccessToken(stored.refreshToken, env);
  const next = saveRipplingTokens(
    {
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token || stored.refreshToken,
      expiresAt: Date.now() + (refreshed.expires_in || 129600) * 1000,
      scope: refreshed.scope || stored.scope,
      companyId: stored.companyId,
      companyName: stored.companyName,
    },
    env
  );
  return next.accessToken;
}

export async function findRipplingEmployeeByEmail(email, env = getServerEnv()) {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) return null;

  const accessToken = await getRipplingAccessToken(env);
  const employees = await fetchRipplingEmployees(accessToken);
  return employees.find((row) => row.email === normalized) || null;
}

export async function connectRipplingFromCode(code, env = getServerEnv()) {
  const tokens = await exchangeRipplingCode(code, env);
  const accessToken = tokens.access_token;
  const company = await fetchRipplingCompany(accessToken, env).catch(() => null);

  await markRipplingAppInstalled(accessToken, env).catch(() => null);

  return saveRipplingTokens(
    {
      accessToken,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + (tokens.expires_in || 129600) * 1000,
      scope: tokens.scope,
      companyId: company?.id || null,
      companyName: company?.name || null,
    },
    env
  );
}
