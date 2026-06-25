// Vercel serverless function: POST /api/priva (+ /api/priva-realtime via rewrite)
// Holds the OpenAI key server-side (process.env.OPENAI_API_KEY) so it is
// never shipped to the browser.
import { generateReply } from "./_priva-core.js";
import { createRealtimeSession } from "./_realtime-core.js";

async function handleChat(req, res) {
  const body =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  const reply = await generateReply(body.messages, {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL,
  });

  return res.status(200).json({ reply });
}

async function handleRealtime(req, res) {
  const session = await createRealtimeSession({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_REALTIME_MODEL,
    voice: process.env.OPENAI_REALTIME_VOICE,
  });
  return res.status(200).json(session);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const isRealtime = req.query?.route === "realtime";

  try {
    if (isRealtime) {
      return await handleRealtime(req, res);
    }
    return await handleChat(req, res);
  } catch (err) {
    const code = err?.code;
    if (code === "EMPTY_INPUT") {
      return res.status(400).json({ error: "No message provided." });
    }
    if (code === "NO_API_KEY") {
      console.error(isRealtime ? "PriVa voice: OPENAI_API_KEY is not configured." : "PriVa: OPENAI_API_KEY is not configured.");
      return res.status(503).json({ error: isRealtime ? "Voice is not configured." : "Assistant is not configured." });
    }
    console.error(isRealtime ? "PriVa voice error:" : "PriVa error:", code || err?.message, err?.detail || "");
    return res.status(502).json({
      error: isRealtime ? "Voice is temporarily unavailable." : "Assistant is temporarily unavailable.",
    });
  }
}
