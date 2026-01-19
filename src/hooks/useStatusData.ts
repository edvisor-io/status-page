import { useState, useEffect, useCallback } from 'react';
import type { StatusData } from '@/types/status';

const STATUS_API_URL = import.meta.env.VITE_STATUS_API_URL || '';

export function useStatusData(refreshInterval = 60000) {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${STATUS_API_URL}/status.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      setError(null);
      setLastFetched(new Date());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, lastFetched, refetch: fetchData };
}
