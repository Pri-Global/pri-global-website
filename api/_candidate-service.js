/** Candidate portal business logic — Jobdiva v2 backend. */

import {
  buildNarrative,
  createSessionToken,
  embedAuthHash,
  extractAuthHash,
  extractPortalAuthHash,
  hashPortalPassword,
  mergeCandidateProfiles,
  parseLocation,
  portalAuthAlternateEmail,
  stripAuthMarker,
  verifyPortalPassword,
} from "./_candidate-auth.js";
import {
  applyToJob,
  createCandidateProfile,
  fetchCandidateApplications,
  findCandidatesByEmail,
  getCandidateById,
  getDefaultPortalId,
  getOpenJobsIndex,
  normalizeApplication,
  normalizeCandidateProfile,
  normalizeJobV2,
  updateCandidateProfileRecord,
  uploadCandidateResume,
} from "./_jobdiva-v2.js";
import { getServerEnv } from "./_runtime-env.js";

function candidateName(firstName, lastName, email) {
  const name = `${firstName || ""} ${lastName || ""}`.trim();
  return name || email;
}

export async function registerCandidate(input, env = getServerEnv()) {
  const email = String(input.email || "").trim().toLowerCase();
  const password = String(input.password || "");
  const firstName = String(input.firstName || "").trim();
  const lastName = String(input.lastName || "").trim();
  const phone = String(input.phone || "").trim();

  if (!email || !password || password.length < 8) {
    const err = new Error("Email and password (min. 8 characters) are required.");
    err.code = "VALIDATION";
    err.status = 400;
    throw err;
  }
  if (!firstName || !lastName || !phone) {
    const err = new Error("Name and phone are required.");
    err.code = "VALIDATION";
    err.status = 400;
    throw err;
  }

  const existing = await findCandidatesByEmail(email, env);
  if (existing.length > 0) {
    const err = new Error("Email already registered.");
    err.code = "EMAIL_EXISTS";
    err.status = 409;
    throw err;
  }

  const { city, state, countryid } = parseLocation(input.location);
  const authHash = hashPortalPassword(password, email, env);
  const narrative = embedAuthHash(buildNarrative(input), authHash);

  const candidateId = await createCandidateProfile(
    {
      firstName,
      lastName,
      email,
      alternateemail: portalAuthAlternateEmail(authHash),
      cellphone: phoneDigits(phone) || phone,
      city,
      state,
      countryid,
      narrative,
      titleskillcertification: input.topSkills || input.skillSet || "",
      years: parseInt(String(input.experience || "0"), 10) || undefined,
    },
    env
  );

  if (input.resume?.filecontent && input.resume?.filename) {
    await uploadCandidateResume(
      {
        candidateid: candidateId,
        filename: input.resume.filename,
        filecontent: input.resume.filecontent,
      },
      env
    );
  }

  const name = candidateName(firstName, lastName, email);
  const sessionToken = createSessionToken({ candidateId, email, name }, env);
  const registeredProfile = normalizeCandidateProfile({
    id: candidateId,
    firstName,
    lastName,
    email,
    phone,
    city,
    state,
    location: input.location,
    linkedin: input.linkedin,
    experience: input.experience,
    skillSet: input.skillSet,
    topSkills: input.topSkills,
    employmentStatus: input.employmentStatus,
    workTypes: input.workTypes,
    remotePref: input.remotePref,
    coverNote: stripAuthMarker(narrative),
  });

  let profile = registeredProfile;
  try {
    const remote = await loadCandidateProfile(candidateId, email, env);
    profile = mergeCandidateProfiles(registeredProfile, remote);
  } catch {
    profile = registeredProfile;
  }

  return {
    candidateId,
    email,
    name,
    firstName,
    lastName,
    sessionToken,
    profile,
  };
}

export async function loginCandidate({ email, password }, env = getServerEnv()) {
  const normalized = String(email || "").trim().toLowerCase();
  const pwd = String(password || "");
  if (!normalized || !pwd) {
    const err = new Error("Email and password are required.");
    err.code = "VALIDATION";
    err.status = 400;
    throw err;
  }

  const matches = await findCandidatesByEmail(normalized, env);
  if (matches.length === 0) {
    const err = new Error("Invalid credentials.");
    err.code = "INVALID_CREDENTIALS";
    err.status = 401;
    throw err;
  }

  const candidateId = matches[0].id;
  const detail = await getCandidateById(candidateId, normalized, env);
  const authHash =
    extractPortalAuthHash(matches[0]) ||
    extractPortalAuthHash(detail) ||
    extractAuthHash(detail?.coverNote || matches[0].narrative || "") ||
    extractAuthFromRecord(detail) ||
    extractAuthFromRecord(matches[0]);

  if (!authHash || !verifyPortalPassword(pwd, normalized, authHash, env)) {
    const err = new Error("Invalid credentials.");
    err.code = "INVALID_CREDENTIALS";
    err.status = 401;
    throw err;
  }

  const name = candidateName(detail?.firstName || matches[0].firstName, detail?.lastName || matches[0].lastName, normalized);
  const sessionToken = createSessionToken(
    { candidateId, email: normalized, name },
    env
  );

  const profile = normalizeCandidateProfile(detail || matches[0]);

  return {
    candidateId,
    email: normalized,
    name,
    sessionToken,
    profile,
  };
}

function extractAuthFromRecord(record = {}) {
  for (const value of Object.values(record)) {
    if (typeof value !== "string") continue;
    const hash = extractAuthHash(value);
    if (hash) return hash;
  }
  return null;
}

export async function loadCandidateProfile(candidateId, email, env = getServerEnv()) {
  const raw = await getCandidateById(candidateId, email, env);
  if (!raw) {
    const err = new Error("Candidate not found.");
    err.code = "NOT_FOUND";
    err.status = 404;
    throw err;
  }
  return normalizeCandidateProfile(raw);
}

function phoneDigits(phone = "") {
  return String(phone).replace(/\D/g, "");
}

export async function saveCandidateProfile(candidateId, input, env = getServerEnv()) {
  const email = (input.email || "").toLowerCase();
  const existing = await getCandidateById(candidateId, email, env);
  if (!existing) {
    const err = new Error("Candidate not found.");
    err.code = "NOT_FOUND";
    err.status = 404;
    throw err;
  }

  const { city, state, countryid } = parseLocation(input.location || existing.location);
  const authHash =
    extractPortalAuthHash(existing) ||
    extractAuthHash(existing.narrative || "") ||
    extractAuthFromRecord(existing);
  const narrative = embedAuthHash(buildNarrative({ ...existing, ...input }), authHash || "");

  await updateCandidateProfileRecord(
    {
      candidateid: candidateId,
      firstName: input.firstName || existing.firstName,
      lastName: input.lastName || existing.lastName,
      email: email || existing.email,
      city,
      state,
      countryid,
      narrative,
      alternateemail:
        existing.alternateemail ||
        (authHash ? portalAuthAlternateEmail(authHash) : undefined),
      phones: phoneDigits(input.phone || existing.phone)
        ? [{ phone: phoneDigits(input.phone || existing.phone), type: "Cell" }]
        : undefined,
    },
    env
  );

  const saved = normalizeCandidateProfile({
    ...existing,
    ...input,
    id: candidateId,
    candidateId,
    location: input.location || existing.location,
    coverNote: stripAuthMarker(narrative),
  });

  try {
    const remote = await loadCandidateProfile(candidateId, email, env);
    return mergeCandidateProfiles(saved, remote);
  } catch {
    return saved;
  }
}

function enrichApplicationFromJobs(normalized, jobsById) {
  if (!jobsById || !normalized.jobId) return normalized;
  const genericRole = !normalized.role || /^Position\s/i.test(normalized.role);
  const genericCompany = !normalized.company || normalized.company === "Confidential";
  if (!genericRole && !genericCompany) return normalized;

  const job = jobsById.get(normalized.jobId);
  if (!job) return normalized;

  return {
    ...normalized,
    role: genericRole ? normalizeJobV2(job).title : normalized.role,
    company: genericCompany ? normalizeJobV2(job).company : normalized.company,
  };
}

export async function listCandidateApplications(candidateId, env = getServerEnv()) {
  const raw = await fetchCandidateApplications(candidateId, env);
  const applications = raw.map((entry) => normalizeApplication(entry));
  const needsLookup = applications.some(
    (app) =>
      !app.role ||
      /^Position\s/i.test(app.role) ||
      !app.company ||
      app.company === "Confidential"
  );
  if (!needsLookup) return applications;

  const jobsById = await getOpenJobsIndex(env);
  return applications.map((app) => enrichApplicationFromJobs(app, jobsById));
}

export async function listSavedJobDetails(jobIds = [], env = getServerEnv()) {
  const ids = [...new Set(jobIds.map(Number).filter(Boolean))];
  if (ids.length === 0) return [];

  const jobsById = await getOpenJobsIndex(env);
  return ids
    .map((id) => jobsById.get(id))
    .filter(Boolean)
    .map(normalizeJobV2);
}

export async function submitCandidateApplication(candidateId, { jobId, resume }, env = getServerEnv()) {
  const id = Number(jobId);
  if (!id) {
    const err = new Error("Job ID is required.");
    err.code = "VALIDATION";
    err.status = 400;
    throw err;
  }

  const result = await applyToJob({ candidateId, jobId: id, resume }, env);
  return result;
}

export async function getDashboardData(candidateId, savedJobIds = [], email, env = getServerEnv()) {
  const savedIds = [...new Set(savedJobIds.map(Number).filter(Boolean))];

  const [profile, rawApplications] = await Promise.all([
    loadCandidateProfile(candidateId, email, env),
    fetchCandidateApplications(candidateId, env),
  ]);

  let applications = rawApplications.map((entry) => normalizeApplication(entry));
  let savedJobs = [];

  const needsJobLookup =
    savedIds.length > 0 ||
    applications.some(
      (app) =>
        !app.role ||
        /^Position\s/i.test(app.role) ||
        !app.company ||
        app.company === "Confidential"
    );

  if (needsJobLookup) {
    const jobsById = await getOpenJobsIndex(env);
    applications = applications.map((app) => enrichApplicationFromJobs(app, jobsById));
    savedJobs = savedIds
      .map((id) => jobsById.get(id))
      .filter(Boolean)
      .map(normalizeJobV2);
  }

  const completeness = profileCompleteness(profile);

  return {
    profile,
    applications,
    savedJobs,
    stats: {
      applications: applications.length,
      savedJobs: savedJobs.length || savedIds.length,
      messages: 0,
      profileComplete: completeness.percent,
    },
  };
}

function profileCompleteness(profile = {}) {
  const fields = ["firstName", "lastName", "email", "phone", "location", "skillSet", "topSkills"];
  const filled = fields.filter((key) => String(profile[key] || "").trim()).length;
  const percent = Math.round((filled / fields.length) * 100);
  return { percent, filled, total: fields.length };
}
