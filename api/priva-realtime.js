// Vercel serverless function: POST /api/priva-realtime
// Returns a short-lived ephemeral client secret for an OpenAI Realtime voice
// session. The real OPENAI_API_KEY stays server-side.
import { createRealtimeSession } from "./_realtime-core.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await createRealtimeSession({
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_REALTIME_MODEL,
      voice: process.env.OPENAI_REALTIME_VOICE,
    });
    return res.status(200).json(session);
  } catch (err) {
    if (err?.code === "NO_API_KEY") {
      console.error("PriVa voice: OPENAI_API_KEY is not configured.");
      return res.status(503).json({ error: "Voice is not configured." });
    }
    console.error("PriVa voice error:", err?.code || err?.message, err?.detail || "");
    return res.status(502).json({ error: "Voice is temporarily unavailable." });
  }
}
