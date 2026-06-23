// Framework-agnostic core for PriVa. Used by both the Vercel serverless
// function (api/priva.js) and the local Vite dev middleware (vite.config.js).
import { SYSTEM_PROMPT } from "./_knowledge.js";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const MAX_HISTORY = 12; // cap turns sent to keep prompts small + cheap

/** Keep only valid {role, content} chat turns, drop anything malformed. */
function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

/**
 * Generate PriVa's reply from a conversation history.
 * @param {Array<{role:string,content:string}>} messages
 * @param {{ apiKey?: string, model?: string }} opts
 * @returns {Promise<string>} assistant reply text
 */
export async function generateReply(messages, opts = {}) {
  const apiKey = opts.apiKey;
  if (!apiKey) {
    const err = new Error("Missing OpenAI API key");
    err.code = "NO_API_KEY";
    throw err;
  }

  const history = sanitizeMessages(messages);
  if (history.length === 0) {
    const err = new Error("No user message provided");
    err.code = "EMPTY_INPUT";
    throw err;
  }

  const model = opts.model || DEFAULT_MODEL;

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 600,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const err = new Error(`OpenAI request failed (${res.status})`);
    err.code = "OPENAI_ERROR";
    err.status = res.status;
    err.detail = detail.slice(0, 500);
    throw err;
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    const err = new Error("Empty response from OpenAI");
    err.code = "OPENAI_EMPTY";
    throw err;
  }
  return reply;
}
