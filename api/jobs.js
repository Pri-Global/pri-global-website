import { fetchLiveJobs } from "./_jobdiva-core.js";

/** GET /api/jobs?keyword=&count=100 — live PRI Global openings (JobDiva backend, PRI-branded frontend). */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const keyword = req.query?.keyword ?? "";
    const count = Math.min(Number(req.query?.count) || 100, 200);
    const result = await fetchLiveJobs({ keyword, count });
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(result);
  } catch (err) {
    console.error("Jobs API error:", err?.message);
    return res.status(502).json({ error: "Unable to load job listings." });
  }
}
