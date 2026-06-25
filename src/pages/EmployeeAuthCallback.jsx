import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import BrandLogo from "../components/ui/BrandLogo";
import { persistMicrosoftEmployeeSession } from "../services/employeePortal";

export default function EmployeeAuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Completing Microsoft sign-in…");

  useEffect(() => {
    const token = params.get("token");
    const email = params.get("email");
    const name = params.get("name");
    const jobTitle = params.get("jobTitle");

    if (token && email) {
      persistMicrosoftEmployeeSession({ token, email, name, jobTitle });
      navigate("/employee-dashboard", { replace: true });
      return;
    }

    setMessage("Sign-in could not be completed. Redirecting to login…");
    const timer = setTimeout(() => navigate("/employee-login", { replace: true }), 2500);
    return () => clearTimeout(timer);
  }, [navigate, params]);

  return (
    <>
      <SEO title="Employee Sign In" description="Completing employee portal sign-in." url="/employee-auth-callback" noindex />
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
        <div className="text-center">
          <BrandLogo size="lg" className="mx-auto mb-6" />
          <p className="text-sm text-[var(--text-muted)]">{message}</p>
        </div>
      </section>
    </>
  );
}
