import {
  allEvidence,
  loadingStepsRemaining,
  currentPage,
  setCaseData,
  setAllPeople,
  setAllLocations,
  setAllTimeline,
  setAllEvidence,
  setLoadingStepsRemaining,
  setFilteredEvidence,
  setEvidenceViewLoading,
} from "./state.js";
import { renderDashboard } from "./dashboard.js";
import {
  applyStoredBookmarkFlags,
  renderEvidenceList,
  populateEvidenceDropdowns,
} from "./evidence.js";
import { populateTimelineDropdowns, renderTimeline } from "./timeline.js";
import { populateHypothesisDropdowns } from "./workspace.js";
import { loadEvidenceReviews } from "./storage.js";
import type {
  CaseData,
  Evidence,
  Location,
  Person,
  TimelineEvent,
} from "./domain.js";

// ---------------------------------------------------------------------
// DATA LOADING
// ---------------------------------------------------------------------

function showLoadingOverlay(message: string): void {
  const overlay = document.getElementById("loadingOverlay"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const text = document.getElementById("loadingText"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (text) text.textContent = message;
  if (overlay) overlay.classList.remove("hidden");
}

function hideLoadingStep(): void {
  setLoadingStepsRemaining(loadingStepsRemaining - 1);
  if (loadingStepsRemaining <= 0) {
    const overlay = document.getElementById("loadingOverlay"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (overlay) overlay.classList.add("hidden");
  }
}

// Placed here instead of evidence.js to avoid a circular import
// (evidence.js <-> timeline.js/workspace.js).
function populateAllDropdowns(): void {
  populateEvidenceDropdowns();
  populateTimelineDropdowns();
  populateHypothesisDropdowns();
}

async function loadCorePeopleAndLocations(): Promise<void> {
  const caseResponse = await fetch("data/case.json");
  const caseJson: CaseData = await caseResponse.json();
  setCaseData(caseJson);

  const peopleResponse = await fetch("data/people.json");
  const peopleJson: Person[] = await peopleResponse.json();
  setAllPeople(peopleJson);

  const locationsResponse = await fetch("data/locations.json");
  const locationsJson: Location[] = await locationsResponse.json();
  setAllLocations(locationsJson);

  hideLoadingStep();
  renderDashboard();
  populateAllDropdowns();
}

async function loadEvidenceData(): Promise<void> {
  try {
    const response = await fetch("data/evidence.json");
    const data: Evidence[] = await response.json();
    const reviews = loadEvidenceReviews();
    const normalizedData = data.map((evidence) => {
      const review = reviews[evidence.id];
      return {
        ...evidence,
        type: evidence.type.toLowerCase(),
        status: review?.status ?? evidence.status,
        relevance: review?.relevance ?? evidence.relevance,
      };
    });
    setAllEvidence(normalizedData);
    setEvidenceViewLoading(false);
    applyStoredBookmarkFlags();
    setFilteredEvidence([...allEvidence]);
    renderDashboard();
    populateAllDropdowns();
    if (currentPage === "evidence") renderEvidenceList();
  } catch (err) {
    console.error("Failed to load evidence.json", err);
    alert("Evidence could not be loaded. Some views may be incomplete.");
  } finally {
    hideLoadingStep();
  }
}

function loadTimelineData(): Promise<void> {
  return fetch("data/timeline.json")
    .then(function (response): Promise<TimelineEvent[]> {
      return response.json();
    })
    .then(function (data: TimelineEvent[]): void {
      setAllTimeline(data);
      renderDashboard();
      populateAllDropdowns();
      if (currentPage === "timeline") renderTimeline();
    })
    .catch(function (err) {
      console.log("timeline load error", err);
    })
    .finally(function () {
      hideLoadingStep();
    });
}

export async function loadAllData(): Promise<void> {
  showLoadingOverlay("Loading case file…");
  setLoadingStepsRemaining(3);
  await loadCorePeopleAndLocations();
  await Promise.all([loadEvidenceData(), loadTimelineData()]);
}
