// ---------------------------------------------------------------------
// GLOBAL STATE
// ---------------------------------------------------------------------

export let allEvidence = [];
export let filteredEvidence = [];
export let selectedEvidence = null;
export let bookmarks = [];
export let currentPage = "dashboard";

export let allPeople = [];
export let allLocations = [];
export let allTimeline = [];
export let caseData = {};

export let currentPeopleTab = "people";
export let loadingStepsRemaining = 2;
export let evidenceViewLoading = true;

export let viewRendered = {
  dashboard: false,
  evidence: false,
  people: false,
  timeline: false,
  workspace: false,
};

export let notesStore = {};
export let modalCloseListenerCount = 0;

export const STORAGE_KEY_BOOKMARKS = "remotion_bookmarks";
export const STORAGE_KEY_NOTES = "remotion_notes";
export const STORAGE_KEY_HYPOTHESIS = "remotion_hypothesis";
export const STORAGE_KEY_EVIDENCE_REVIEW = "remotion_evidence_review";

// SETTERS
export function setBookmarks(val) {
  bookmarks = val;
}
export function setNotesStore(val) {
  notesStore = val;
}
export function setFilteredEvidence(val) {
  filteredEvidence = val;
}
export function setSelectedEvidence(val) {
  selectedEvidence = val;
}
export function setModalCloseListenerCount(val) {
  modalCloseListenerCount = val;
}
export function setCaseData(val) {
  caseData = val;
}
export function setAllPeople(val) {
  allPeople = val;
}
export function setAllLocations(val) {
  allLocations = val;
}
export function setAllTimeline(val) {
  allTimeline = val;
}
export function setAllEvidence(val) {
  allEvidence = val;
}
export function setLoadingStepsRemaining(val) {
  loadingStepsRemaining = val;
}
export function setCurrentPage(val) {
  currentPage = val;
}
export function setCurrentPeopleTab(val) {
  currentPeopleTab = val;
}
export function setEvidenceViewLoading(value) {
  evidenceViewLoading = value;
}
