import {
    allEvidence, loadingStepsRemaining, currentPage,
    setCaseData, setAllPeople, setAllLocations, setAllTimeline,
    setAllEvidence, setLoadingStepsRemaining,
    setFilteredEvidence
} from "./state.js";
import { renderDashboard } from "./dashboard.js";
import { applyStoredBookmarkFlags, renderEvidenceList, populateEvidenceDropdowns } from "./evidence.js";
import { populateTimelineDropdowns, renderTimeline } from "./timeline.js";
import { populateHypothesisDropdowns } from "./workspace.js";

// ---------------------------------------------------------------------
// DATA LOADING
// ---------------------------------------------------------------------

function showLoadingOverlay(msg) {
    var overlay = document.getElementById("loadingOverlay");
    var text = document.getElementById("loadingText");
    if (text) text.textContent = msg;
    if (overlay) overlay.classList.remove("hidden");
}

function hideLoadingStep() {
    setLoadingStepsRemaining(loadingStepsRemaining - 1);
    if (loadingStepsRemaining <= 0) {
        var overlay = document.getElementById("loadingOverlay");
        if (overlay) overlay.classList.add("hidden");
    }
}

// Placed here instead of evidence.js to avoid a circular import
// (evidence.js <-> timeline.js/workspace.js).
function populateAllDropdowns() {
    populateEvidenceDropdowns();
    populateTimelineDropdowns();
    populateHypothesisDropdowns();
}

function loadCorePeopleAndLocations() {
    return fetch("data/case.json").then(function (caseRes) {
        return caseRes.json().then(function (caseJson) {
            setCaseData(caseJson);

            return fetch("data/people.json").then(function (peopleRes) {
                return peopleRes.json().then(function (peopleJson) {
                    setAllPeople(peopleJson);

                    return fetch("data/locations.json").then(function (locationsRes) {
                        return locationsRes.json().then(function (locationsJson) {
                            setAllLocations(locationsJson);

                            hideLoadingStep();
                            renderDashboard();
                            populateAllDropdowns();
                        });
                    });
                });
            });
        });
    });
}

function loadEvidenceData() {
    fetch("data/evidence.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            setAllEvidence(data);
            applyStoredBookmarkFlags();
            setFilteredEvidence(allEvidence);
            renderDashboard();
            populateAllDropdowns();
            if (currentPage === "evidence") renderEvidenceList();
        })
        .catch(function (err) {
            console.error("Failed to load evidence.json", err);
            alert("Evidence could not be loaded. Some views may be incomplete.");
        });
}

function loadTimelineData() {
    return fetch("data/timeline.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            setAllTimeline(data);
            renderDashboard();
            if (currentPage === "timeline") renderTimeline();
            populateAllDropdowns();
        })
        .catch(function (err) {
            console.log("timeline load error", err);
        })
        .finally(function () {
            hideLoadingStep();
        });
}

export function loadAllData() {
    showLoadingOverlay("Loading case file…");
    setLoadingStepsRemaining(2);
    return loadCorePeopleAndLocations().then(function () {
        loadEvidenceData();
        loadTimelineData();
    });
}