import { Navigate } from "react-router-dom";

const STORAGE_KEY = "priEmployeeSession";

export function getEmployeeSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setEmployeeSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearEmployeeSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function employeeDisplayName(email) {
  if (!email) return "Employee";
  const local = email.split("@")[0] || "employee";
  return local
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProtectedRoute({ children }) {
  const session = getEmployeeSession();
  if (!session?.loggedIn) {
    return <Navigate to="/employee-login" replace />;
  }
  return children;
}
