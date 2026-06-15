import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, ExternalLink, RefreshCw, Search } from "lucide-react";
import Button from "../ui/Button";
import { useJobListings } from "../../hooks/useJobListings";
import { inputClass } from "../portal/portalStyles";
import {
  AUTH_KEYS,
  readStorage,
  writeStorage,
} from "../../hooks/usePortalAuth";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function JobSearchList({ session }) {
  const { jobs, total, loading, error, keyword, setKeyword, search, refresh } = useJobListings();
  const [saved, setSaved] = useState(() => readStorage(AUTH_KEYS.candidateSavedJobs, []));

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    writeStorage(AUTH_KEYS.candidateSavedJobs, next);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search(keyword);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by keyword, skill, or job title..."
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="!bg-emerald-600 hover:!bg-emerald-700">
            Search
          </Button>
          <button
            type="button"
            onClick={refresh}
            className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-emerald-600"
            aria-label="Refresh jobs"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </form>

      <p className="text-xs text-[var(--text-muted)] mb-4">
        {loading ? "Loading live openings from PRI Global…" : `${total} open position${total === 1 ? "" : "s"} — updated in real time`}
      </p>

      {error && (
        <div className="mb-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-800 dark:text-amber-300">
          {error}. Please try again in a moment.
        </div>
      )}

      <div className="space-y-4">
        {!loading && jobs.length === 0 && !error && (
          <p className="text-sm text-[var(--text-secondary)] py-8 text-center">
            No jobs match your search. Try different keywords or check back soon.
          </p>
        )}

        {jobs.map((job) => (
          <motion.article
            key={job.id}
            layout
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">{job.title}</h3>
                  {job.refNo && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                      Ref {job.refNo}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {job.location}
                  {job.postDate ? ` · Posted ${formatDate(job.postDate)}` : ""}
                </p>
                {job.description && (
                  <p className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="!bg-emerald-600 hover:!bg-emerald-700"
                >
                  Apply <ExternalLink size={14} />
                </Button>
                {session && (
                  <button
                    type="button"
                    onClick={() => toggleSave(job.id)}
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center ${
                      saved.includes(job.id) ? "text-emerald-600 border-emerald-500/40" : "border-[var(--border)]"
                    }`}
                    aria-label="Save job"
                  >
                    <Bookmark size={16} fill={saved.includes(job.id) ? "currentColor" : "none"} />
                  </button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
