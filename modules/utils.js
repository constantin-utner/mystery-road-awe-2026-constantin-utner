import { allEvidence, allPeople, allLocations } from "./state.js";

// ---------------------------------------------------------------------
// GENERIC LOOKUP HELPERS
// ---------------------------------------------------------------------

export function findEvidenceById(id) {
  for (let i = 0; i < allEvidence.length; i++) {
    // let: Schleifenzähler wird erhöht.
    if (allEvidence[i].id === id) return allEvidence[i];
  }
  return null;
}

export function findPersonById(id) {
  for (let i = 0; i < allPeople.length; i++) {
    // let: Schleifenzähler wird erhöht.
    if (allPeople[i].id === id) return allPeople[i];
  }
  return null;
}

export function findLocationById(id) {
  for (let i = 0; i < allLocations.length; i++) {
    // let: Schleifenzähler wird erhöht.
    if (allLocations[i].id === id) return allLocations[i];
  }
  return null;
}

export function evidenceMentionsPerson(ev, person) {
  if (!ev.personIds) return false;
  return (
    ev.personIds.indexOf(person.id) !== -1 ||
    ev.personIds.indexOf(person.name) !== -1
  );
}

export function formatDate(ts) {
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

export function getStatusBadgeClass(status) {
  const s = (status || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
  if (s === "reviewed") return "badge-reviewed";
  if (s === "flagged") return "badge-flagged";
  return "badge-unreviewed";
}

export function getRelevanceBadgeClass(relevance) {
  const r = (relevance || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
  if (r === "relevant") return "badge-relevant";
  return "badge-unreviewed";
}
