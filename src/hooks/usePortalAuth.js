import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { signOutSupabase } from "../lib/portalSupabaseAuth";

/**
 * Browser session helpers for candidate and customer portals (localStorage + optional Supabase sign-out).
 */

export const AUTH_KEYS = {
  candidate: "pri-candidate-auth",
  customer: "pri-customer-auth",
  candidateProfile: "pri-candidate-profile",
  candidateApplications: "pri-candidate-applications",
  candidateSavedJobs: "pri-candidate-saved-jobs",
  candidateDashboardCache: "pri-candidate-dashboard-cache",
};

export function readAuth(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeAuth(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearAuth(key) {
  localStorage.removeItem(key);
}

export function isLoggedIn(key) {
  return Boolean(readAuth(key)?.loggedIn);
}

export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function displayNameFromEmail(email) {
  if (!email) return "User";
  const local = email.split("@")[0] || "user";
  return local
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function usePortalAuth(authKey, redirectTo) {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await signOutSupabase();
    clearAuth(authKey);
    navigate(redirectTo, { replace: true });
  }, [authKey, redirectTo, navigate]);

  // Memoize on raw localStorage string so consumers can safely use `session` in effect deps.
  const authRaw = typeof window !== "undefined" ? localStorage.getItem(authKey) : null;
  const session = useMemo(() => {
    if (!authRaw) return null;
    try {
      return JSON.parse(authRaw);
    } catch {
      return null;
    }
  }, [authRaw]);

  return { session, logout, isAuthenticated: Boolean(session?.loggedIn) };
}
