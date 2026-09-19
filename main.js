import { viewRendered, setCurrentPage } from "./modules/state.js";
import { renderDashboard } from "./modules/dashboard.js";
import { renderEvidenceList, handleSearchInput, clearFilters, handleSortChange, closeEvidenceDetail, saveCurrentNote } from "./modules/evidence.js";
import { renderPeople, renderLocations, switchPeopleTab } from "./modules/people.js";
import { renderTimeline } from "./modules/timeline.js";
import { renderWorkspace, saveHypothesis } from "./modules/workspace.js";
import { loadAllData } from "./modules/data.js";
import { loadBookmarksFromStorage, loadNotesFromStorage, loadNoteAsync } from "./modules/storage.js";
import navigateTo from "./modules/navigation.js";


// ---------------------------------------------------------------------
// HASH ROUTING
// ---------------------------------------------------------------------

function handleHashChange() {
    let hash = window.location.hash.replace("#", ""); // let: Ungültiger Hash wird durch dashboard ersetzt.
    const validViews = ["dashboard", "evidence", "people", "timeline", "workspace"]; // const: Bindung wird nicht neu zugewiesen.
    if (validViews.indexOf(hash) === -1) {
        hash = "dashboard";
    }
    setCurrentPage(hash);

    const sections = document.querySelectorAll(".view"); // const: DOM-Referenz wird nicht neu zugewiesen.
    for (let i = 0; i < sections.length; i++) { // let: Schleifenzähler wird erhöht.
        sections[i].classList.remove("active");
    }
    document.getElementById("view-" + hash).classList.add("active");

    const navButtons = document.querySelectorAll(".nav-btn"); // const: DOM-Referenz wird nicht neu zugewiesen.
    for (let n = 0; n < navButtons.length; n++) { // let: Schleifenzähler wird erhöht.
        navButtons[n].classList.remove("active");
        if (navButtons[n].getAttribute("data-view") === hash) {
            navButtons[n].classList.add("active");
        }
    }

    if (hash === "dashboard" && !viewRendered.dashboard) {
        renderDashboard();
        viewRendered.dashboard = true;
    } else if (hash === "evidence" && !viewRendered.evidence) {
        renderEvidenceList();
        viewRendered.evidence = true;
    } else if (hash === "people" && !viewRendered.people) {
        renderPeople();
        renderLocations();
        viewRendered.people = true;
    } else if (hash === "timeline" && !viewRendered.timeline) {
        renderTimeline();
        viewRendered.timeline = true;
    } else if (hash === "workspace") {
        // workspace is cheap enough that it always re-renders
        renderWorkspace();
    }
}

// ---------------------------------------------------------------------
// EVENT LISTENER SETUP
// ---------------------------------------------------------------------

function setupEventListeners() {
    window.addEventListener("hashchange", handleHashChange);

    const navButtons = document.querySelectorAll(".nav-btn"); // const: DOM-Referenz wird nicht neu zugewiesen.
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", function () {
            const targetView = navButtons[i].getAttribute("data-view"); // const: Bindung wird nicht neu zugewiesen.
            console.log("nav clicked:", targetView);
        });
    }

    document.getElementById("evidenceSearch").addEventListener("input", handleSearchInput);

    document.getElementById("filterType").addEventListener("change", renderEvidenceList);
    document.getElementById("filterPerson").addEventListener("change", renderEvidenceList);
    document.getElementById("filterLocation").addEventListener("change", renderEvidenceList);

    document.getElementById("filterStatus").addEventListener("change", renderEvidenceList);
    document.getElementById("filterStatus").setAttribute("onchange", "renderEvidenceList()");

    document.getElementById("filterRelevance").addEventListener("change", renderEvidenceList);

    document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);

    document.getElementById("timelineOrder").addEventListener("change", renderTimeline);
    document.getElementById("timelinePersonFilter").addEventListener("change", renderTimeline);
    document.getElementById("timelineLocationFilter").addEventListener("change", renderTimeline);
    document.getElementById("timelineTypeFilter").addEventListener("change", renderTimeline);

    document.getElementById("hypConfidence").addEventListener("input", function (e) {
        document.getElementById("hypConfidenceValue").textContent = e.target.value;
    });
}

// ---------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------

function initApp() {
    loadBookmarksFromStorage();
    loadNotesFromStorage();
    setupEventListeners();

    loadAllData().then(function () {
        handleHashChange();
        const firstNote = loadNoteAsync("E01").then(firstNote => console.log("First note preview:", firstNote)) // const: Bindung wird nicht neu zugewiesen.
    });
}

window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", handleHashChange);

// ---------------------------------------------------------------------
// WINDOW BRIDGE (for inline onclick/onchange handlers in the HTML)
// ---------------------------------------------------------------------

window.navigateTo = navigateTo;
window.switchPeopleTab = switchPeopleTab;
window.handleSortChange = handleSortChange;
window.saveHypothesis = saveHypothesis;
window.closeEvidenceDetail = closeEvidenceDetail;
window.saveCurrentNote = saveCurrentNote;
window.renderEvidenceList = renderEvidenceList;
