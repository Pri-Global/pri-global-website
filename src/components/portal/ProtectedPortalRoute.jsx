import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../hooks/usePortalAuth";

/**
 * DEMO ONLY — guards portal routes via localStorage session.
 */
export default function ProtectedPortalRoute({ authKey, redirectTo, children }) {
  if (!isLoggedIn(authKey)) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}
