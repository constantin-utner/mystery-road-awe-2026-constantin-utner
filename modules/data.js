import {
    allEvidence, loadingStepsRemaining, currentPage,
    setCaseData, setAllPeople, setAllLocations, setAllTimeline,
    setAllEvidence, setLoadingStepsRemaining,
    setFilteredEvidence, setEvidenceViewLoading
} from "./state.js";
import { renderDashboard } from "./dashboard.js";
import { applyStoredBookmarkFlags, renderEvidenceList, populateEvidenceDropdowns } from "./evidence.js";
import { populateTimelineDropdowns, renderTimeline } from "./timeline.js";
import { populateHypothesisDropdowns } from "./workspace.js";
import { loadEvidenceReviews } from "./storage.js";

// ---------------------------------------------------------------------
// DATA LOADING
// ---------------------------------------------------------------------

function showLoadingOverlay(msg) {
    const overlay = document.getElementById("loadingOverlay"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const text = document.getElementById("loadingText"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (text) text.textContent = msg;
    if (overlay) overlay.classList.remove("hidden");
}

function hideLoadingStep() {
    setLoadingStepsRemaining(loadingStepsRemaining - 1);
    if (loadingStepsRemaining <= 0) {
        const overlay = document.getElementById("loadingOverlay"); // const: DOM-Referenz wird nicht neu zugewiesen.
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

async function loadCorePeopleAndLocations() {
    const caseRes = await fetch("data/case.json");
    const caseJson = await caseRes.json();
    setCaseData(caseJson);

    const peopleRes = await fetch("data/people.json");
    const peopleJson = await peopleRes.json();
    setAllPeople(peopleJson);

    const locationsRes = await fetch("data/locations.json");
    const locationsJson = await locationsRes.json();
    setAllLocations(locationsJson);

    hideLoadingStep();
    renderDashboard();
    populateAllDropdowns();
}

function loadEvidenceData() {
    return fetch("data/evidence.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            const reviews = loadEvidenceReviews();
            const normalizedData = data.map(ev => {
                const review = reviews[ev.id] || {};
                return {
                    ...ev,
                    type: ev.type.toLowerCase(),
                    status: ["unreviewed", "reviewed", "flagged"].includes(review.status)
                        ? review.status : ev.status,
                    relevance: ["unknown", "relevant", "irrelevant"].includes(review.relevance)
                        ? review.relevance : ev.relevance
                };
            });
            setAllEvidence(normalizedData);
            setEvidenceViewLoading(false);
            applyStoredBookmarkFlags();
            setFilteredEvidence([...allEvidence]);
            renderDashboard();
            populateAllDropdowns();
            if (currentPage === "evidence") renderEvidenceList();
        })
        .catch(function (err) {
            console.error("Failed to load evidence.json", err);
            alert("Evidence could not be loaded. Some views may be incomplete.");
        })
        .finally(function () {
            hideLoadingStep();
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

export function loadAllData() {
    showLoadingOverlay("Loading case file…");
    setLoadingStepsRemaining(3);
    return loadCorePeopleAndLocations().then(function () {
        return Promise.all([loadEvidenceData(), loadTimelineData()]);
    });
}
