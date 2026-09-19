import {
    allEvidence, allPeople, allLocations,
    bookmarks, currentPage, evidenceViewLoading, viewRendered,
    setFilteredEvidence, setBookmarks, setSelectedEvidence
} from "./state.js";
import {
    findEvidenceById, findPersonById, findLocationById,
    formatDate, getStatusBadgeClass, getRelevanceBadgeClass,
    evidenceMentionsPerson
} from "./utils.js";
import { saveBookmarksToStorage, loadNoteForEvidence, saveNoteForEvidence, saveEvidenceReview } from "./storage.js";

// ---------------------------------------------------------------------
// EVIDENCE CATALOGUE
// ---------------------------------------------------------------------

export function populateEvidenceDropdowns() {
    const typeSelect = document.getElementById("filterType"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const personSelect = document.getElementById("filterPerson"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const locationSelect = document.getElementById("filterLocation"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!typeSelect || !personSelect || !locationSelect) return;

    const types = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        const t = allEvidence[i].type.toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
        if (types.indexOf(t) === -1) types.push(t);
    }
    typeSelect.innerHTML = '<option value="">All types</option>';
    for (let ti = 0; ti < types.length; ti++) { // let: Schleifenzähler wird erhöht.
        typeSelect.innerHTML += '<option value="' + types[ti] + '">' + types[ti] + "</option>";
    }

    personSelect.innerHTML = '<option value="">All people</option>';
    for (let p = 0; p < allPeople.length; p++) { // let: Schleifenzähler wird erhöht.
        personSelect.innerHTML += '<option value="' + allPeople[p].id + '">' + allPeople[p].name + "</option>";
    }

    locationSelect.innerHTML = '<option value="">All locations</option>';
    for (let l = 0; l < allLocations.length; l++) { // let: Schleifenzähler wird erhöht.
        locationSelect.innerHTML += '<option value="' + allLocations[l].id + '">' + allLocations[l].id + " - " + allLocations[l].name + "</option>";
    }
}

function getFilteredEvidence() {
    const searchBox = document.getElementById("evidenceSearch"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const searchTerm = searchBox ? searchBox.value.toLowerCase().trim() : ""; // const: Bindung wird nicht neu zugewiesen.
    const typeVal = document.getElementById("filterType").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.
    const personVal = document.getElementById("filterPerson").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.
    const locationVal = document.getElementById("filterLocation").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.
    const statusVal = document.getElementById("filterStatus").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.
    const relevanceVal = document.getElementById("filterRelevance").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.

    const results = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        const item = allEvidence[i]; // const: Bindung wird nicht neu zugewiesen.
        let matches = true; // let: Filter können den Wert auf false setzen.

        if (searchTerm) {
            const haystack = (item.title + " " + item.summary + " " + item.tags.join(" ")).toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
            if (haystack.indexOf(searchTerm) === -1) matches = false;
        }
        if (matches && typeVal && item.type.toLowerCase() !== typeVal) matches = false;
        if (matches && personVal) {
            const person = findPersonById(personVal); // const: Bindung wird nicht neu zugewiesen.
            if (!person || !evidenceMentionsPerson(item, person)) matches = false;
        }
        if (matches && locationVal && item.locationIds.indexOf(locationVal) === -1) matches = false;
        if (matches && statusVal && (item.status || "").toLowerCase() !== statusVal) matches = false;
        if (matches && relevanceVal && (item.relevance || "").toLowerCase() !== relevanceVal) matches = false;

        if (matches) results.push(item);
    }

    setFilteredEvidence(results);
    return results;
}

function getSortedEvidence(items, sortValue) {
    const sorted = [...items]; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.

    if (sortValue === "title-asc") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "title-desc") {
        sorted.sort(function (a, b) { return b.title.localeCompare(a.title); });
    } else if (sortValue === "date-asc") {
        sorted.sort(function (a, b) { return new Date(a.timestamp) - new Date(b.timestamp); });
    } else {
        sorted.sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
    }

    return sorted;
}

export function renderEvidenceList() {
    const container = document.getElementById("evidenceList"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!container) return;

    const loadingIndicator = document.getElementById("evidenceLoadingIndicator"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (evidenceViewLoading) {
        if (loadingIndicator) loadingIndicator.classList.remove("hidden");
        container.innerHTML = "";
        return;
    }
    if (loadingIndicator) loadingIndicator.classList.add("hidden");

    const filtered = getFilteredEvidence(); // const: Bindung wird nicht neu zugewiesen.
    const sortValue = document.getElementById("sortEvidence").value; // const: Ausgelesener Wert wird nicht neu zugewiesen.
    const results = getSortedEvidence(filtered, sortValue); // const: Ergebnisliste wird nicht neu zugewiesen.

    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    if (results.length === 0) {
        html = "<p>No evidence matches the current filters.</p>";
    }
    for (let i = 0; i < results.length; i++) { // let: Schleifenzähler wird erhöht.
        html += renderEvidenceCardHTML(results[i]);
    }
    container.innerHTML = html;

    container.addEventListener("click", handleEvidenceListClick);
}

function renderEvidenceCardHTML(ev) {
    const isBookmarked = bookmarks.indexOf(ev.id) !== -1; // const: Bindung wird nicht neu zugewiesen.
    let html = '<div class="evidence-card" data-id="' + ev.id + '">'; // let: HTML-Text wird schrittweise erweitert.
    html += '<button class="bookmark-btn ' + (isBookmarked ? "active" : "") + '" data-action="bookmark" data-id="' + ev.id + '" aria-label="Toggle bookmark for ' + ev.title + '"><span class="bookmark-icon">' + (isBookmarked ? "★" : "☆") + "</span></button>";
    html += "<h3>" + ev.title + "</h3>";
    html += '<div class="evidence-meta">' + ev.id + " &middot; " + ev.type + " &middot; " + formatDate(ev.timestamp) + "</div>";
    html += '<div class="evidence-summary">' + ev.summary + "</div>";

    if (ev.tags.indexOf("critical") !== -1) {
        html += '<span class="badge badge-critical">Critical</span>';
    }
    html += '<span class="badge ' + getStatusBadgeClass(ev.status) + '">' + ev.status + "</span>";
    html += '<span class="badge ' + getRelevanceBadgeClass(ev.relevance) + '">' + ev.relevance + "</span>";
    html += "<div>";
    for (let t = 0; t < ev.tags.length; t++) { // let: Schleifenzähler wird erhöht.
        html += '<span class="tag-chip">' + ev.tags[t] + "</span>";
    }
    html += "</div>";
    html += "</div>";
    return html;
}

function handleEvidenceListClick(event) {
    const target = event.target; // const: Bindung wird nicht neu zugewiesen.

    if (target.dataset && target.dataset.action === "bookmark") {
        event.stopPropagation();
        handleBookmarkClick(target.dataset.id);
        return;
    }

    const card = target.closest(".evidence-card"); // const: Bindung wird nicht neu zugewiesen.
    if (card) {
        openEvidenceDetail(card.getAttribute("data-id"));
    }
}

function handleBookmarkClick(evidenceId) {
    const ev = findEvidenceById(evidenceId); // const: Bindung wird nicht neu zugewiesen.
    if (!ev) return;

    if (bookmarks.indexOf(evidenceId) === -1) {
        bookmarks.push(evidenceId);
        ev.bookmarked = true;
    } else {
        setBookmarks(bookmarks.filter(function (id) {
            return id !== evidenceId;
        }));
        ev.bookmarked = false;
    }
    saveBookmarksToStorage();
    viewRendered.dashboard = false;
    if (currentPage === "evidence") renderEvidenceList();
}

export function applyStoredBookmarkFlags() {
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        allEvidence[i].bookmarked = bookmarks.indexOf(allEvidence[i].id) !== -1;
    }
}

export function handleSortChange() {
    renderEvidenceList();
}

export function clearFilters() {
    document.getElementById("evidenceSearch").value = "";
    document.getElementById("filterType").value = "";
    document.getElementById("filterPerson").value = "";
    document.getElementById("filterLocation").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterRelevance").value = "";
    renderEvidenceList();
}

function simulateAsyncSearch(term) {
    return new Promise(function (resolve) {
        setTimeout(function () { resolve(term); }, 300);
    });
}

let latestSearchRequestId = 0; // let: Anfrage-ID wird erhöht.

export function handleSearchInput(event) {
    const term = event.target.value; // const: Bindung wird nicht neu zugewiesen.
    const requestId = ++latestSearchRequestId; // const: Bindung wird nicht neu zugewiesen.

    simulateAsyncSearch(term).then(function (resolvedTerm) {
        if (requestId !== latestSearchRequestId) return;
        renderEvidenceList();
    });
}

// ---------------------------------------------------------------------
// EVIDENCE DETAIL
// ---------------------------------------------------------------------

export function openEvidenceDetail(evidenceId) {
    const ev = findEvidenceById(evidenceId); // const: Bindung wird nicht neu zugewiesen.
    if (!ev) return;
    setSelectedEvidence(ev);

    const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.
    section.classList.remove("hidden");

    renderEvidenceDetail(ev);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function closeEvidenceDetail() {
    const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.
    section.classList.add("hidden");
    section.innerHTML = "";
    setSelectedEvidence(null);
}

function renderEvidenceDetail(ev) {
    const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.

    const personNames = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let p = 0; p < ev.personIds.length; p++) { // let: Schleifenzähler wird erhöht.
        const person = findPersonById(ev.personIds[p]); // const: Bindung wird nicht neu zugewiesen.
        personNames.push(person ? person.name : ev.personIds[p]);
    }

    const locationNames = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let l = 0; l < ev.locationIds.length; l++) { // let: Schleifenzähler wird erhöht.
        const loc = findLocationById(ev.locationIds[l]); // const: Bindung wird nicht neu zugewiesen.
        locationNames.push(loc ? loc.id + " - " + loc.name : ev.locationIds[l]);
    }

    let tagsHtml = ""; // let: HTML-Text wird schrittweise erweitert.
    for (let t = 0; t < ev.tags.length; t++) { // let: Schleifenzähler wird erhöht.
        tagsHtml += '<span class="tag-chip">' + ev.tags[t] + "</span>";
    }

    const storedNote = loadNoteForEvidence(ev.id); // const: Bindung wird nicht neu zugewiesen.

    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    html += '<div class="evidence-detail-header">';
    html += "<div><h2>" + ev.title + "</h2>";
    html += '<div class="evidence-meta">' + ev.id + " &middot; " + ev.type + " &middot; " + formatDate(ev.timestamp) + "</div></div>";
    html += '<button type="button" class="btn btn-secondary btn-small" onclick="closeEvidenceDetail()">Close</button>';
    html += "</div>";

    if (ev.tags.indexOf("critical") !== -1) {
        html += '<div class="warning-banner">This item is tagged as critical evidence.</div>';
    }

    html += '<div class="detail-field"><strong>Summary</strong>' + ev.summary + "</div>";
    html += '<div class="evidence-detail-content">' + ev.content + "</div>";
    html += '<div class="detail-field"><strong>Related people</strong>' + personNames.join(", ") + "</div>";
    html += '<div class="detail-field"><strong>Related locations</strong>' + locationNames.join(", ") + "</div>";
    html += '<div class="detail-field"><strong>Tags</strong>' + tagsHtml + "</div>";

    html += '<div class="detail-field"><strong>Review status</strong>';
    html += '<select id="detailStatusSelect">';
    html += statusOptionHTML(ev.status, "unreviewed", "Unreviewed");
    html += statusOptionHTML(ev.status, "reviewed", "Reviewed");
    html += statusOptionHTML(ev.status, "flagged", "Flagged");
    html += "</select></div>";

    html += '<div class="detail-field"><strong>Relevance</strong>';
    html += '<select id="detailRelevanceSelect">';
    html += statusOptionHTML(ev.relevance, "unknown", "Unknown");
    html += statusOptionHTML(ev.relevance, "relevant", "Relevant");
    html += statusOptionHTML(ev.relevance, "irrelevant", "Irrelevant");
    html += "</select></div>";

    html += '<div class="detail-field"><strong>Investigator note</strong>';
    html += '<textarea id="evidenceNoteInput" class="note-textarea" rows="3" data-evidence-id="' + ev.id + '" placeholder="Add a private note about this evidence...">' + storedNote + "</textarea>";
    html += '<button type="button" class="btn btn-primary btn-small" style="margin-top:6px;" onclick="saveCurrentNote()">Save note</button>';
    html += "</div>";

    html += '<div class="detail-field"><strong>Note preview</strong><div id="notePreview">' + storedNote + "</div></div>";

    section.innerHTML = html;

    document.getElementById("detailStatusSelect").addEventListener("change", function (e) {
        ev.status = e.target.value;
        saveEvidenceReview(ev);
        viewRendered.dashboard = false;
        renderEvidenceDetail(ev);
        if (viewRendered.evidence) renderEvidenceList();
    });
    document.getElementById("detailRelevanceSelect").addEventListener("change", function (e) {
        ev.relevance = e.target.value;
        saveEvidenceReview(ev);
        renderEvidenceDetail(ev);
        if (viewRendered.evidence) renderEvidenceList();
    });
}

function statusOptionHTML(current, value, label) {
    const currentLower = (current || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
    const selected = currentLower === value ? " selected" : ""; // const: Bindung wird nicht neu zugewiesen.
    return '<option value="' + value + '"' + selected + ">" + label + "</option>";
}

export function saveCurrentNote() {
    const textarea = document.getElementById("evidenceNoteInput"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!textarea) return;
    const evidenceId = textarea.getAttribute("data-evidence-id"); // const: Bindung wird nicht neu zugewiesen.
    const text = textarea.value; // const: Bindung wird nicht neu zugewiesen.
    saveNoteForEvidence(evidenceId, text);
    const preview = document.getElementById("notePreview"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (preview) preview.innerHTML = text;
}
