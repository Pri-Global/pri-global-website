/** Live job listings via PRI server API (/api/jobs → JobDiva candidate portal backend). */

export function jobApplyPath(jobId) {
  return jobId ? `/candidate-jobs?job=${encodeURIComponent(jobId)}` : "/candidate-jobs";
}

export function normalizeJob(raw) {
  return {
    id: raw.id,
    title: raw.title || "Open Position",
    refNo: raw.refNo,
    company: raw.company || "Confidential",
    location: raw.location || "Location TBD",
    description: raw.description || "",
    postDate: raw.postDate ? new Date(raw.postDate) : null,
    payRate: raw.payRate,
    positionType: raw.positionType,
    workingRemote: raw.workingRemote,
    applyPath: jobApplyPath(raw.id),
  };
}

export async function fetchLiveJobs({ keyword = "", count = 100 } = {}) {
  const params = new URLSearchParams({ count: String(count) });
  if (keyword.trim()) params.set("keyword", keyword.trim());

  const res = await fetch(`/api/jobs?${params}`);
  if (!res.ok) throw new Error("Unable to load jobs");

  const payload = await res.json();
  const jobs = (payload.jobs || []).map(normalizeJob);
  return { total: payload.total ?? jobs.length, jobs };
}
