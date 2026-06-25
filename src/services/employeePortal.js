/** Employee portal — browser client for /api/employee/* */

import { getEmployeeSession, setEmployeeSession } from "../components/ProtectedRoute";

function getSessionToken() {
  return getEmployeeSession()?.sessionToken || null;
}

async function employeeFetch(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getSessionToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api/employee${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error || "Request failed.");
  return payload;
}

export function isLiveEmployeeSession(session) {
  return Boolean(
    session?.loggedIn &&
      session?.sessionToken &&
      (session?.authProvider === "microsoft" || session?.authProvider === "rippling")
  );
}

function persistEmployeeSession(result, remember = false) {
  setEmployeeSession({
    loggedIn: true,
    email: result.email,
    name: result.name,
    jobTitle: result.jobTitle || "",
    department: result.department || "",
    sessionToken: result.sessionToken || result.token,
    authProvider: result.authProvider,
    loginTime: Date.now(),
    remember,
  });
}

export function persistMicrosoftEmployeeSession(result, remember = false) {
  persistEmployeeSession({ ...result, authProvider: "microsoft" }, remember);
}

export function persistRipplingEmployeeSession(result, remember = false) {
  persistEmployeeSession({ ...result, authProvider: "rippling" }, remember);
}

export async function fetchEmployeeAuthStatus() {
  return employeeFetch("/auth/status");
}

export function startMicrosoftEmployeeLogin() {
  window.location.href = "/api/employee/auth/microsoft";
}

export function startRipplingAdminConnect() {
  window.location.href = "/api/employee/rippling/connect";
}

export async function loginWithRipplingEmail(email) {
  return employeeFetch("/auth/rippling", { method: "POST", body: { email } });
}

export async function fetchEmployeeProfile() {
  const { profile } = await employeeFetch("/me");
  return profile;
}

export async function fetchEmployeeTeams() {
  const { teams } = await employeeFetch("/teams");
  return teams;
}
