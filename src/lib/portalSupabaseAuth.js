import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { displayNameFromEmail } from "../hooks/usePortalAuth";

export { isSupabaseConfigured };

export async function signInWithSupabase(email, password) {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, notConfigured: true };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) return { ok: false, error: error.message };
  if (!data.user?.email) return { ok: false, error: "Sign-in failed." };

  return { ok: true, user: data.user };
}

export async function resetSupabasePassword(email, redirectPath = "/") {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, error: "Password reset is not configured." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}${redirectPath}`,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOutSupabase() {
  if (supabase) await supabase.auth.signOut();
}

/** Empty metadata = allowed during rollout; set portal in Supabase user metadata in production. */
export function hasPortalAccess(user, expectedPortal) {
  const portal = user.user_metadata?.portal;
  if (!portal) return true;
  return portal === expectedPortal;
}

export function formatAuthError(message = "") {
  const msg = message.toLowerCase();
  if (msg.includes("confirm") || msg.includes("verified")) {
    return "Please verify your email first — check your inbox for the confirmation link.";
  }
  if (msg.includes("invalid") || msg.includes("credentials")) {
    return "Email or password incorrect. Check your Supabase account or reset your password.";
  }
  return message;
}

export function candidateSessionFromUser(user, remember = false) {
  return {
    loggedIn: true,
    email: user.email,
    name: user.user_metadata?.name || displayNameFromEmail(user.email),
    role: "candidate",
    candidateId: user.user_metadata?.jobdivaCandidateId || null,
    loginTime: Date.now(),
    remember,
  };
}

export function customerSessionFromUser(user, fallbackType = "hiring") {
  return {
    loggedIn: true,
    email: user.email,
    company: user.user_metadata?.company || "Client Organization",
    type: user.user_metadata?.client_type || fallbackType,
    loginTime: Date.now(),
  };
}

export function employeeSessionFromUser(user, remember = false) {
  return {
    loggedIn: true,
    email: user.email,
    loginTime: Date.now(),
    remember,
  };
}
