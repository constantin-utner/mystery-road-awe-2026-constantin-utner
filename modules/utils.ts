import { allEvidence, allPeople, allLocations } from "./state.js";
import type {
  Evidence,
  EvidenceRelevance,
  EvidenceStatus,
  Location,
  Person,
} from "./domain.js";

// ---------------------------------------------------------------------
// GENERIC LOOKUP HELPERS
// ---------------------------------------------------------------------

export function findEvidenceById(id: string): Evidence | null {
  return allEvidence.find((evidence) => evidence.id === id) ?? null;
}

export function findPersonById(id: string): Person | null {
  return allPeople.find((person) => person.id === id) ?? null;
}

export function findLocationById(id: string): Location | null {
  return allLocations.find((location) => location.id === id) ?? null;
}

export function evidenceMentionsPerson(ev: Evidence, person: Person): boolean {
  return ev.personIds.includes(person.id) || ev.personIds.includes(person.name);
}

export function formatDate(ts: string | null | undefined): string {
  if (!ts) return "Unknown date";
  const d = new Date(ts); // const: Bindung wird nicht neu zugewiesen.
  if (isNaN(d.getTime())) return ts;
  return (
    d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
}

export function getStatusBadgeClass(
  status: EvidenceStatus | null | undefined,
): string {
  const s = (status || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
  if (s === "reviewed") return "badge-reviewed";
  if (s === "flagged") return "badge-flagged";
  return "badge-unreviewed";
}

export function getRelevanceBadgeClass(
  relevance: EvidenceRelevance | null | undefined,
): string {
  const r = (relevance || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
  if (r === "relevant") return "badge-relevant";
  return "badge-unreviewed";
}
