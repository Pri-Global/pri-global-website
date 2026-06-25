/** JobDiva REST API v2 — server-side only (https://api.jobdiva.com/apiv2/). */

import { stripAuthMarker, parseNarrativeFields } from "./_candidate-auth.js";
import { getServerEnv } from "./_runtime-env.js";

export const JOBDIVA_V2_BASE = "https://api.jobdiva.com/apiv2";

let cachedToken = null;
let cachedTokenExpiresAt = 0;

export function getJobdivaConfig(env = getServerEnv()) {
  const clientId = env.JOBDIVA_CLIENT_ID?.trim();
  const username = env.JOBDIVA_API_USERNAME?.trim();
  const password = env.JOBDIVA_API_PASSWORD?.trim();

  if (!clientId || !username || !password) {
    const err = new Error("JobDiva API is not configured.");
    err.code = "NO_JOBDIVA_CONFIG";
    throw err;
  }

  return { clientId, username, password };
}

export function isJobdivaConfigured(env = getServerEnv()) {
  try {
    getJobdivaConfig(env);
    return true;
  } catch {
    return false;
  }
}

function decodeJwtExpiryMs(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return 0;
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return json.exp ? json.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export async function getJobdivaToken(env = getServerEnv()) {
  const now = Date.now();
  if (cachedToken && cachedTokenExpiresAt > now + 60_000) {
    return cachedToken;
  }

  const { clientId, username, password } = getJobdivaConfig(env);
  const params = new URLSearchParams({
    clientid: clientId,
    username,
    password,
  });

  const res = await fetch(`${JOBDIVA_V2_BASE}/authenticate?${params}`);
  if (!res.ok) {
    const err = new Error("JobDiva authentication failed.");
    err.code = "JOBDIVA_AUTH_FAILED";
    err.status = res.status;
    throw err;
  }

  const token = (await res.text()).trim();
  if (!token) {
    const err = new Error("JobDiva authentication returned an empty token.");
    err.code = "JOBDIVA_AUTH_FAILED";
    throw err;
  }

  const jwtExpiry = decodeJwtExpiryMs(token);
  cachedToken = token;
  cachedTokenExpiresAt = jwtExpiry || now + 30 * 60_000;

  return token;
}

export async function jobdivaV2Fetch(path, { method = "GET", body, env = getServerEnv() } = {}) {
  const token = await getJobdivaToken(env);
  const headers = { Authorization: token };

  const init = { method, headers };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${JOBDIVA_V2_BASE}${path}`, init);
  const text = await res.text();

  if (!res.ok) {
    const err = new Error(`JobDiva API ${method} ${path} failed.`);
    err.code = "JOBDIVA_API_FAILED";
    err.status = res.status;
    err.detail = text.slice(0, 500);
    throw err;
  }

  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function fetchPortals(env = getServerEnv()) {
  return jobdivaV2Fetch("/jobdiva/getPortals", { env });
}

let cachedPortalId = null;

export async function getDefaultPortalId(env = getServerEnv()) {
  const configured = env.JOBDIVA_PORTAL_ID?.trim();
  if (configured !== undefined && configured !== "") {
    return Number(configured);
  }
  if (cachedPortalId !== null) return cachedPortalId;

  try {
    const portals = await fetchPortals(env);
    if (portals && typeof portals === "object") {
      if (portals["0"] != null) {
        cachedPortalId = 0;
        return 0;
      }
      const firstKey = Object.keys(portals).find((key) => Number(key) >= 0);
      if (firstKey != null) {
        cachedPortalId = Number(firstKey);
        return cachedPortalId;
      }
    }
  } catch {
    // Fall back to portal 0 (Default Candidate Portal).
  }

  cachedPortalId = 0;
  return 0;
}

export async function searchJobsV2(
  { portalId, keyword = "", maxReturned = 100, showAllOpenJobs = true } = {},
  env = getServerEnv()
) {
  const resolvedPortalId = portalId ?? (await getDefaultPortalId(env));
  const body = {
    portalId: resolvedPortalId,
    showAllOpenJobs,
    maxReturned: Math.min(maxReturned, 200),
    status: 0,
  };
  if (keyword.trim()) body.keywords = keyword.trim();

  const raw = await jobdivaV2Fetch("/jobdiva/SearchJob", { method: "POST", body, env });
  const jobs = Array.isArray(raw) ? raw : raw?.data || [];
  return { total: jobs.length, jobs, portalId: resolvedPortalId };
}

/** Live job board — same Jobdiva v2 API as candidate portal (replaces legacy candPortal REST). */
export async function fetchLiveJobs({ keyword = "", count = 100 } = {}, env = getServerEnv()) {
  const portalId = await getDefaultPortalId(env);
  const { jobs } = await searchJobsV2(
    { portalId, keyword, maxReturned: Math.min(count, 200), showAllOpenJobs: true },
    env
  );
  const normalized = jobs.map(normalizeJobV2);
  return { total: normalized.length, jobs: normalized };
}

const JOBS_INDEX_TTL_MS = 5 * 60_000;
let jobsIndexCache = { portalId: null, map: null, expiresAt: 0 };

/** Cached open-jobs lookup — avoids repeated SearchJob calls on dashboard load. */
export async function getOpenJobsIndex(env = getServerEnv(), { maxReturned = 200 } = {}) {
  const portalId = await getDefaultPortalId(env);
  const now = Date.now();
  if (
    jobsIndexCache.portalId === portalId &&
    jobsIndexCache.map &&
    jobsIndexCache.expiresAt > now
  ) {
    return jobsIndexCache.map;
  }

  const { jobs } = await searchJobsV2({ portalId, maxReturned, showAllOpenJobs: true }, env);
  const map = new Map(jobs.map((job) => [Number(job.id ?? job["id"]), job]));
  jobsIndexCache = { portalId, map, expiresAt: now + JOBS_INDEX_TTL_MS };
  return map;
}

function stripHtml(html = "") {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(obj, keys) {
  for (const key of keys) {
    if (obj?.[key] != null && obj[key] !== "") return obj[key];
  }
  return "";
}

export function normalizeJobV2(raw) {
  const id = raw.id ?? raw["id"];
  const title = pick(raw, ["job title", "title", "posting title"]);
  const company = pick(raw, ["company", "company name"]);
  const city = pick(raw, ["city"]);
  const state = pick(raw, ["state"]);
  const location = [city, state].filter(Boolean).join(", ") || "Location TBD";
  const issueDate = raw["issue date"] ?? raw.issueDate ?? raw.postDate;

  return {
    id,
    title: title || "Open Position",
    refNo: pick(raw, ["reference #", "refNo", "jobdivaref"]),
    company: company || "Confidential",
    location,
    description: stripHtml(pick(raw, ["job description", "description"])),
    postDate: issueDate ? new Date(Number(issueDate)).toISOString() : null,
    positionType: pick(raw, ["job type", "positionType"]),
    payRate:
      raw["minimum rate"] != null
        ? `${raw["minimum rate"]}${raw["maximum rate"] ? `–${raw["maximum rate"]}` : ""} ${raw["rate per"] || ""}`.trim()
        : raw.payRate,
    workingRemote: pick(raw, ["onSiteRemote", "onsite flex", "workingRemote", "remote"]),
  };
}

function extractPhone(row = {}) {
  const direct = pick(row, ["phone", "cellphone", "Phone", "Cell Phone", "Mobile Phone"]);
  if (direct) {
    const digits = direct.replace(/\D/g, "");
    if (digits.length >= 7 && !/Phone:\s*$/i.test(direct)) return direct.trim();
  }

  for (let i = 1; i <= 4; i += 1) {
    const value = row[`phone ${i}`] ?? row[`Phone ${i}`];
    if (typeof value !== "string") continue;
    const match = value.match(/(\d[\d().\s-]{7,}\d)/);
    if (match) return match[1].replace(/\D/g, "");
  }

  return "";
}

function mapSearchCandidate(row) {
  const id = row.id ?? row.candidateId ?? row["candidate id"] ?? row["Candidate ID"];
  const phoneRaw = extractPhone(row);
  const phone =
    phoneRaw && !String(phoneRaw).startsWith("+") && phoneRaw.length === 10
      ? `+1 ${phoneRaw}`
      : phoneRaw;

  return {
    id: Number(id),
    firstName: pick(row, ["firstName", "first name", "First Name"]),
    lastName: pick(row, ["lastName", "last name", "Last Name"]),
    email: pick(row, ["email", "Email"]),
    phone,
    city: pick(row, ["city", "City"]),
    state: pick(row, ["state", "State"]),
    location: [pick(row, ["city", "City"]), pick(row, ["state", "State"])].filter(Boolean).join(", "),
    narrative: pick(row, ["narrative", "Narrative", "narrativeText"]),
    alternateemail: pick(row, ["alternateemail", "alternate email", "Alternate Email"]),
    linkedin: pick(row, ["linkedinProfile", "LinkedIn"]),
    topSkills: pick(row, ["titleskillcertification", "Titles/Skills/Certifications"]),
  };
}

export function normalizeCandidateProfile(raw = {}) {
  const firstName = pick(raw, ["firstName", "first name", "First Name"]);
  const lastName = pick(raw, ["lastName", "last name", "Last Name"]);
  const city = pick(raw, ["city", "City"]);
  const state = pick(raw, ["state", "State"]);
  const narrative = pick(raw, ["narrative", "Narrative", "narrativeText", "coverNote"]);
  const parsedNarrative = parseNarrativeFields(narrative);
  const phoneRaw = raw.phone || extractPhone(raw);
  const phone =
    phoneRaw && !String(phoneRaw).startsWith("+") && String(phoneRaw).replace(/\D/g, "").length === 10
      ? `+1 ${String(phoneRaw).replace(/\D/g, "")}`
      : phoneRaw;

  return {
    candidateId: Number(raw.id ?? raw.candidateId ?? raw.candidateid),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim() || raw.name || "",
    email: pick(raw, ["email", "Email"]),
    phone: phone || "",
    location: raw.location || [city, state].filter(Boolean).join(", "),
    city,
    state,
    linkedin: raw.linkedin || parsedNarrative.linkedin || "",
    experience: raw.experience || raw.years || parsedNarrative.experience || "",
    skillSet: raw.skillSet || parsedNarrative.skillSet || "",
    topSkills:
      raw.topSkills ||
      pick(raw, ["titleskillcertification", "Titles/Skills/Certifications"]) ||
      parsedNarrative.topSkills ||
      "",
    employmentStatus: raw.employmentStatus || parsedNarrative.employmentStatus || "",
    workTypes: raw.workTypes?.length ? raw.workTypes : parsedNarrative.workTypes || [],
    remotePref: raw.remotePref || parsedNarrative.remotePref || "",
    coverNote: parsedNarrative.coverNote || stripAuthMarker(narrative),
  };
}

export function normalizeApplication(raw = {}) {
  const appliedRaw = pick(raw, [
    "dateapplied",
    "DATEAPPLIED",
    "date applied",
    "Date Applied",
    "appliedDate",
    "issue date",
  ]);
  let applied = appliedRaw;
  if (typeof appliedRaw === "number") applied = new Date(appliedRaw).toLocaleDateString("en-US");
  else if (typeof appliedRaw === "string") {
    const parsed = Date.parse(appliedRaw);
    applied = Number.isNaN(parsed) ? appliedRaw : new Date(parsed).toLocaleDateString("en-US");
  }

  const jobId = Number(pick(raw, ["jobid", "JOBID", "job id", "Job ID", "id"]));
  const refNo = pick(raw, ["JOBDIVAREF", "refNo", "reference #", "jobdivaref"]);

  return {
    id: pick(raw, ["id", "applicationId", "application id", "JOBID"]) || String(jobId || refNo),
    jobId,
    refNo,
    role:
      pick(raw, ["job title", "JOBTITLE", "title", "role", "Job Title", "posting title"]) ||
      (refNo ? `Position ${refNo}` : "Applied role"),
    company: pick(raw, ["COMPANY_DEPARTMENT", "company", "company name", "Company"]) || "Confidential",
    status: pick(raw, ["status", "application status", "Status", "job status", "ACTION"]) || "Submitted",
    statusColor: "green",
    applied: applied || "—",
  };
}

export async function findCandidatesByEmail(email, env = getServerEnv()) {
  const raw = await jobdivaV2Fetch("/jobdiva/searchCandidateProfile", {
    method: "POST",
    body: { email: email.toLowerCase(), maxreturned: 10 },
    env,
  });
  const rows = Array.isArray(raw) ? raw : raw?.data || raw?.candidates || [];
  return rows.map(mapSearchCandidate).filter((row) => row.id && row.email?.toLowerCase() === email.toLowerCase());
}

export async function getCandidateById(candidateId, email, env = getServerEnv()) {
  let row = null;

  if (email) {
    const matches = await findCandidatesByEmail(email, env);
    row = matches.find((match) => match.id === Number(candidateId)) || matches[0] || null;
  }

  if (!row) {
    const detail = await jobdivaV2Fetch(
      `/bi/CandidateDetail?candidateId=${Number(candidateId)}`,
      { env }
    ).catch(() => null);

    if (detail) {
      row = mapSearchCandidate({ ...(Array.isArray(detail) ? detail[0] : detail), id: candidateId, candidateId });
    }
  }

  if (!row) return null;
  return { ...row, id: candidateId, candidateId };
}

export async function createCandidateProfile(payload, env = getServerEnv()) {
  const id = await jobdivaV2Fetch("/jobdiva/createCandidate", {
    method: "POST",
    body: payload,
    env,
  });
  return Number(id);
}

export async function updateCandidateProfileRecord(payload, env = getServerEnv()) {
  return jobdivaV2Fetch("/jobdiva/updateCandidateProfile", {
    method: "POST",
    body: payload,
    env,
  });
}

export async function uploadCandidateResume(payload, env = getServerEnv()) {
  return jobdivaV2Fetch("/jobdiva/uploadResume", {
    method: "POST",
    body: payload,
    env,
  });
}

export async function applyToJob({ candidateId, jobId, resume }, env = getServerEnv()) {
  if (resume?.filecontent && resume?.filename) {
    return jobdivaV2Fetch("/jobdiva/CreateJobApplicationWithResume", {
      method: "POST",
      body: {
        jobid: jobId,
        filename: resume.filename,
        filecontent: resume.filecontent,
        candidateid: candidateId,
        resumesource: 0,
      },
      env,
    });
  }

  return jobdivaV2Fetch("/jobdiva/createJobApplication", {
    method: "POST",
    body: {
      candidateid: candidateId,
      jobid: jobId,
      resumesource: 0,
    },
    env,
  });
}

export async function fetchCandidateApplications(candidateId, env = getServerEnv()) {
  const raw = await jobdivaV2Fetch(
    `/jobdiva/CandidateApplicationsList?candidateId=${Number(candidateId)}`,
    { env }
  );
  return Array.isArray(raw) ? raw : raw?.data || raw?.applications || [];
}

