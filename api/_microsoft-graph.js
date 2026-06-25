import {
  getMicrosoftConfig,
  getMicrosoftRedirectUri,
  getSiteOrigin,
} from "./_employee-auth.js";
import { getServerEnv } from "./_runtime-env.js";

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const SCOPES = ["openid", "profile", "email", "offline_access", "User.Read", "Team.ReadBasic.All"];

export function getMicrosoftAuthorizeUrl(state, env = getServerEnv()) {
  const { clientId, tenantId } = getMicrosoftConfig(env);
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: getMicrosoftRedirectUri(env),
    response_mode: "query",
    scope: SCOPES.join(" "),
    state,
  });
  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params.toString()}`;
}

export async function exchangeMicrosoftCode(code, env = getServerEnv()) {
  const { clientId, clientSecret, tenantId } = getMicrosoftConfig(env);
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: getMicrosoftRedirectUri(env),
    scope: SCOPES.join(" "),
  });

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.error_description || "Microsoft token exchange failed.");
    err.code = "MICROSOFT_AUTH_FAILED";
    err.status = res.status;
    throw err;
  }
  return payload;
}

async function graphFetch(path, accessToken, { method = "GET" } = {}) {
  const res = await fetch(`${GRAPH_BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.error?.message || `Graph ${path} failed.`);
    err.code = "GRAPH_API_FAILED";
    err.status = res.status;
    throw err;
  }
  return payload;
}

export async function fetchMicrosoftProfile(accessToken) {
  const profile = await graphFetch("/me", accessToken);
  return {
    microsoftId: profile.id,
    email: (profile.mail || profile.userPrincipalName || "").toLowerCase(),
    name: profile.displayName || profile.givenName || profile.mail || "Employee",
    jobTitle: profile.jobTitle || "",
  };
}

export async function fetchJoinedTeams(accessToken) {
  const payload = await graphFetch("/me/joinedTeams", accessToken);
  const teams = Array.isArray(payload.value) ? payload.value : [];
  return teams.map((team) => ({
    id: team.id,
    name: team.displayName,
    description: team.description || "",
    webUrl: team.webUrl || `https://teams.microsoft.com/l/team/${team.id}`,
  }));
}

export { getSiteOrigin };
