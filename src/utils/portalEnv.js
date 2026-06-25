import { isSupabaseConfigured } from "../lib/supabaseClient";
import { isDemoLoginConfigured } from "../data/portalDemoCredentials";

/** Demo login hints — local dev only, never on production builds. */
export function showDevDemoCredentials() {
  return import.meta.env.DEV && isDemoLoginConfigured();
}

/** Preview demo login — works in production when demo password env is set. */
export function showPortalDemoLogin() {
  return isPortalPreviewMode() && isDemoLoginConfigured();
}

/** Client/customer portals use sample data until Supabase (or another backend) is connected. */
export function isPortalPreviewMode() {
  return !isSupabaseConfigured;
}

/** Employee portal runs on a single test account until Microsoft Teams + Rippling are connected. */
export function isEmployeePortalTestMode() {
  return true;
}
