import { useState, useEffect, useCallback } from "react";
import { fetchLiveJobs } from "../services/jobdivaJobs";

export function useJobListings(initialKeyword = "") {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (searchKeyword = keyword) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLiveJobs({ keyword: searchKeyword, count: 100 });
      setJobs(result.jobs);
      setTotal(result.total);
    } catch (err) {
      setError(err.message || "Unable to load jobs");
      setJobs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    load(keyword);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const search = (nextKeyword = keyword) => {
    setKeyword(nextKeyword);
    load(nextKeyword);
  };

  return { jobs, total, loading, error, keyword, setKeyword, search, refresh: () => load(keyword) };
}
