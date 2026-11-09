export async function fetchJson<T>(
  url: string,
  signal: AbortSignal,
): Promise<T | null> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
