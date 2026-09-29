import {
  allEvidence,
  allPeople,
  allLocations,
  allTimeline,
  caseData,
  bookmarks,
} from "./state.js";
import { formatDate, getStatusBadgeClass } from "./utils.js";

// ---------------------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------------------

function statCardHTML(value: number, label: string): string {
  return (
    '<div class="stat-card"><div class="stat-value">' +
    value +
    '</div><div class="stat-label">' +
    label +
    "</div></div>"
  );
}

export function renderDashboard(): void {
  const container = document.getElementById("dashboardContent"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  let reviewedCount = 0; // let: Zähler wird erhöht.
  for (const evidence of allEvidence) {
    if ((evidence.status || "").toLowerCase() === "reviewed") reviewedCount++;
  }

  const progressPct =
    allEvidence.length === 0
      ? 0
      : Math.round((reviewedCount / allEvidence.length) * 100); // const: Bindung wird nicht neu zugewiesen.

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  html += '<div class="case-summary-card">';
  html += "<h3>" + (caseData.title || "Case") + "</h3>";
  html +=
    '<p><span class="badge badge-flagged">' +
    (caseData.status || "unknown").toUpperCase() +
    "</span></p>";
  html += "<p>" + (caseData.summary || "") + "</p>";
  html += "</div>";

  html += '<div class="stat-grid">';
  html += statCardHTML(allEvidence.length, "Evidence items");
  html += statCardHTML(allPeople.length, "People");
  html += statCardHTML(allLocations.length, "Locations");
  html += statCardHTML(bookmarks.length, "Bookmarked");
  html += statCardHTML(reviewedCount, "Reviewed");
  html += "</div>";

  html += '<div class="dashboard-panel">';
  html += "<h3>Review progress</h3>";
  html +=
    '<div class="progress-bar-outer"><div class="progress-bar-inner" style="width:' +
    progressPct +
    '%;"></div></div>';
  html += "<p>" + progressPct + "% of evidence reviewed</p>";
  html += "</div>";

  html += '<div class="dashboard-columns">';

  html += '<div class="dashboard-panel"><h3>Recent evidence</h3>';
  const recentEvidence = allEvidence.slice(-5).reverse(); // const: Bindung wird nicht neu zugewiesen.
  if (recentEvidence.length === 0) {
    html += "<p>No evidence loaded yet.</p>";
  }
  for (const ev of recentEvidence) {
    html +=
      '<div class="mini-list-item"><strong>' +
      ev.id +
      "</strong> &mdash; " +
      ev.title +
      ' <span class="badge ' +
      getStatusBadgeClass(ev.status) +
      '">' +
      ev.status +
      "</span></div>";
  }
  html += "</div>";

  html += '<div class="dashboard-panel"><h3>Recent timeline events</h3>';
  const recentTimeline = allTimeline.slice(-5).reverse(); // const: Bindung wird nicht neu zugewiesen.
  if (recentTimeline.length === 0) {
    html += "<p>No timeline events loaded yet.</p>";
  }
  for (const evt of recentTimeline) {
    html +=
      '<div class="mini-list-item"><strong>' +
      formatDate(evt.time) +
      "</strong><br>" +
      evt.title +
      "</div>";
  }
  html += "</div>";

  html += "</div>";

  container.innerHTML = html;
}
