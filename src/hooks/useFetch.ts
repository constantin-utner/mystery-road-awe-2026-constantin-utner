import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setData(null);
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result: T | null = await response.json();

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error ? error.message : "Unbekannter Fehler",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, [url]);

  const isEmpty =
    !isLoading &&
    error === null &&
    (data === null || (Array.isArray(data) && data.length === 0));

  return { data, isLoading, error, isEmpty };
}
