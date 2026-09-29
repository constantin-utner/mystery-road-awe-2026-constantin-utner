import {
  allEvidence,
  allPeople,
  allLocations,
  bookmarks,
  currentPage,
  evidenceViewLoading,
  viewRendered,
  setFilteredEvidence,
  setBookmarks,
  setSelectedEvidence,
} from "./state.js";
import {
  findEvidenceById,
  findPersonById,
  findLocationById,
  formatDate,
  getStatusBadgeClass,
  getRelevanceBadgeClass,
  evidenceMentionsPerson,
} from "./utils.js";
import {
  saveBookmarksToStorage,
  loadNoteForEvidence,
  saveNoteForEvidence,
  saveEvidenceReview,
} from "./storage.js";
import type { Evidence, EvidenceRelevance, EvidenceStatus } from "./domain.js";

type EvidenceSort = "title-asc" | "title-desc" | "date-asc" | "date-desc";

function getInputElement(id: string): HTMLInputElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element : null;
}

function getSelectElement(id: string): HTMLSelectElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLSelectElement ? element : null;
}

function getTextAreaElement(id: string): HTMLTextAreaElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLTextAreaElement ? element : null;
}

function isEvidenceSort(value: string): value is EvidenceSort {
  return (
    value === "title-asc" ||
    value === "title-desc" ||
    value === "date-asc" ||
    value === "date-desc"
  );
}

function isEvidenceStatus(value: string): value is EvidenceStatus {
  return value === "unreviewed" || value === "reviewed" || value === "flagged";
}

function isEvidenceRelevance(value: string): value is EvidenceRelevance {
  return value === "unknown" || value === "relevant" || value === "irrelevant";
}

// ---------------------------------------------------------------------
// EVIDENCE CATALOGUE
// ---------------------------------------------------------------------

export function populateEvidenceDropdowns(): void {
  const typeSelect = getSelectElement("filterType"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const personSelect = getSelectElement("filterPerson"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const locationSelect = getSelectElement("filterLocation"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!typeSelect || !personSelect || !locationSelect) return;

  const types: string[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const evidence of allEvidence) {
    const t = evidence.type.toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
    if (types.indexOf(t) === -1) types.push(t);
  }
  typeSelect.innerHTML = '<option value="">All types</option>';
  for (const type of types) {
    typeSelect.innerHTML +=
      '<option value="' + type + '">' + type + "</option>";
  }

  personSelect.innerHTML = '<option value="">All people</option>';
  for (const person of allPeople) {
    personSelect.innerHTML +=
      '<option value="' + person.id + '">' + person.name + "</option>";
  }

  locationSelect.innerHTML = '<option value="">All locations</option>';
  for (const location of allLocations) {
    locationSelect.innerHTML +=
      '<option value="' +
      location.id +
      '">' +
      location.id +
      " - " +
      location.name +
      "</option>";
  }
}

function getFilteredEvidence(): Evidence[] {
  const searchTerm =
    getInputElement("evidenceSearch")?.value.toLowerCase().trim() ?? "";
  const typeVal = getSelectElement("filterType")?.value ?? "";
  const personVal = getSelectElement("filterPerson")?.value ?? "";
  const locationVal = getSelectElement("filterLocation")?.value ?? "";
  const statusVal = getSelectElement("filterStatus")?.value ?? "";
  const relevanceVal = getSelectElement("filterRelevance")?.value ?? "";

  const results: Evidence[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const item of allEvidence) {
    let matches = true; // let: Filter können den Wert auf false setzen.

    if (searchTerm) {
      const haystack = (
        item.title +
        " " +
        item.summary +
        " " +
        item.tags.join(" ")
      ).toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
      if (haystack.indexOf(searchTerm) === -1) matches = false;
    }
    if (matches && typeVal && item.type.toLowerCase() !== typeVal)
      matches = false;
    if (matches && personVal) {
      const person = findPersonById(personVal); // const: Bindung wird nicht neu zugewiesen.
      if (!person || !evidenceMentionsPerson(item, person)) matches = false;
    }
    if (matches && locationVal && item.locationIds.indexOf(locationVal) === -1)
      matches = false;
    if (matches && statusVal && (item.status || "").toLowerCase() !== statusVal)
      matches = false;
    if (
      matches &&
      relevanceVal &&
      (item.relevance || "").toLowerCase() !== relevanceVal
    )
      matches = false;

    if (matches) results.push(item);
  }

  setFilteredEvidence(results);
  return results;
}

function getSortedEvidence(
  items: Evidence[],
  sortValue: EvidenceSort,
): Evidence[] {
  const sorted = [...items]; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.

  if (sortValue === "title-asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "title-desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortValue === "date-asc") {
    sorted.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );
  } else {
    sorted.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  return sorted;
}

export function renderEvidenceList(): void {
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
  const selectedSort = getSelectElement("sortEvidence")?.value ?? "";
  const sortValue: EvidenceSort = isEvidenceSort(selectedSort)
    ? selectedSort
    : "date-desc";
  const results = getSortedEvidence(filtered, sortValue); // const: Ergebnisliste wird nicht neu zugewiesen.

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  if (results.length === 0) {
    html = "<p>No evidence matches the current filters.</p>";
  }
  for (const evidence of results) {
    html += renderEvidenceCardHTML(evidence);
  }
  container.innerHTML = html;

  container.addEventListener("click", handleEvidenceListClick);
}

function renderEvidenceCardHTML(ev: Evidence): string {
  const isBookmarked = bookmarks.indexOf(ev.id) !== -1; // const: Bindung wird nicht neu zugewiesen.
  let html = '<div class="evidence-card" data-id="' + ev.id + '">'; // let: HTML-Text wird schrittweise erweitert.
  html +=
    '<button class="bookmark-btn ' +
    (isBookmarked ? "active" : "") +
    '" data-action="bookmark" data-id="' +
    ev.id +
    '" aria-label="Toggle bookmark for ' +
    ev.title +
    '"><span class="bookmark-icon">' +
    (isBookmarked ? "★" : "☆") +
    "</span></button>";
  html += "<h3>" + ev.title + "</h3>";
  html +=
    '<div class="evidence-meta">' +
    ev.id +
    " &middot; " +
    ev.type +
    " &middot; " +
    formatDate(ev.timestamp) +
    "</div>";
  html += '<div class="evidence-summary">' + ev.summary + "</div>";

  if (ev.tags.indexOf("critical") !== -1) {
    html += '<span class="badge badge-critical">Critical</span>';
  }
  html +=
    '<span class="badge ' +
    getStatusBadgeClass(ev.status) +
    '">' +
    ev.status +
    "</span>";
  html +=
    '<span class="badge ' +
    getRelevanceBadgeClass(ev.relevance) +
    '">' +
    ev.relevance +
    "</span>";
  html += "<div>";
  for (const tag of ev.tags) {
    html += '<span class="tag-chip">' + tag + "</span>";
  }
  html += "</div>";
  html += "</div>";
  return html;
}

function handleEvidenceListClick(event: MouseEvent): void {
  const target = event.target; // const: Bindung wird nicht neu zugewiesen.
  if (!(target instanceof Element)) return;

  const bookmarkButton = target.closest<HTMLElement>(
    '[data-action="bookmark"]',
  );
  const bookmarkId = bookmarkButton?.dataset.id;
  if (bookmarkId) {
    event.stopPropagation();
    handleBookmarkClick(bookmarkId);
    return;
  }

  const card = target.closest<HTMLElement>(".evidence-card"); // const: Bindung wird nicht neu zugewiesen.
  const evidenceId = card?.dataset.id;
  if (evidenceId) openEvidenceDetail(evidenceId);
}

function handleBookmarkClick(evidenceId: string): void {
  const ev = findEvidenceById(evidenceId); // const: Bindung wird nicht neu zugewiesen.
  if (!ev) return;

  if (bookmarks.indexOf(evidenceId) === -1) {
    bookmarks.push(evidenceId);
    ev.bookmarked = true;
  } else {
    setBookmarks(
      bookmarks.filter(function (id) {
        return id !== evidenceId;
      }),
    );
    ev.bookmarked = false;
  }
  saveBookmarksToStorage();
  viewRendered.dashboard = false;
  if (currentPage === "evidence") renderEvidenceList();
}

export function applyStoredBookmarkFlags(): void {
  for (const evidence of allEvidence) {
    evidence.bookmarked = bookmarks.indexOf(evidence.id) !== -1;
  }
}

export function clearFilters(): void {
  const searchInput = getInputElement("evidenceSearch");
  if (searchInput) searchInput.value = "";

  const selectIds = [
    "filterType",
    "filterPerson",
    "filterLocation",
    "filterStatus",
    "filterRelevance",
  ];
  for (const id of selectIds) {
    const select = getSelectElement(id);
    if (select) select.value = "";
  }
  renderEvidenceList();
}

function simulateAsyncSearch(term: string): Promise<string> {
  return new Promise<string>(function (resolve) {
    setTimeout(function () {
      resolve(term);
    }, 300);
  });
}

let latestSearchRequestId = 0; // let: Anfrage-ID wird erhöht.

export function handleSearchInput(event: Event): void {
  const target = event.currentTarget;
  if (!(target instanceof HTMLInputElement)) return;

  const term = target.value; // const: Bindung wird nicht neu zugewiesen.
  const requestId = ++latestSearchRequestId; // const: Bindung wird nicht neu zugewiesen.

  simulateAsyncSearch(term).then(function () {
    if (requestId !== latestSearchRequestId) return;
    renderEvidenceList();
  });
}

// ---------------------------------------------------------------------
// EVIDENCE DETAIL
// ---------------------------------------------------------------------

export function openEvidenceDetail(evidenceId: string): void {
  const ev = findEvidenceById(evidenceId); // const: Bindung wird nicht neu zugewiesen.
  if (!ev) return;

  const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!section) return;

  setSelectedEvidence(ev);
  section.classList.remove("hidden");

  renderEvidenceDetail(ev);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function closeEvidenceDetail(): void {
  const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (section) {
    section.classList.add("hidden");
    section.innerHTML = "";
  }
  setSelectedEvidence(null);
}

function renderEvidenceDetail(ev: Evidence): void {
  const section = document.getElementById("evidenceDetailSection"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!section) return;

  const personNames: string[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const personId of ev.personIds) {
    const person = findPersonById(personId); // const: Bindung wird nicht neu zugewiesen.
    personNames.push(person ? person.name : personId);
  }

  const locationNames: string[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const locationId of ev.locationIds) {
    const loc = findLocationById(locationId); // const: Bindung wird nicht neu zugewiesen.
    locationNames.push(loc ? loc.id + " - " + loc.name : locationId);
  }

  let tagsHtml = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const tag of ev.tags) {
    tagsHtml += '<span class="tag-chip">' + tag + "</span>";
  }

  const storedNote = loadNoteForEvidence(ev.id); // const: Bindung wird nicht neu zugewiesen.

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  html += '<div class="evidence-detail-header">';
  html += "<div><h2>" + ev.title + "</h2>";
  html +=
    '<div class="evidence-meta">' +
    ev.id +
    " &middot; " +
    ev.type +
    " &middot; " +
    formatDate(ev.timestamp) +
    "</div></div>";
  html +=
    '<button type="button" class="btn btn-secondary btn-small" data-action="close-detail">Close</button>';
  html += "</div>";

  if (ev.tags.indexOf("critical") !== -1) {
    html +=
      '<div class="warning-banner">This item is tagged as critical evidence.</div>';
  }

  html +=
    '<div class="detail-field"><strong>Summary</strong>' +
    ev.summary +
    "</div>";
  html += '<div class="evidence-detail-content">' + ev.content + "</div>";
  html +=
    '<div class="detail-field"><strong>Related people</strong>' +
    personNames.join(", ") +
    "</div>";
  html +=
    '<div class="detail-field"><strong>Related locations</strong>' +
    locationNames.join(", ") +
    "</div>";
  html +=
    '<div class="detail-field"><strong>Tags</strong>' + tagsHtml + "</div>";

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
  html +=
    '<textarea id="evidenceNoteInput" class="note-textarea" rows="3" data-evidence-id="' +
    ev.id +
    '" placeholder="Add a private note about this evidence...">' +
    storedNote +
    "</textarea>";
  html +=
    '<button type="button" class="btn btn-primary btn-small" style="margin-top:6px;" data-action="save-note">Save note</button>';
  html += "</div>";

  html +=
    '<div class="detail-field"><strong>Note preview</strong><div id="notePreview">' +
    storedNote +
    "</div></div>";

  section.innerHTML = html;

  const closeButton = section.querySelector('[data-action="close-detail"]');
  if (closeButton instanceof HTMLButtonElement) {
    closeButton.addEventListener("click", closeEvidenceDetail);
  }

  const saveNoteButton = section.querySelector('[data-action="save-note"]');
  if (saveNoteButton instanceof HTMLButtonElement) {
    saveNoteButton.addEventListener("click", saveCurrentNote);
  }

  const statusSelect = getSelectElement("detailStatusSelect");
  statusSelect?.addEventListener("change", function () {
    const status = statusSelect.value;
    if (isEvidenceStatus(status)) {
      ev.status = status;
      saveEvidenceReview(ev);
      viewRendered.dashboard = false;
      renderEvidenceDetail(ev);
      if (viewRendered.evidence) renderEvidenceList();
    }
  });

  const relevanceSelect = getSelectElement("detailRelevanceSelect");
  relevanceSelect?.addEventListener("change", function () {
    const relevance = relevanceSelect.value;
    if (isEvidenceRelevance(relevance)) {
      ev.relevance = relevance;
      saveEvidenceReview(ev);
      renderEvidenceDetail(ev);
      if (viewRendered.evidence) renderEvidenceList();
    }
  });
}

function statusOptionHTML(
  current: EvidenceStatus | EvidenceRelevance,
  value: EvidenceStatus | EvidenceRelevance,
  label: string,
): string {
  const currentLower = (current || "").toLowerCase(); // const: Bindung wird nicht neu zugewiesen.
  const selected = currentLower === value ? " selected" : ""; // const: Bindung wird nicht neu zugewiesen.
  return '<option value="' + value + '"' + selected + ">" + label + "</option>";
}

export function saveCurrentNote(): void {
  const textarea = getTextAreaElement("evidenceNoteInput"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!textarea) return;
  const evidenceId = textarea.dataset.evidenceId; // const: Bindung wird nicht neu zugewiesen.
  if (!evidenceId) return;
  const text = textarea.value; // const: Bindung wird nicht neu zugewiesen.
  saveNoteForEvidence(evidenceId, text);
  const preview = document.getElementById("notePreview"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (preview) preview.innerHTML = text;
}
