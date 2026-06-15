/**
 * DEMO ONLY — portal login credentials for localStorage fallback.
 * Works even when Supabase is configured (staging / demo access).
 */

export const CANDIDATE_DEMO = {
  email: "candidate@priglobal.com",
  password: "PRI2025!",
  session: {
    loggedIn: true,
    name: "Alex Johnson",
    role: "candidate",
  },
};

export const CLIENT_DEMO_ACCOUNTS = {
  hiring: {
    email: "hiring@priglobal.com",
    password: "PRI2025!",
    company: "Acme Corp",
    type: "hiring",
  },
  services: {
    email: "services@priglobal.com",
    password: "PRI2025!",
    company: "Acme Corp",
    type: "services",
  },
};

export function matchCandidateDemo(email, password) {
  const normalized = email.trim().toLowerCase();
  if (normalized === CANDIDATE_DEMO.email && password === CANDIDATE_DEMO.password) {
    return {
      loggedIn: true,
      email: normalized,
      name: CANDIDATE_DEMO.session.name,
      role: CANDIDATE_DEMO.session.role,
    };
  }
  return null;
}

export function matchClientDemo(email, password, tab = "hiring") {
  const normalized = email.trim().toLowerCase();
  const byTab = CLIENT_DEMO_ACCOUNTS[tab];
  if (byTab && normalized === byTab.email && password === byTab.password) {
    return {
      loggedIn: true,
      email: normalized,
      company: byTab.company,
      type: byTab.type,
    };
  }

  const match = Object.values(CLIENT_DEMO_ACCOUNTS).find(
    (account) => normalized === account.email && password === account.password
  );
  if (!match) return null;

  return {
    loggedIn: true,
    email: normalized,
    company: match.company,
    type: match.type,
  };
}

export function demoHintForClientTab(tab) {
  const account = CLIENT_DEMO_ACCOUNTS[tab];
  return `${account.email} / ${account.password}`;
}
