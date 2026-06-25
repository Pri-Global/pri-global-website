/**
 * Local demo portal login — password is read from VITE_PORTAL_DEMO_PASSWORD (.env only).
 * Demo emails use example.com (RFC 2606) so real company domains are never paired with secrets.
 */

function demoPassword() {
  const fromEnv = import.meta.env.VITE_PORTAL_DEMO_PASSWORD?.trim() ?? "";
  if (fromEnv) return fromEnv;
  // Local dev fallback when env is not set yet (restart dev server after adding .env).
  if (import.meta.env.DEV) return "pri-portal-test";
  return "";
}

export function getDemoPassword() {
  return demoPassword();
}

export function isDemoLoginConfigured() {
  return demoPassword().length > 0;
}

function matchesDemoPassword(password) {
  const expected = demoPassword();
  return expected.length > 0 && password === expected;
}

export const CANDIDATE_DEMO = {
  email: "candidate@example.com",
  session: {
    loggedIn: true,
    name: "Alex Johnson",
    role: "candidate",
  },
};

export const EMPLOYEE_DEMO = {
  email: "employee@example.com",
  name: "PRI Global Team Member",
};

export const EMPLOYEE_TEST_ACCOUNT = EMPLOYEE_DEMO;

export const CLIENT_DEMO_ACCOUNTS = {
  hiring: {
    email: "hiring-client@example.com",
    company: "Acme Corp",
    type: "hiring",
  },
  services: {
    email: "services-client@example.com",
    company: "Acme Corp",
    type: "services",
  },
};

export function matchCandidateDemo(email, password) {
  if (!matchesDemoPassword(password)) return null;

  const normalized = email.trim().toLowerCase();
  if (normalized !== CANDIDATE_DEMO.email) return null;

  return {
    loggedIn: true,
    email: normalized,
    name: CANDIDATE_DEMO.session.name,
    role: CANDIDATE_DEMO.session.role,
  };
}

export function matchEmployeeDemo(email, password) {
  if (!matchesDemoPassword(password)) return null;

  const normalized = email.trim().toLowerCase();
  if (normalized !== EMPLOYEE_DEMO.email) return null;

  return {
    loggedIn: true,
    email: normalized,
    name: EMPLOYEE_DEMO.name,
  };
}

export function matchClientDemo(email, password, tab = "hiring") {
  if (!matchesDemoPassword(password)) return null;

  const normalized = email.trim().toLowerCase();
  const byTab = CLIENT_DEMO_ACCOUNTS[tab];
  if (byTab && normalized === byTab.email) {
    return {
      loggedIn: true,
      email: normalized,
      company: byTab.company,
      type: byTab.type,
    };
  }

  const match = Object.values(CLIENT_DEMO_ACCOUNTS).find(
    (account) => normalized === account.email
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
  return account.email;
}
