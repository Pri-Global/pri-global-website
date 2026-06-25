import crypto from "crypto";
import { getServerEnv } from "./_runtime-env.js";

const AUTH_MARKER = /<!--PRI_AUTH:([a-f0-9]+)-->/;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function getSessionSecret(env = getServerEnv()) {
  const secret = env.JOBDIVA_SESSION_SECRET?.trim() || env.JOBDIVA_API_PASSWORD?.trim();
  if (!secret) {
    const err = new Error("Candidate session secret is not configured.");
    err.code = "NO_SESSION_SECRET";
    throw err;
  }
  return secret;
}

export function hashPortalPassword(password, email, env = getServerEnv()) {
  return crypto.scryptSync(password, `${getSessionSecret(env)}:${email.toLowerCase()}`, 32).toString("hex");
}

export function verifyPortalPassword(password, email, hash, env = getServerEnv()) {
  if (!hash || !password) return false;
  const expected = hashPortalPassword(password, email, env);
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

export function embedAuthHash(narrative = "", hash) {
  const clean = String(narrative || "").replace(AUTH_MARKER, "").trim();
  const marker = `<!--PRI_AUTH:${hash}-->`;
  return clean ? `${clean}\n${marker}` : marker;
}

export function extractAuthHash(narrative = "") {
  const match = String(narrative || "").match(AUTH_MARKER);
  return match?.[1] || null;
}

export function extractPortalAuthHash(candidate = {}) {
  const narrative = candidate.narrative || candidate.coverNote || candidate.narrativeText || "";
  const fromNarrative = extractAuthHash(narrative);
  if (fromNarrative) return fromNarrative;

  const alt = candidate.alternateemail || candidate.alternateEmail || candidate["alternate email"] || "";
  if (String(alt).startsWith("__pri_portal__")) {
    return String(alt).replace("__pri_portal__", "");
  }
  return null;
}

export function portalAuthAlternateEmail(hash) {
  return `__pri_portal__${hash}`;
}

export function stripAuthMarker(text = "") {
  return String(text || "").replace(AUTH_MARKER, "").trim();
}

export function createSessionToken({ candidateId, email, name }, env = getServerEnv()) {
  const payload = {
    candidateId: Number(candidateId),
    email: email.toLowerCase(),
    name: name || email,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSessionSecret(env)).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token, env = getServerEnv()) {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = crypto.createHmac("sha256", getSessionSecret(env)).update(body).digest("base64url");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.candidateId || !payload.email || !payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getBearerToken(req) {
  const header = req.headers?.authorization || req.headers?.Authorization || "";
  const match = String(header).match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export function requireCandidateSession(req, env = getServerEnv()) {
  const token = getBearerToken(req);
  const session = verifySessionToken(token, env);
  if (!session) {
    const err = new Error("Unauthorized");
    err.code = "UNAUTHORIZED";
    err.status = 401;
    throw err;
  }
  return session;
}

export function parseLocation(location = "") {
  const parts = String(location).split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { city: parts[0], state: parts[1], countryid: "US" };
  }
  return { city: parts[0] || "", state: "", countryid: "US" };
}

export function buildNarrative(form = {}) {
  const lines = [];
  if (form.coverNote?.trim()) lines.push(form.coverNote.trim());
  if (form.experience) lines.push(`Experience: ${form.experience} years`);
  if (form.skillSet) lines.push(`Primary skill set: ${form.skillSet}`);
  if (form.topSkills) lines.push(`Top skills: ${form.topSkills}`);
  if (form.employmentStatus) lines.push(`Employment status: ${form.employmentStatus}`);
  if (form.workTypes?.length) lines.push(`Preferred work types: ${form.workTypes.join(", ")}`);
  if (form.remotePref) lines.push(`Remote preference: ${form.remotePref}`);
  if (form.linkedin?.trim()) lines.push(`LinkedIn: ${form.linkedin.trim()}`);
  return lines.join("\n");
}

export function parseNarrativeFields(narrative = "") {
  const clean = stripAuthMarker(narrative);
  const fields = {
    coverNote: "",
    experience: "",
    skillSet: "",
    topSkills: "",
    linkedin: "",
    employmentStatus: "",
    workTypes: [],
    remotePref: "",
  };

  const freeform = [];
  for (const line of clean.split("\n").map((part) => part.trim()).filter(Boolean)) {
    if (line.startsWith("Experience:")) {
      fields.experience = line.replace(/^Experience:\s*/i, "").replace(/\s*years\s*$/i, "").trim();
    } else if (line.startsWith("Primary skill set:")) {
      fields.skillSet = line.replace(/^Primary skill set:\s*/i, "").trim();
    } else if (line.startsWith("Top skills:")) {
      fields.topSkills = line.replace(/^Top skills:\s*/i, "").trim();
    } else if (line.startsWith("LinkedIn:")) {
      fields.linkedin = line.replace(/^LinkedIn:\s*/i, "").trim();
    } else if (line.startsWith("Employment status:")) {
      fields.employmentStatus = line.replace(/^Employment status:\s*/i, "").trim();
    } else if (line.startsWith("Preferred work types:")) {
      fields.workTypes = line
        .replace(/^Preferred work types:\s*/i, "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    } else if (line.startsWith("Remote preference:")) {
      fields.remotePref = line.replace(/^Remote preference:\s*/i, "").trim();
    } else {
      freeform.push(line);
    }
  }

  fields.coverNote = freeform.join("\n");
  return fields;
}

export function mergeCandidateProfiles(preferred = {}, fallback = {}) {
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
