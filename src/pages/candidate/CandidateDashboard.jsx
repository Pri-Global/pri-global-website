import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PortalCard from "../../components/portal/PortalCard";
import Button from "../../components/ui/Button";
import { INTERVIEW_PREP_LINKS } from "../../data/portalDemoData";
import { STATUS_STYLES } from "../../components/portal/portalStyles";
import { Briefcase, FileText, BookmarkIcon } from "lucide-react";
import { AUTH_KEYS, readStorage, usePortalAuth } from "../../hooks/usePortalAuth";
import {
  fetchCandidateDashboard,
  isLiveCandidateSession,
  readCandidateDashboardCache,
} from "../../services/candidatePortal";

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6 mb-10" aria-hidden>
      <div className="h-28 rounded-2xl bg-[var(--border-subtle)]" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-[var(--border-subtle)]" />
        ))}
      </div>
      <div className="h-40 rounded-2xl bg-[var(--border-subtle)]" />
    </div>
  );
}

export default function CandidateDashboard() {
  const { session } = usePortalAuth(AUTH_KEYS.candidate, "/candidate-login");
  const savedJobIds = readStorage(AUTH_KEYS.candidateSavedJobs, []);
  const initialCache = readCandidateDashboardCache();
  const live = isLiveCandidateSession(session);
  const [loading, setLoading] = useState(() => live && !initialCache);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialCache);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!live) {
        setLoading(false);
        return;
      }

      if (data) setRefreshing(true);

      try {
        const dashboard = await fetchCandidateDashboard(savedJobIds);
        if (active) {
          setData(dashboard);
          setError("");
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to load dashboard.");
      } finally {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [session?.candidateId, session?.sessionToken, session?.loggedIn, live]);

  const profile = data?.profile;
  const applications = data?.applications || [];
  const savedJobs = data?.savedJobs || [];
  const stats = data?.stats || {
    applications: live ? undefined : 0,
    savedJobs: savedJobIds.length,
    profileComplete: 0,
  };
  const completeness = stats.profileComplete ?? 0;
  const showStats = !loading || data;

  return (
    <>
      <SEO title="Candidate Dashboard" description="PRI Global candidate dashboard." url="/candidate-dashboard" noindex />

      {loading && live && <DashboardSkeleton />}

      {refreshing && live && !loading && (
        <p className="text-xs text-[var(--text-muted)] mb-4">Updating…</p>
      )}

      {!live && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-800 dark:text-amber-300">
          <p className="font-semibold mb-1">Preview session — not connected to live data</p>
          <p>
            Register a real account or sign in with your PRI Global credentials to sync profile, applications, and job submissions.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Button to="/candidate-register?mode=manual" size="sm" className="!bg-emerald-600 hover:!bg-emerald-700">
              Create account
            </Button>
            <Button to="/candidate-login" size="sm" variant="secondary">
              Sign in
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-800 dark:text-amber-300">
          {error}
        </div>
      )}

      {showStats && (
      <>
      <section className="mb-8 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Profile Active — Visible to Recruiters
        </span>
        <p className="text-sm text-[var(--text-secondary)] mb-3">
          {profile?.name ? `Welcome back, ${profile.name.split(" ")[0]}.` : "Welcome back."}{" "}
          Your profile is {completeness}% complete.
          {completeness < 100 ? " Add skills and contact details to improve visibility." : ""}
        </p>
        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${completeness}%` }} />
        </div>
        <div className="mt-4">
          <Button to="/candidate-profile" size="sm" variant="secondary">
            Update profile
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <PortalCard icon={FileText} value={stats.applications ?? "—"} label="Active Applications" color="green" />
        <PortalCard icon={Briefcase} value="Live" label="Open Positions on Job Board" color="green" />
        <PortalCard icon={BookmarkIcon} value={String(stats.savedJobs)} label="Saved Jobs" color="green" />
        <PortalCard icon={FileText} value={`${completeness}%`} label="Profile Complete" color="green" />
      </div>

      <section id="applications" className="mb-10 scroll-mt-24">
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">My Applications</h2>
        {loading && live ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-sm text-[var(--text-muted)]">
            Loading applications…
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-sm text-[var(--text-secondary)]">
            No applications yet.{" "}
            <Link to="/candidate-jobs" className="text-emerald-600 font-medium hover:underline">
              Search open roles
            </Link>{" "}
            and apply on PRI Global.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
                  {["Role", "Company", "Status", "Applied", "Action"].map((h) => (
                    <th key={h} className="text-left p-3 font-semibold text-[var(--text-primary)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((row, i) => (
                  <tr key={`${row.jobId}-${row.id}-${i}`} className={i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}>
                    <td className="p-3 font-medium">{row.role}</td>
                    <td className="p-3 text-[var(--text-secondary)]">{row.company}</td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[row.statusColor] || STATUS_STYLES.green}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--text-muted)]">{row.applied}</td>
                    <td className="p-3">
                      {row.jobId ? (
                        <Link to={`/candidate-jobs?job=${row.jobId}`} className="text-emerald-600 text-sm font-medium hover:underline">
                          View
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section id="saved" className="mb-10 scroll-mt-24">
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Saved Jobs</h2>
        {savedJobs.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-sm text-[var(--text-secondary)]">
            Save roles while browsing the job board to review them here.
          </div>
        ) : (
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <div>
                  <p className="font-medium text-[var(--text-primary)]">{job.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {job.company} · {job.location}
                  </p>
                </div>
                <Button to={`/candidate-jobs?job=${job.id}`} size="sm" variant="secondary">
                  View Job
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Open Positions</h2>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-[var(--text-primary)]">Search live IT roles on PRI Global&apos;s job board</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Contract, contract-to-hire, and direct hire — updated daily from our live job board.
            </p>
          </div>
          <Button to="/candidate-jobs" size="sm" className="!bg-emerald-600 hover:!bg-emerald-700 shrink-0">
            Search Jobs <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      <section id="prep" className="scroll-mt-24">
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">Interview Prep Resources</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {INTERVIEW_PREP_LINKS.map((link) => {
            const className =
              "group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-emerald-500/40 transition-colors text-sm font-medium text-[var(--text-primary)]";
            if (link.external) {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {link.label} <ExternalLink size={14} className="text-[var(--text-muted)]" />
                </a>
              );
            }
            return (
              <Link key={link.label} to={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </section>
      </>
      )}
    </>
  );
}
