import { Link } from "react-router-dom";

/** PriVa disclosure — local knowledge assistant (no external AI API) */
export default function PriVaPrivacyNotice({ className = "" }) {
  return (
    <p className={`text-[10px] leading-relaxed text-[var(--text-muted)] ${className}`}>
      Answers are generated locally from PRI Global website content. Do not share personal or
      confidential information.{" "}
      <Link to="/privacy-policy" className="text-royal dark:text-royaldark hover:underline">
        Privacy Policy
      </Link>
    </p>
  );
}
