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
    var hash = window.location.hash.replace("#", "");
    var validViews = ["dashboard", "evidence", "people", "timeline", "workspace"];
    if (validViews.indexOf(hash) === -1) {
        hash = "dashboard";
    }
    setCurrentPage(hash);

    var sections = document.querySelectorAll(".view");
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove("active");
    }
    document.getElementById("view-" + hash).classList.add("active");

    var navButtons = document.querySelectorAll(".nav-btn");
    for (var n = 0; n < navButtons.length; n++) {
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

    var navButtons = document.querySelectorAll(".nav-btn");
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", function () {
            var targetView = navButtons[i].getAttribute("data-view");
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
        var firstNote = loadNoteAsync("E01").then(firstNote => console.log("First note preview:", firstNote))
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