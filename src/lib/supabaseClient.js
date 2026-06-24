import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

/** Supabase anon keys are JWTs (three dot-separated segments). Reject placeholders like sb_publishable_… */
function isValidSupabaseAnonKey(key) {
  if (!key) return false;
  const parts = key.split(".");
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && isValidSupabaseAnonKey(supabaseAnonKey)
);

/** Null when env vars are missing — avoids crashing the whole app on load. */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
