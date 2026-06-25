import fs from "fs";
import path from "path";
import { getServerEnv } from "./_runtime-env.js";

const STORE_FILE = path.join(process.cwd(), ".rippling-store.json");

function readFileStore() {
  try {
    if (!fs.existsSync(STORE_FILE)) return null;
    return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function writeFileStore(data) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function getRipplingTokens(env = getServerEnv()) {
  const accessToken = env.RIPPLING_ACCESS_TOKEN?.trim();
  const refreshToken = env.RIPPLING_REFRESH_TOKEN?.trim();
  if (accessToken) {
    return {
      accessToken,
      refreshToken: refreshToken || null,
      companyId: env.RIPPLING_COMPANY_ID?.trim() || null,
      companyName: env.RIPPLING_COMPANY_NAME?.trim() || null,
      source: "env",
    };
  }

  const file = readFileStore();
  if (file?.accessToken) return { ...file, source: "file" };
  return null;
}

export function saveRipplingTokens(tokens, env = getServerEnv()) {
  if (env.RIPPLING_ACCESS_TOKEN?.trim()) {
    return getRipplingTokens(env);
  }

  const payload = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken || null,
    expiresAt: tokens.expiresAt || null,
    scope: tokens.scope || null,
    companyId: tokens.companyId || null,
    companyName: tokens.companyName || null,
    connectedAt: Date.now(),
  };
  writeFileStore(payload);
  return payload;
}

export function isRipplingConnected(env = getServerEnv()) {
  return Boolean(getRipplingTokens(env)?.accessToken);
}
