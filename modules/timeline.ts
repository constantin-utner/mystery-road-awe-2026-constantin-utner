import {
  allTimeline,
  allPeople,
  allLocations,
  modalCloseListenerCount,
  setModalCloseListenerCount,
} from "./state.js";
import { findEvidenceById, findLocationById, formatDate } from "./utils.js";
import navigateTo from "./navigation.js";
import { openEvidenceDetail } from "./evidence.js";
import type { TimelineCertainty, TimelineEvent } from "./domain.js";

type TimelineOrder = "asc" | "desc";

function getSelectElement(id: string): HTMLSelectElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLSelectElement ? element : null;
}

function isTimelineOrder(value: string): value is TimelineOrder {
  return value === "asc" || value === "desc";
}

// ---------------------------------------------------------------------
// TIMELINE
// ---------------------------------------------------------------------

export function populateTimelineDropdowns(): void {
  const personSelect = getSelectElement("timelinePersonFilter"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const locationSelect = getSelectElement("timelineLocationFilter"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const typeSelect = getSelectElement("timelineTypeFilter"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!personSelect || !locationSelect || !typeSelect) return;

  personSelect.innerHTML = '<option value="">All people</option>';
  for (const person of allPeople) {
    personSelect.innerHTML +=
      '<option value="' + person.id + '">' + person.name + "</option>";
  }

  locationSelect.innerHTML = '<option value="">All locations</option>';
  for (const location of allLocations) {
    locationSelect.innerHTML +=
      '<option value="' + location.id + '">' + location.id + "</option>";
  }

  const types: string[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const event of allTimeline) {
    if (types.indexOf(event.type) === -1) types.push(event.type);
  }
  typeSelect.innerHTML = '<option value="">All event types</option>';
  for (const type of types) {
    typeSelect.innerHTML +=
      '<option value="' + type + '">' + type + "</option>";
  }
}

export function renderTimeline(): void {
  const container = document.getElementById("timelineContainer"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  const orderValue = getSelectElement("timelineOrder")?.value ?? "";
  const order: TimelineOrder = isTimelineOrder(orderValue) ? orderValue : "asc";
  const personFilter = getSelectElement("timelinePersonFilter")?.value ?? "";
  const locationFilter =
    getSelectElement("timelineLocationFilter")?.value ?? "";
  const typeFilter = getSelectElement("timelineTypeFilter")?.value ?? "";

  const events: TimelineEvent[] = [];
  for (const event of allTimeline) {
    if (
      personFilter &&
      !event.personIds.some((personId) => personId === personFilter)
    )
      continue;
    if (locationFilter && event.locationIds.indexOf(locationFilter) === -1)
      continue;
    if (typeFilter && event.type !== typeFilter) continue;
    events.push(event);
  }

  events.sort(function (a, b) {
    const diff = new Date(a.time).getTime() - new Date(b.time).getTime(); // const: Bindung wird nicht neu zugewiesen.
    return order === "desc" ? -diff : diff;
  });

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const item of events) {
    html += '<div class="timeline-event certainty-' + item.certainty + '">';
    html +=
      '<div class="timeline-time">' +
      formatDate(item.time) +
      '&nbsp;&middot;&nbsp;<span class="badge badge-' +
      certaintyBadgeClass(item.certainty) +
      '">' +
      item.certainty +
      "</span></div>";
    html += "<h3>" + item.title + "</h3>";
    html += '<p class="evidence-meta">Event type: ' + item.type + "</p>";
    html += "<p>" + item.description + "</p>";

    const eventLocationNames: string[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (const locationId of item.locationIds) {
      const evtLoc = findLocationById(locationId); // const: Bindung wird nicht neu zugewiesen.
      eventLocationNames.push(
        evtLoc ? evtLoc.id + " - " + evtLoc.name : locationId,
      );
    }
    if (eventLocationNames.length > 0) {
      html +=
        '<p class="evidence-meta">Location: ' +
        eventLocationNames.join(", ") +
        "</p>";
    }

    for (const evidenceId of item.evidenceIds) {
      html +=
        '<button type="button" class="evidence-link-btn" data-evidence-id="' +
        evidenceId +
        '">View ' +
        evidenceId +
        "</button>";
    }
    html += "</div>";
  }
  if (events.length === 0) {
    html = "<p>No timeline events match the current filters.</p>";
  }
  container.innerHTML = html;

  const linkButtons = container.querySelectorAll(".evidence-link-btn"); // const: Bindung wird nicht neu zugewiesen.
  for (const linkButton of linkButtons) {
    if (!(linkButton instanceof HTMLButtonElement)) continue;

    linkButton.addEventListener("click", function () {
      const evidenceId = linkButton.dataset.evidenceId;
      if (evidenceId) openEvidenceModal(evidenceId);
    });
  }
}

function certaintyBadgeClass(certainty: TimelineCertainty): string {
  if (certainty === "confirmed") return "reviewed";
  if (certainty === "contradictory") return "critical";
  if (certainty === "reported") return "flagged";
  return "unreviewed";
}

// --- Quick-view modal (used from the timeline) -------------------------
function openEvidenceModal(evidenceId: string): void {
  const ev = findEvidenceById(evidenceId); // const: Bindung wird nicht neu zugewiesen.
  if (!ev) return;

  let modal = document.getElementById("quickViewModal"); // let: Fehlendes Modal wird neu erstellt und zugewiesen.
  if (!modal) {
    const createdModal = document.createElement("div");
    createdModal.id = "quickViewModal";
    document.body.appendChild(createdModal);

    createdModal.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (
        target.classList.contains("modal-close-btn") ||
        target.classList.contains("modal-backdrop")
      ) {
        createdModal.innerHTML = "";
      }

      const openFullButton = target.closest("[data-open-full]");
      const fullEvidenceId =
        openFullButton instanceof HTMLElement
          ? openFullButton.dataset.openFull
          : undefined;
      if (fullEvidenceId) {
        createdModal.innerHTML = "";
        navigateTo("evidence");
        setTimeout(function () {
          openEvidenceDetail(fullEvidenceId);
        }, 0);
      }
    });
    setModalCloseListenerCount(modalCloseListenerCount + 1);
    modal = createdModal;
  }

  console.log("modal opened, active close listeners:", modalCloseListenerCount);

  modal.innerHTML =
    '<div class="modal-backdrop"><div class="modal-box">' +
    '<button type="button" class="modal-close-btn" aria-label="Close">&times;</button>' +
    "<h3>" +
    ev.title +
    "</h3>" +
    '<p class="evidence-meta">' +
    ev.id +
    " &middot; " +
    ev.type +
    " &middot; " +
    formatDate(ev.timestamp) +
    "</p>" +
    "<p>" +
    ev.summary +
    "</p>" +
    '<button type="button" class="btn btn-primary btn-small" data-open-full="' +
    ev.id +
    '">Open full evidence</button>' +
    "</div></div>";
}
