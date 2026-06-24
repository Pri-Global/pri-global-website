import { Link } from "react-router-dom";

/** PriVa disclosure — website assistant (server-side AI with local fallback). */
export default function PriVaPrivacyNotice({ className = "" }) {
  return (
    <p className={`text-[10px] leading-relaxed text-[var(--text-muted)] ${className}`}>
      PriVa answers questions about PRI Global using website content. Messages may be processed
      through our secure server (and third-party AI providers when enabled). Do not share personal,
      confidential, or employment-sensitive information in chat.{" "}
      <Link to="/privacy-policy" className="text-royal dark:text-royaldark hover:underline">
        Privacy Policy
      </Link>
    </p>
  );
}
