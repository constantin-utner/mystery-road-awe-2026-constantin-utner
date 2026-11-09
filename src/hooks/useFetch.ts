import { useEffect, useState } from "react";

export function useFetch<T>(load: (signal: AbortSignal) => Promise<T | null>) {
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
        const result = await load(controller.signal);

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
  }, [load]);

  const isEmpty =
    !isLoading &&
    error === null &&
    (data === null || (Array.isArray(data) && data.length === 0));

  return { data, isLoading, error, isEmpty };
}
