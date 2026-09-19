import {
    allEvidence, allPeople,
    notesStore,
    STORAGE_KEY_HYPOTHESIS
} from "./state.js";
import navigateTo from "./navigation.js";
import { openEvidenceDetail } from "./evidence.js";

// ---------------------------------------------------------------------
// WORKSPACE
// ---------------------------------------------------------------------

export function renderWorkspace() {
    renderBookmarksList();
    renderNotesList();
    populateHypothesisDropdowns();
    loadHypothesisFromStorage();
}

function renderBookmarksList() {
    const container = document.getElementById("bookmarksList"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!container) return;

    const bookmarkedItems = allEvidence.filter(ev => ev.bookmarked); // const: Bindung wird nicht neu zugewiesen.

    if (bookmarkedItems.length === 0) {
        container.innerHTML = "<p>No bookmarked evidence yet. Bookmark items from the Evidence view.</p>";
        return;
    }

    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    for (let i = 0; i < bookmarkedItems.length; i++) { // let: Schleifenzähler wird erhöht.
        const ev = bookmarkedItems[i]; // const: Bindung wird nicht neu zugewiesen.
        html += '<div class="mini-list-item"><strong>' + ev.id + "</strong> &mdash; " + ev.title +
            ' <button type="button" class="btn btn-small btn-secondary" data-open-evidence="' + ev.id + '">Open</button></div>';
    }
    container.innerHTML = html;

    const openButtons = container.querySelectorAll("[data-open-evidence]"); // const: Bindung wird nicht neu zugewiesen.
    for (let b = 0; b < openButtons.length; b++) { // let: Schleifenzähler wird erhöht.
        openButtons[b].addEventListener("click", function (e) {
            navigateTo("evidence");
            const id = e.target.getAttribute("data-open-evidence"); // const: Bindung wird nicht neu zugewiesen.
            setTimeout(function () {
                openEvidenceDetail(id);
            }, 0);
        });
    }
}

function renderNotesList() {
    const container = document.getElementById("notesList"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!container) return;

    const noteEntries = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        const note = notesStore[allEvidence[i].id]; // const: Bindung wird nicht neu zugewiesen.
        if (note) {
            noteEntries.push({ index: i, evidenceId: allEvidence[i].id, title: allEvidence[i].title, text: note });
        }
    }

    if (noteEntries.length === 0) {
        container.innerHTML = "<p>No notes yet. Add one from an evidence item's detail view.</p>";
        return;
    }

    let html = ""; // let: HTML-Text wird schrittweise erweitert.
    for (let n = 0; n < noteEntries.length; n++) { // let: Schleifenzähler wird erhöht.
        const entry = noteEntries[n]; // const: Bindung wird nicht neu zugewiesen.
        html += '<div class="mini-list-item"><strong>' + entry.evidenceId + "</strong> &mdash; " + entry.title;
        html += '<div id="noteText-' + entry.index + '">' + entry.text + "</div></div>";
    }
    container.innerHTML = html;
}

export function populateHypothesisDropdowns() {
    const suspectSelect = document.getElementById("hypSuspect"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const evidenceSelect = document.getElementById("hypEvidence"); // const: DOM-Referenz wird nicht neu zugewiesen.
    if (!suspectSelect || !evidenceSelect) return;

    const currentSuspect = suspectSelect.value; // const: Bindung wird nicht neu zugewiesen.
    suspectSelect.innerHTML = '<option value="">Select a person…</option>';
    for (let p = 0; p < allPeople.length; p++) { // let: Schleifenzähler wird erhöht.
        suspectSelect.innerHTML += '<option value="' + allPeople[p].id + '">' + allPeople[p].name + "</option>";
    }
    suspectSelect.value = currentSuspect;

    evidenceSelect.innerHTML = "";
    for (let i = 0; i < allEvidence.length; i++) { // let: Schleifenzähler wird erhöht.
        evidenceSelect.innerHTML += '<option value="' + allEvidence[i].id + '">' + allEvidence[i].id + " - " + allEvidence[i].title + "</option>";
    }
}

export function saveHypothesis() {
    const draft = { // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.
        suspectId: document.getElementById("hypSuspect").value,
        nature: document.getElementById("hypNature").value,
        evidenceIds: getSelectedOptions(document.getElementById("hypEvidence")),
        confidence: document.getElementById("hypConfidence").value,
        explanation: document.getElementById("hypExplanation").value,
        alternative: document.getElementById("hypAlternative").value,
        savedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(STORAGE_KEY_HYPOTHESIS, JSON.stringify(draft));
    } catch (err) {
        console.error("Could not save hypothesis draft", err);
        alert("Your hypothesis could not be saved to local storage.");
        return;
    }

    const msg = document.getElementById("hypothesisSavedMsg"); // const: DOM-Referenz wird nicht neu zugewiesen.
    msg.classList.remove("hidden");
    setTimeout(function () {
        msg.classList.add("hidden");
    }, 2000);
}

function getSelectedOptions(selectEl) {
    const result = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
    for (let i = 0; i < selectEl.options.length; i++) { // let: Schleifenzähler wird erhöht.
        if (selectEl.options[i].selected) result.push(selectEl.options[i].value);
    }
    return result;
}

function loadHypothesisFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_HYPOTHESIS); // const: Bindung wird nicht neu zugewiesen.
    if (!raw) return;

    const draft = JSON.parse(raw); // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.

    document.getElementById("hypSuspect").value = draft.suspectId || "";
    document.getElementById("hypNature").value = draft.nature || "";
    document.getElementById("hypConfidence").value = draft.confidence || 50;
    document.getElementById("hypConfidenceValue").textContent = draft.confidence || 50;
    document.getElementById("hypExplanation").value = draft.explanation || "";
    document.getElementById("hypAlternative").value = draft.alternative || "";

    const evidenceSelect = document.getElementById("hypEvidence"); // const: DOM-Referenz wird nicht neu zugewiesen.
    const savedIds = draft.evidenceIds || []; // const: Bindung wird nicht neu zugewiesen.
    for (let i = 0; i < evidenceSelect.options.length; i++) { // let: Schleifenzähler wird erhöht.
        evidenceSelect.options[i].selected = savedIds.indexOf(evidenceSelect.options[i].value) !== -1;
    }
}
