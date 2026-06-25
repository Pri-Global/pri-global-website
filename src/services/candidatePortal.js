/** Candidate portal — browser client for /api/candidate/* (Jobdiva backend). */

import { AUTH_KEYS, readAuth, readStorage, writeAuth, writeStorage } from "../hooks/usePortalAuth";

function mergeProfile(preferred = {}, fallback = {}) {
  const merged = { ...fallback, ...preferred };
  for (const [key, value] of Object.entries(fallback)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (
      typeof merged[key] === "string" &&
      !String(merged[key] || "").trim() &&
      String(value).trim()
    ) {
      merged[key] = value;
    }
    if (Array.isArray(value) && (!Array.isArray(merged[key]) || merged[key].length === 0)) {
      merged[key] = value;
    }
  }
  return merged;
}

function getSessionToken() {
  return readAuth(AUTH_KEYS.candidate)?.sessionToken || null;
}

async function candidateFetch(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getSessionToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api/candidate${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error || "Request failed.");
  return payload;
}

export function persistCandidateSession(result, remember = false) {
  writeAuth(AUTH_KEYS.candidate, {
    loggedIn: true,
    email: result.email,
    name: result.name,
    role: "candidate",
    candidateId: result.candidateId,
    sessionToken: result.sessionToken,
    loginTime: Date.now(),
    remember,
  });

  if (result.profile) {
    writeStorage(AUTH_KEYS.candidateProfile, result.profile);
  }
}

export async function registerCandidateAccount(form, resumeFile = null) {
  const payload = {
    ...form,
    email: form.email?.trim().toLowerCase(),
    resume: resumeFile ? await fileToResumePayload(resumeFile) : undefined,
  };

  const result = await candidateFetch("/register", { method: "POST", body: payload });
  persistCandidateSession(result);
  return result;
}

export async function loginCandidateAccount(email, password, remember = false) {
  const result = await candidateFetch("/login", {
    method: "POST",
    body: { email: email.trim().toLowerCase(), password },
  });
  persistCandidateSession(result, remember);
  return result;
}

export async function fetchCandidateProfile() {
  const stored = readStorage(AUTH_KEYS.candidateProfile);
  const { profile } = await candidateFetch("/profile");
  const merged = mergeProfile(profile, stored);
  writeStorage(AUTH_KEYS.candidateProfile, merged);
  return merged;
}

export async function saveCandidateProfile(form) {
  const { profile } = await candidateFetch("/profile", { method: "PUT", body: form });
  const merged = mergeProfile(profile, form);
  writeStorage(AUTH_KEYS.candidateProfile, merged);
  return merged;
}

export async function fetchCandidateApplications() {
  const { applications } = await candidateFetch("/applications");
  return applications;
}

export async function applyToCandidateJob(jobId) {
  invalidateCandidateDashboardCache();
  return candidateFetch("/apply", { method: "POST", body: { jobId: Number(jobId) } });
}

const DASHBOARD_CACHE_TTL_MS = 30_000;
let inflightDashboard = null;

function dashboardCacheKey(savedJobIds = []) {
  const session = readAuth(AUTH_KEYS.candidate);
  return `${session?.candidateId || ""}:${savedJobIds.join(",")}`;
}

export function readCandidateDashboardCache() {
  const savedJobIds = readStorage(AUTH_KEYS.candidateSavedJobs, []);
  const cached = readStorage(AUTH_KEYS.candidateDashboardCache);
  if (!cached?.data || !cached?.savedAt) return null;
  if (Date.now() - cached.savedAt > DASHBOARD_CACHE_TTL_MS) return null;
  if (cached.key !== dashboardCacheKey(savedJobIds)) return null;
  return cached.data;
}

export function invalidateCandidateDashboardCache() {
  try {
    localStorage.removeItem(AUTH_KEYS.candidateDashboardCache);
  } catch {
    /* ignore */
  }
  inflightDashboard = null;
}

export async function fetchCandidateDashboard(savedJobIds = []) {
  const key = dashboardCacheKey(savedJobIds);
  const cached = readCandidateDashboardCache();
  if (cached) return cached;

  if (inflightDashboard?.key === key) {
    return inflightDashboard.promise;
  }

  const params = new URLSearchParams();
  if (savedJobIds.length) params.set("savedJobIds", savedJobIds.join(","));
  const query = params.toString();

  const promise = candidateFetch(`/dashboard${query ? `?${query}` : ""}`).then((payload) => {
    writeStorage(AUTH_KEYS.candidateDashboardCache, {
      key,
      savedAt: Date.now(),
      data: payload,
    });
    return payload;
  });

  inflightDashboard = { key, promise };
  try {
    return await promise;
  } finally {
    if (inflightDashboard?.key === key) inflightDashboard = null;
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToResumePayload(file) {
  return {
    filename: file.name,
    filecontent: await fileToBase64(file),
  };
}

export function isLiveCandidateSession(session) {
  return Boolean(session?.loggedIn && session?.sessionToken && session?.candidateId);
}
