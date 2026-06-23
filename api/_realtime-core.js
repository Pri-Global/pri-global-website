// Framework-agnostic core for PriVa voice (OpenAI Realtime API).
// Mints a short-lived ephemeral client secret server-side so the browser can
// open a WebRTC session WITHOUT ever seeing the real OPENAI_API_KEY. The PriVa
// instructions + knowledge are baked into the session here, so they never ship
// to the client either.
import { VOICE_INSTRUCTIONS } from "./_knowledge.js";

const CLIENT_SECRETS_URL = "https://api.openai.com/v1/realtime/client_secrets";
const DEFAULT_MODEL = "gpt-realtime";
const DEFAULT_VOICE = "marin";

/**
 * Create an ephemeral Realtime session token.
 * @param {{ apiKey?: string, model?: string, voice?: string }} opts
 * @returns {Promise<{ value: string, expires_at?: number, model: string, voice: string }>}
 */
export async function createRealtimeSession(opts = {}) {
  const apiKey = opts.apiKey;
  if (!apiKey) {
    const err = new Error("Missing OpenAI API key");
    err.code = "NO_API_KEY";
    throw err;
  }

  const model = opts.model || DEFAULT_MODEL;
  const voice = opts.voice || DEFAULT_VOICE;

  const res = await fetch(CLIENT_SECRETS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      session: {
        type: "realtime",
        model,
        instructions: VOICE_INSTRUCTIONS,
        audio: {
          input: {
            // Server-side voice activity detection => natural turn-taking.
            turn_detection: { type: "server_vad" },
            // Transcribe the USER's speech so it can be shown in the chat log.
            // Without this, input_audio_transcription events never fire.
            transcription: { model: opts.transcribeModel || "gpt-4o-mini-transcribe" },
          },
          output: { voice },
        },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const err = new Error(`Realtime session request failed (${res.status})`);
    err.code = "OPENAI_ERROR";
    err.status = res.status;
    err.detail = detail.slice(0, 800);
    throw err;
  }

  const data = await res.json();
  // The ephemeral key is returned in `value` (newer API) — fall back to the
  // older `client_secret.value` shape just in case.
  const value = data?.value || data?.client_secret?.value;
  if (!value) {
    const err = new Error("No ephemeral key in Realtime response");
    err.code = "OPENAI_EMPTY";
    err.detail = JSON.stringify(data).slice(0, 800);
    throw err;
  }

  return {
    value,
    expires_at: data?.expires_at || data?.client_secret?.expires_at,
    model,
    voice,
  };
}
