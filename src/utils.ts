import type { Evidence, Location, Person } from "./data";

export function findEvidenceById(
  id: string,
  evidence: Evidence[],
): Evidence | null {
  return evidence.find((item): boolean => item.id === id) ?? null;
}

export function findPersonById(id: string, people: Person[]): Person | null {
  return people.find((person): boolean => person.id === id) ?? null;
}

export function findLocationById(
  id: string,
  locations: Location[],
): Location | null {
  return locations.find((location): boolean => location.id === id) ?? null;
}

export function evidenceMentionsPerson(
  evidence: Evidence,
  person: Person,
): boolean {
  return evidence.personIds.includes(person.id);
}

export function formatDate(timestamp: string | null | undefined): string {
  if (!timestamp) return "Unknown date";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";

  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
}

export function getStatusBadgeClass(status: string | null | undefined): string {
  const normalizedStatus = (status ?? "").toLowerCase();

  if (normalizedStatus === "reviewed") return "badge-reviewed";
  if (normalizedStatus === "flagged") return "badge-flagged";
  return "badge-unreviewed";
}

export function getRelevanceBadgeClass(
  relevance: string | null | undefined,
): string {
  const normalizedRelevance = (relevance ?? "").toLowerCase();

  if (normalizedRelevance === "relevant") return "badge-relevant";
  return "badge-unreviewed";
}
