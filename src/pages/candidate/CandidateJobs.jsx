import SEO from "../../components/SEO";
import CandidateCareersNav from "../../components/portal/CandidateCareersNav";
import JobSearchList from "../../components/portal/JobSearchList";
import { PriJobsAppCompact } from "../../components/sections/JobDivaAppSection";
import { AUTH_KEYS, isLoggedIn, readAuth } from "../../hooks/usePortalAuth";

export default function CandidateJobs() {
  const authed = isLoggedIn(AUTH_KEYS.candidate);
  const session = authed ? readAuth(AUTH_KEYS.candidate) : null;

  return (
    <>
      <SEO
        title="IT Job Search — Open Positions"
        description="Search live open IT positions at PRI Global — contract, contract-to-hire, and direct hire roles across technology disciplines. Find your next role today."
        keywords="IT jobs, technology careers, contract IT jobs, PRI Global job search"
        url="/candidate-jobs"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
          { name: "Job Search", url: "/candidate-jobs" },
        ]}
        noindex={authed}
      />
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
      <JobSearchList session={session} />

      <PriJobsAppCompact className="mt-10" />
    </>
  );
}
