/** Live job listings via JobDiva Candidate Portal REST API (same source as priglobal.com/candidate-login). */

export const JOBDIVA_API_BASE = "https://ws.jobdiva.com/candPortal/rest/";
export const JOBDIVA_PORTAL_A =
  "74jdnww6u8rk6etus6fjb7z7jh2bqs0267mjowh28c4pbat3q8pogch40ecq88g5";
export const JOBDIVA_BOOTSTRAP_AUTH = "YXhlbG9uOmF4ZWxvbg=="; // public portal bootstrap (from JobDiva portal bundle)

export function jobPortalUrl(jobId) {
  const base = `https://www2.jobdiva.com/portal/?a=${JOBDIVA_PORTAL_A}`;
  return jobId ? `${base}#/job/${jobId}` : `${base}#/searchJobs`;
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeJob(raw) {
  return {
    id: raw.id,
    title: raw.title || "Open Position",
    refNo: raw.refNo,
    company: raw.company || "Confidential",
    location: raw.location || raw.mainLocation || "Location TBD",
    description: stripHtml(raw.jobDescription || ""),
    postDate: raw.postDate ? new Date(raw.postDate) : null,
    payRate: raw.payRate,
    positionType: raw.positionType,
    workingRemote: raw.workingRemote,
    applyUrl: jobPortalUrl(raw.id),
  };
}

async function fetchPortalSession() {
  const res = await fetch(`${JOBDIVA_API_BASE}auth/a`, {
    headers: {
      Authorization: `Basic ${JOBDIVA_BOOTSTRAP_AUTH}`,
      portalID: "1",
      a: JOBDIVA_PORTAL_A,
      compid: "0",
    },
  });
  if (!res.ok) throw new Error("JobDiva auth failed");
  return res.json();
}

function authHeaders(session) {
  return {
    Authorization: `Basic ${session.auth}`,
    portalID: String(session.portalID),
    token: session.token,
    a: JOBDIVA_PORTAL_A,
    compid: "0",
  };
}

export async function fetchLiveJobs({ keyword = "", count = 100 } = {}) {
  const session = await fetchPortalSession();
  const headers = authHeaders(session);

  let payload;
  if (keyword.trim()) {
    const body = new URLSearchParams({
      portalID: String(session.portalID),
      from: "1",
      to: String(count),
      keywords: keyword.trim(),
      country: "",
      states: "",
      city: "",
      zipcode: "",
      miles: "",
      jobCategories: "",
      jobTypes: "",
      jobDivisions: "",
      onsiteFlex: "",
      qualifications: "",
      unit: "",
    });
    const res = await fetch(`${JOBDIVA_API_BASE}job/searchjobsportal`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) throw new Error("Job search failed");
    payload = await res.json();
  } else {
    const res = await fetch(
      `${JOBDIVA_API_BASE}job/listall?portaltype=1&count=${count}`,
      { headers }
    );
    if (!res.ok) throw new Error("Job list failed");
    payload = await res.json();
  }

  const jobs = (payload.data || []).map(normalizeJob);
  return { total: payload.total ?? jobs.length, jobs };
}
