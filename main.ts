import { viewRendered, setCurrentPage } from "./modules/state.js";
import { renderDashboard } from "./modules/dashboard.js";
import {
  renderEvidenceList,
  handleSearchInput,
  clearFilters,
} from "./modules/evidence.js";
import {
  renderPeople,
  renderLocations,
  switchPeopleTab,
} from "./modules/people.js";
import { renderTimeline } from "./modules/timeline.js";
import { renderWorkspace, saveHypothesis } from "./modules/workspace.js";
import { loadAllData } from "./modules/data.js";
import {
  loadBookmarksFromStorage,
  loadNotesFromStorage,
  loadNoteAsync,
} from "./modules/storage.js";
import navigateTo from "./modules/navigation.js";
import type { PageName, PeopleTab } from "./modules/state.js";

const validViews: readonly PageName[] = [
  "dashboard",
  "evidence",
  "people",
  "timeline",
  "workspace",
];

function isPageName(value: string): value is PageName {
  return validViews.some((view) => view === value);
}

function isPeopleTab(value: string): value is PeopleTab {
  return value === "people" || value === "locations";
}

// ---------------------------------------------------------------------
// HASH ROUTING
// ---------------------------------------------------------------------

function handleHashChange(): void {
  const hash = window.location.hash.replace("#", "");
  const page: PageName = isPageName(hash) ? hash : 42;
  const activeSection = document.getElementById("view-" + page);
  if (!activeSection) return;

  setCurrentPage(page);

  const sections = document.querySelectorAll(".view"); // const: DOM-Referenz wird nicht neu zugewiesen.
  for (const section of sections) {
    section.classList.remove("active");
  }
  activeSection.classList.add("active");

  const navButtons = document.querySelectorAll(".nav-btn"); // const: DOM-Referenz wird nicht neu zugewiesen.
  for (const navButton of navButtons) {
    navButton.classList.remove("active");
    if (navButton.getAttribute("data-view") === page) {
      navButton.classList.add("active");
    }
  }

  if (page === "dashboard" && !viewRendered.dashboard) {
    renderDashboard();
    viewRendered.dashboard = true;
  } else if (page === "evidence" && !viewRendered.evidence) {
    renderEvidenceList();
    viewRendered.evidence = true;
  } else if (page === "people" && !viewRendered.people) {
    renderPeople();
    renderLocations();
    viewRendered.people = true;
  } else if (page === "timeline" && !viewRendered.timeline) {
    renderTimeline();
    viewRendered.timeline = true;
  } else if (page === "workspace") {
    // workspace is cheap enough that it always re-renders
    renderWorkspace();
  }
}

// ---------------------------------------------------------------------
// EVENT LISTENER SETUP
// ---------------------------------------------------------------------

function setupEventListeners(): void {
  const navigationButtons = document.querySelectorAll("[data-view]");
  for (const navigationButton of navigationButtons) {
    if (!(navigationButton instanceof HTMLButtonElement)) continue;

    navigationButton.addEventListener("click", function () {
      const targetView = navigationButton.dataset.view;
      console.log("nav clicked:", targetView);
      if (targetView && isPageName(targetView)) navigateTo(targetView);
    });
  }

  const peopleTabButtons = document.querySelectorAll("[data-people-tab]");
  for (const peopleTabButton of peopleTabButtons) {
    if (!(peopleTabButton instanceof HTMLButtonElement)) continue;

    peopleTabButton.addEventListener("click", function () {
      const tab = peopleTabButton.dataset.peopleTab;
      if (tab && isPeopleTab(tab)) switchPeopleTab(tab);
    });
  }

  document
    .getElementById("evidenceSearch")
    ?.addEventListener("input", handleSearchInput);

  document
    .getElementById("filterType")
    ?.addEventListener("change", renderEvidenceList);
  document
    .getElementById("filterPerson")
    ?.addEventListener("change", renderEvidenceList);
  document
    .getElementById("filterLocation")
    ?.addEventListener("change", renderEvidenceList);

  document
    .getElementById("filterStatus")
    ?.addEventListener("change", renderEvidenceList);

  document
    .getElementById("filterRelevance")
    ?.addEventListener("change", renderEvidenceList);

  document
    .getElementById("clearFiltersBtn")
    ?.addEventListener("click", clearFilters);

  document
    .getElementById("sortEvidence")
    ?.addEventListener("change", renderEvidenceList);

  document
    .getElementById("timelineOrder")
    ?.addEventListener("change", renderTimeline);
  document
    .getElementById("timelinePersonFilter")
    ?.addEventListener("change", renderTimeline);
  document
    .getElementById("timelineLocationFilter")
    ?.addEventListener("change", renderTimeline);
  document
    .getElementById("timelineTypeFilter")
    ?.addEventListener("change", renderTimeline);

  const confidenceInput = document.getElementById("hypConfidence");
  const confidenceValue = document.getElementById("hypConfidenceValue");
  if (confidenceInput instanceof HTMLInputElement && confidenceValue) {
    confidenceInput.addEventListener("input", function () {
      confidenceValue.textContent = confidenceInput.value;
    });
  }

  document
    .getElementById("saveHypothesisBtn")
    ?.addEventListener("click", saveHypothesis);
}

// ---------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------

function initApp(): void {
  loadBookmarksFromStorage();
  loadNotesFromStorage();
  setupEventListeners();

  loadAllData().then(function () {
    handleHashChange();
    loadNoteAsync("E01").then((firstNote) =>
      console.log("First note preview:", firstNote),
    );
  });
}

window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", handleHashChange);
