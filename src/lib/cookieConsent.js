/** Shared cookie consent + legal copy constants (single source of truth). */

export const COOKIE_CONSENT_KEY = "pri-cookie-consent";

export const LEGAL_EFFECTIVE_DATE = "June 24, 2026";
export const LEGAL_LAST_UPDATED = "June 24, 2026";

export const COMPANY = {
  name: "PRI Global",
  legalName: "PRI India Private Services Limited",
  address: "174 Clarkson Road, Ellisville, MO 63011, USA",
  phone: "636.256.7172",
  email: "info@priglobal.com",
  websites: ["https://priglobal.com"],
};

/** localStorage / sessionStorage used on this site (no third-party ad cookies today). */
export const SITE_STORAGE = [
  {
    name: "pri-cookie-consent",
    type: "localStorage",
    category: "Essential",
    purpose: "Remembers your cookie preference choices.",
    duration: "Until you clear browser data or change settings",
  },
  {
    name: "pri-theme",
    type: "localStorage",
    category: "Essential",
    purpose: "Stores light or dark mode preference.",
    duration: "Until you clear browser data",
  },
  {
    name: "pri-app-loaded",
    type: "sessionStorage",
    category: "Essential",
    purpose: "Shows the initial page loader only once per browser tab session.",
    duration: "Current tab session",
  },
  {
    name: "pri-candidate-auth, pri-customer-auth, priEmployeeSession",
    type: "localStorage",
    category: "Functional",
    purpose: "Portal preview login state when you use demo candidate, client, or employee dashboards.",
    duration: "Until you sign out or clear browser data",
  },
  {
    name: "pri-quiz-result",
    type: "localStorage",
    category: "Functional",
    purpose: "Saves Solution Quiz results so you can resume or review your recommendation.",
    duration: "Until you clear browser data or complete the quiz",
  },
  {
    name: "pri-dark-mode-toast",
    type: "localStorage",
    category: "Functional",
    purpose: "Remembers that the dark-mode hint was dismissed.",
    duration: "Until you clear browser data",
  },
];

export const COOKIE_CATEGORIES = [
  {
    id: "essential",
    title: "Essential",
    locked: true,
    description:
      "Required for the site to work: saving your cookie choice, theme preference, and basic session behavior. These cannot be disabled.",
  },
  {
    id: "functional",
    title: "Functional",
    locked: false,
    defaultOn: true,
    description:
      "Optional features you choose to use: portal preview sessions, Solution Quiz progress, and similar on-device preferences.",
  },
  {
    id: "analytics",
    title: "Analytics",
    locked: false,
    defaultOn: false,
    notInUse: true,
    description:
      "Would help us measure traffic and improve the site. We do not currently run analytics or tracking scripts (e.g. Google Analytics). Your choice is saved for when analytics may be enabled in the future.",
  },
  {
    id: "marketing",
    title: "Marketing",
    locked: false,
    defaultOn: false,
    notInUse: true,
    description:
      "Would be used for personalized content or advertising. We do not currently use marketing or retargeting cookies on this website.",
  },
];

export function readCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(prefs = {}) {
  const stored = {
    essential: true,
    functional: prefs.functional ?? true,
    analytics: prefs.analytics ?? false,
    marketing: prefs.marketing ?? false,
    consentGiven: true,
    consentDate: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(stored));
  return stored;
}

export function consentPrefsFromStored(stored) {
  if (!stored) {
    return { functional: true, analytics: false, marketing: false };
  }
  return {
    functional: stored.functional ?? true,
    analytics: stored.analytics ?? false,
    marketing: stored.marketing ?? false,
  };
}
