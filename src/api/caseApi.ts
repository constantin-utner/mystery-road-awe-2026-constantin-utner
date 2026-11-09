import type {
  CaseData,
  Evidence,
  Location,
  Person,
  TimelineEvent,
} from "../data";
import { fetchJson } from "./fetchJson";

const api = `${import.meta.env.BASE_URL}api`;

export function getCase(signal: AbortSignal) {
  return fetchJson<CaseData>(`${api}/case`, signal);
}

export function getPeople(signal: AbortSignal) {
  return fetchJson<Person[]>(`${api}/people`, signal);
}

export function getLocations(signal: AbortSignal) {
  return fetchJson<Location[]>(`${api}/locations`, signal);
}

export function getEvidence(signal: AbortSignal) {
  return fetchJson<Evidence[]>(`${api}/evidence`, signal);
}

export function getTimeline(signal: AbortSignal) {
  return fetchJson<TimelineEvent[]>(`${api}/timeline`, signal);
}
