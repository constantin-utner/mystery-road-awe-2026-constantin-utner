import {
  allPeople,
  allLocations,
  allEvidence,
  setCurrentPeopleTab,
} from "./state.js";
import { evidenceMentionsPerson } from "./utils.js";
import navigateTo from "./navigation.js";
import { renderEvidenceList } from "./evidence.js";
import type { Person } from "./domain.js";
import type { PeopleTab } from "./state.js";

// ---------------------------------------------------------------------
// PEOPLE & LOCATIONS
// ---------------------------------------------------------------------

export function switchPeopleTab(tab: PeopleTab): void {
  const peoplePanel = document.getElementById("peoplePanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const locationsPanel = document.getElementById("locationsPanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const peopleTabBtn = document.getElementById("tabPeopleBtn"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const locationsTabBtn = document.getElementById("tabLocationsBtn"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!peoplePanel || !locationsPanel || !peopleTabBtn || !locationsTabBtn)
    return;

  setCurrentPeopleTab(tab);

  if (tab === "people") {
    peoplePanel.classList.remove("hidden");
    locationsPanel.classList.add("hidden");
    peopleTabBtn.classList.add("active");
    locationsTabBtn.classList.remove("active");
  } else {
    peoplePanel.classList.add("hidden");
    locationsPanel.classList.remove("hidden");
    peopleTabBtn.classList.remove("active");
    locationsTabBtn.classList.add("active");
  }
}

function countEvidenceForPerson(person: Person): number {
  let count = 0; // let: Zähler wird erhöht.
  for (const evidence of allEvidence) {
    if (evidenceMentionsPerson(evidence, person)) count++;
  }
  return count;
}

export function renderPeople(): void {
  const container = document.getElementById("peoplePanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const person of allPeople) {
    const count = countEvidenceForPerson(person); // const: Zähler wird nicht neu zugewiesen.

    html += '<div class="person-card">';
    html += '<div class="person-card-header">';
    html +=
      '<img class="person-avatar" src="' +
      person.avatar +
      '" alt="Portrait of ' +
      person.name +
      '">';
    html +=
      "<div><h3>" +
      person.name +
      '</h3><div class="person-role">' +
      person.role +
      "</div></div>";
    html += "</div>";
    html += "<p><strong>Speciality:</strong> " + person.speciality + "</p>";
    html += "<ul>";
    for (const responsibility of person.responsibilities) {
      html += "<li>" + responsibility + "</li>";
    }
    html += "</ul>";
    html +=
      '<div class="person-statement">&ldquo;' +
      person.statement +
      "&rdquo;</div>";
    html +=
      "<p>" +
      count +
      " related evidence item" +
      (count === 1 ? "" : "s") +
      " &mdash; ";
    html +=
      '<button type="button" class="evidence-count-link" data-person-id="' +
      person.id +
      '">view</button></p>';
    html += "</div>";
  }
  container.innerHTML = html;

  const links = container.querySelectorAll<HTMLButtonElement>(
    ".evidence-count-link",
  ); // const: Bindung wird nicht neu zugewiesen.
  for (const link of links) {
    link.addEventListener("click", function (event) {
      const target = event.currentTarget;
      if (!(target instanceof HTMLButtonElement)) return;

      const personId = target.dataset.personId; // const: Bindung wird nicht neu zugewiesen.
      const personSelect = document.getElementById("filterPerson");
      if (!personId || !(personSelect instanceof HTMLSelectElement)) return;

      personSelect.value = personId;
      navigateTo("evidence");
      setTimeout(function () {
        renderEvidenceList();
      }, 0);
    });
  }
}

export function renderLocations(): void {
  const container = document.getElementById("locationsPanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const loc of allLocations) {
    html += '<div class="location-card">';
    html += "<h3>" + loc.id + " &mdash; " + loc.name + "</h3>";
    html += "<p>" + loc.description + "</p>";
    html += "<p><strong>Contains:</strong></p><ul>";
    for (const containedItem of loc.contains) {
      html += "<li>" + containedItem + "</li>";
    }
    html += "</ul></div>";
  }
  container.innerHTML = html;
}
