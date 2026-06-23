// Vercel serverless function: POST /api/priva
// Holds the OpenAI key server-side (process.env.OPENAI_API_KEY) so it is
// never shipped to the browser. Body: { messages: [{role, content}, ...] }.
import { generateReply } from "./_priva-core.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // req.body is parsed automatically on Vercel; guard for raw bodies too.
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const reply = await generateReply(body.messages, {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL,
    });

    return res.status(200).json({ reply });
  } catch (err) {
    const code = err?.code;
    if (code === "EMPTY_INPUT") {
      return res.status(400).json({ error: "No message provided." });
    }
    if (code === "NO_API_KEY") {
      // Don't 500 loudly for a config gap — let the client fall back gracefully.
      console.error("PriVa: OPENAI_API_KEY is not configured.");
      return res.status(503).json({ error: "Assistant is not configured." });
    }
    console.error("PriVa error:", code || err?.message, err?.detail || "");
    return res.status(502).json({ error: "Assistant is temporarily unavailable." });
  }
}
