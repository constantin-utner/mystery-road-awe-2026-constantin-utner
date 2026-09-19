import { allPeople, allLocations, allEvidence, setCurrentPeopleTab } from "./state.js";
import { evidenceMentionsPerson } from "./utils.js";
import navigateTo from "./navigation.js";
import { renderEvidenceList } from "./evidence.js";

// ---------------------------------------------------------------------
// PEOPLE & LOCATIONS
// ---------------------------------------------------------------------

export function switchPeopleTab(tab) {
    setCurrentPeopleTab(tab);
    const peoplePanel = document.getElementById("peoplePanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const locationsPanel = document.getElementById("locationsPanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const peopleTabBtn = document.getElementById("tabPeopleBtn"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const locationsTabBtn = document.getElementById("tabLocationsBtn"); // const: DOM-Referenz wird nicht neu zugewiesen.

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

function countEvidenceForPerson(person) {
    let count = 0; // let: Zähler wird erhöht.
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        if (evidenceMentionsPerson(allEvidence[i], person)) count++;
    }
    return count;
}

export function renderPeople() {
    const container = document.getElementById("peoplePanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    for (let i = 0; i < allPeople.length; i++) { // let: Schleifenzähler wird erhöht.
        const person = allPeople[i]; // const: Bindung wird nicht neu zugewiesen.
        let count = countEvidenceForPerson(person); // let: Zähler wird erhöht.

        html += '<div class="person-card">';
        html += '<div class="person-card-header">';
        html += '<img class="person-avatar" src="' + person.avatar + '" alt="Portrait of ' + person.name + '">';
        html += "<div><h3>" + person.name + "</h3><div class=\"person-role\">" + person.role + "</div></div>";
        html += "</div>";
        html += "<p><strong>Speciality:</strong> " + person.speciality + "</p>";
        html += "<ul>";
        for (let r = 0; r < person.responsibilities.length; r++) { // let: Schleifenzähler wird erhöht.
            html += "<li>" + person.responsibilities[r] + "</li>";
        }
        html += "</ul>";
        html += '<div class="person-statement">&ldquo;' + person.statement + '&rdquo;</div>';
        html += "<p>" + count + " related evidence item" + (count === 1 ? "" : "s") + " &mdash; ";
        html += '<button type="button" class="evidence-count-link" data-person-id="' + person.id + '">view</button></p>';
        html += "</div>";
    }
    container.innerHTML = html;

    const links = container.querySelectorAll(".evidence-count-link"); // const: Bindung wird nicht neu zugewiesen.
    for (let l = 0; l < links.length; l++) { // let: Schleifenzähler wird erhöht.
        links[l].addEventListener("click", function (e) {
            const personId = e.target.getAttribute("data-person-id"); // const: Bindung wird nicht neu zugewiesen.
            document.getElementById("filterPerson").value = personId;
            navigateTo("evidence");
            setTimeout(function () {
                renderEvidenceList();
            }, 0);
        });
    }
}

export function renderLocations() {
    const container = document.getElementById("locationsPanel"); // const: DOM-Referenz wird nicht neu zugewiesen.
    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    for (let i = 0; i < allLocations.length; i++) { // let: Schleifenzähler wird erhöht.
        const loc = allLocations[i]; // const: Bindung wird nicht neu zugewiesen.
        html += '<div class="location-card">';
        html += "<h3>" + loc.id + " &mdash; " + loc.name + "</h3>";
        html += "<p>" + loc.description + "</p>";
        html += "<p><strong>Contains:</strong></p><ul>";
        for (let c = 0; c < loc.contains.length; c++) { // let: Schleifenzähler wird erhöht.
            html += "<li>" + loc.contains[c] + "</li>";
        }
        html += "</ul></div>";
    }
    container.innerHTML = html;
}
