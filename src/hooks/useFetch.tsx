import { useEffect, useState, useCallback } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetch<T>(fn: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null); // State to hold the fetched data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const result = await fn();
      setData(result); // Set the fetched data
    } catch (error) {
      const message = (error as Error).message;
      setError(message);
      console.error("Fetch error:", message);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData(); // Automatically fetch data on mount
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
