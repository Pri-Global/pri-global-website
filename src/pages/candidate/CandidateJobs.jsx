import SEO from "../../components/SEO";
import PortalLayout from "../../components/portal/PortalLayout";
import CandidateCareersNav from "../../components/portal/CandidateCareersNav";
import JobSearchList from "../../components/portal/JobSearchList";
import { AUTH_KEYS, usePortalAuth, isLoggedIn } from "../../hooks/usePortalAuth";
import { CANDIDATE_NAV } from "../../data/portalNav";

const ACCENT = "#22c55e";

export default function CandidateJobs() {
  const authed = isLoggedIn(AUTH_KEYS.candidate);
  const { session, logout } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");

  const jobSearchContent = (
    <>
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Job Search
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
          Live openings from PRI Global&apos;s job board — contract, contract-to-hire, and direct
          hire roles, synced automatically when new positions are posted.
        </p>
      </div>

      <CandidateCareersNav />
      <JobSearchList session={authed ? session : null} />
    </>
  );

  if (!authed) {
    return (
      <>
        <SEO
          title="Job Search"
          description="Search live open IT positions at PRI Global."
          url="/candidate-jobs"
        />
        <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              <a href="/candidate-login" className="text-emerald-600 hover:underline font-medium">
                Sign in
              </a>{" "}
              to save jobs and track applications in your candidate portal.
            </p>
            {jobSearchContent}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title="Job Search" description="Search IT jobs at PRI Global." url="/candidate-jobs" noindex />
      <PortalLayout
        portalLabel="Candidate Portal"
        accentColor={ACCENT}
        userName={session?.name}
        navItems={CANDIDATE_NAV}
        onLogout={logout}
      >
        {jobSearchContent}
      </PortalLayout>
    </>
  );
}
