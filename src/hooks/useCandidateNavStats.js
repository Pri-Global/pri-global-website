import { useEffect, useState } from "react";
import { AUTH_KEYS, readStorage } from "./usePortalAuth";
import {
  fetchCandidateDashboard,
  isLiveCandidateSession,
  readCandidateDashboardCache,
} from "../services/candidatePortal";

export function useCandidateNavStats(session) {
  const savedJobIds = readStorage(AUTH_KEYS.candidateSavedJobs, []);
  const cached = readCandidateDashboardCache();
  const [stats, setStats] = useState(() => ({
    applications: cached?.stats?.applications ?? 0,
    savedJobs: cached?.stats?.savedJobs ?? savedJobIds.length,
  }));

  useEffect(() => {
    if (!isLiveCandidateSession(session)) {
      setStats({ applications: 0, savedJobs: savedJobIds.length });
      return;
    }

    let active = true;

    fetchCandidateDashboard(savedJobIds)
      .then((data) => {
        if (!active) return;
        setStats({
          applications: data?.stats?.applications ?? 0,
          savedJobs: data?.stats?.savedJobs ?? savedJobIds.length,
        });
      })
      .catch(() => {
        if (active) {
          setStats((prev) => ({
            applications: prev.applications,
            savedJobs: savedJobIds.length,
          }));
        }
      });

    return () => {
      active = false;
    };
  }, [session?.candidateId, session?.sessionToken, session?.loggedIn]);

  return stats;
}
