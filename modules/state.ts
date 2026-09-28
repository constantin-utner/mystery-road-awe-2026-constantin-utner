// ---------------------------------------------------------------------
// GLOBAL STATE
// ---------------------------------------------------------------------

import type {
  CaseData,
  Evidence,
  Location,
  Person,
  TimelineEvent,
} from "./domain.js";

export type PageName =
  "dashboard" | "evidence" | "people" | "timeline" | "workspace";
export type PeopleTab = "people" | "locations";

export let allEvidence: Evidence[] = [];
export let filteredEvidence: Evidence[] = [];
export let selectedEvidence: Evidence | null = null;
export let bookmarks: string[] = [];
export let currentPage: PageName = "dashboard";

export let allPeople: Person[] = [];
export let allLocations: Location[] = [];
export let allTimeline: TimelineEvent[] = [];
export let caseData: Partial<CaseData> = {};

export let currentPeopleTab: PeopleTab = "people";
export let loadingStepsRemaining = 2;
export let evidenceViewLoading = true;

export const viewRendered: Record<PageName, boolean> = {
  dashboard: false,
  evidence: false,
  people: false,
  timeline: false,
  workspace: false,
};

export let notesStore: Record<string, string> = {};
export let modalCloseListenerCount = 0;

export const STORAGE_KEY_BOOKMARKS = "remotion_bookmarks";
export const STORAGE_KEY_NOTES = "remotion_notes";
export const STORAGE_KEY_HYPOTHESIS = "remotion_hypothesis";
export const STORAGE_KEY_EVIDENCE_REVIEW = "remotion_evidence_review";

// SETTERS
export function setBookmarks(val: string[]): void {
  bookmarks = val;
}
export function setNotesStore(val: Record<string, string>): void {
  notesStore = val;
}
export function setFilteredEvidence(val: Evidence[]): void {
  filteredEvidence = val;
}
export function setSelectedEvidence(val: Evidence | null): void {
  selectedEvidence = val;
}
export function setModalCloseListenerCount(val: number): void {
  modalCloseListenerCount = val;
}
export function setCaseData(val: CaseData): void {
  caseData = val;
}
export function setAllPeople(val: Person[]): void {
  allPeople = val;
}
export function setAllLocations(val: Location[]): void {
  allLocations = val;
}
export function setAllTimeline(val: TimelineEvent[]): void {
  allTimeline = val;
}
export function setAllEvidence(val: Evidence[]): void {
  allEvidence = val;
}
export function setLoadingStepsRemaining(val: number): void {
  loadingStepsRemaining = val;
}
export function setCurrentPage(val: PageName): void {
  currentPage = val;
}
export function setCurrentPeopleTab(val: PeopleTab): void {
  currentPeopleTab = val;
}
export function setEvidenceViewLoading(value: boolean): void {
  evidenceViewLoading = value;
}
