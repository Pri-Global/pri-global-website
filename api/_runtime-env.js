/** Merged server env — Vite dev injects .env here; Vercel uses process.env directly. */

let devEnv = {};

export function setServerEnv(env = {}) {
  devEnv = { ...env };
}

export function getServerEnv() {
  return { ...process.env, ...devEnv };
}
