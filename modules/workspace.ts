import {
  allEvidence,
  allPeople,
  notesStore,
  STORAGE_KEY_HYPOTHESIS,
} from "./state.js";
import navigateTo from "./navigation.js";
import { openEvidenceDetail } from "./evidence.js";
import type { PersonId } from "./domain.js";

type HypothesisNature = "" | "accidental" | "deliberate" | "unclear";

type HypothesisDraft = {
  suspectId: PersonId | "";
  nature: HypothesisNature;
  evidenceIds: string[];
  confidence: string;
  explanation: string;
  alternative: string;
  savedAt: string;
};

type NoteEntry = {
  index: number;
  evidenceId: string;
  title: string;
  text: string;
};

function getSelectElement(id: string): HTMLSelectElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLSelectElement ? element : null;
}

function getInputElement(id: string): HTMLInputElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element : null;
}

function getTextAreaElement(id: string): HTMLTextAreaElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLTextAreaElement ? element : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPersonId(value: unknown): value is PersonId {
  return (
    typeof value === "string" && allPeople.some((person) => person.id === value)
  );
}

function isHypothesisNature(value: unknown): value is HypothesisNature {
  return (
    value === "" ||
    value === "accidental" ||
    value === "deliberate" ||
    value === "unclear"
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function normalizeConfidence(value: unknown): string {
  const numericValue =
    (typeof value === "string" && value.trim() !== "") ||
    typeof value === "number"
      ? Number(value)
      : Number.NaN;
  if (Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 100)
    return String(numericValue);
  return "50";
}

function parseHypothesisDraft(raw: string): HypothesisDraft | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    return {
      suspectId: isPersonId(parsed.suspectId) ? parsed.suspectId : "",
      nature: isHypothesisNature(parsed.nature) ? parsed.nature : "",
      evidenceIds: isStringArray(parsed.evidenceIds) ? parsed.evidenceIds : [],
      confidence: normalizeConfidence(parsed.confidence),
      explanation:
        typeof parsed.explanation === "string" ? parsed.explanation : "",
      alternative:
        typeof parsed.alternative === "string" ? parsed.alternative : "",
      savedAt: typeof parsed.savedAt === "string" ? parsed.savedAt : "",
    };
  } catch (err) {
    console.warn("Could not read hypothesis draft", err);
    return null;
  }
}

// ---------------------------------------------------------------------
// WORKSPACE
// ---------------------------------------------------------------------

export function renderWorkspace(): void {
  renderBookmarksList();
  renderNotesList();
  populateHypothesisDropdowns();
  loadHypothesisFromStorage();
}

function renderBookmarksList(): void {
  const container = document.getElementById("bookmarksList"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  const bookmarkedItems = allEvidence.filter((ev) => ev.bookmarked); // const: Bindung wird nicht neu zugewiesen.

  if (bookmarkedItems.length === 0) {
    container.innerHTML =
      "<p>No bookmarked evidence yet. Bookmark items from the Evidence view.</p>";
    return;
  }

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const ev of bookmarkedItems) {
    html +=
      '<div class="mini-list-item"><strong>' +
      ev.id +
      "</strong> &mdash; " +
      ev.title +
      ' <button type="button" class="btn btn-small btn-secondary" data-open-evidence="' +
      ev.id +
      '">Open</button></div>';
  }
  container.innerHTML = html;

  const openButtons = container.querySelectorAll("[data-open-evidence]"); // const: Bindung wird nicht neu zugewiesen.
  for (const openButton of openButtons) {
    if (!(openButton instanceof HTMLButtonElement)) continue;

    openButton.addEventListener("click", function () {
      const id = openButton.dataset.openEvidence; // const: Bindung wird nicht neu zugewiesen.
      if (!id) return;

      navigateTo("evidence");
      setTimeout(function () {
        openEvidenceDetail(id);
      }, 0);
    });
  }
}

function renderNotesList(): void {
  const container = document.getElementById("notesList"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!container) return;

  const noteEntries: NoteEntry[] = []; // const: Array-Inhalt darf sich ändern; Bindung bleibt gleich.
  for (const [index, evidence] of allEvidence.entries()) {
    const note = notesStore[evidence.id]; // const: Bindung wird nicht neu zugewiesen.
    if (note) {
      noteEntries.push({
        index,
        evidenceId: evidence.id,
        title: evidence.title,
        text: note,
      });
    }
  }

  if (noteEntries.length === 0) {
    container.innerHTML =
      "<p>No notes yet. Add one from an evidence item's detail view.</p>";
    return;
  }

  let html = ""; // let: HTML-Text wird schrittweise erweitert.
  for (const entry of noteEntries) {
    html +=
      '<div class="mini-list-item"><strong>' +
      entry.evidenceId +
      "</strong> &mdash; " +
      entry.title;
    html +=
      '<div id="noteText-' + entry.index + '">' + entry.text + "</div></div>";
  }
  container.innerHTML = html;
}

export function populateHypothesisDropdowns(): void {
  const suspectSelect = getSelectElement("hypSuspect"); // const: DOM-Referenz wird nicht neu zugewiesen.
  const evidenceSelect = getSelectElement("hypEvidence"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (!suspectSelect || !evidenceSelect) return;

  const currentSuspect = suspectSelect.value; // const: Bindung wird nicht neu zugewiesen.
  suspectSelect.innerHTML = '<option value="">Select a person…</option>';
  for (const person of allPeople) {
    suspectSelect.innerHTML +=
      '<option value="' + person.id + '">' + person.name + "</option>";
  }
  suspectSelect.value = currentSuspect;

  evidenceSelect.innerHTML = "";
  for (const evidence of allEvidence) {
    evidenceSelect.innerHTML +=
      '<option value="' +
      evidence.id +
      '">' +
      evidence.id +
      " - " +
      evidence.title +
      "</option>";
  }
}

export function saveHypothesis(): void {
  const suspectSelect = getSelectElement("hypSuspect");
  const natureSelect = getSelectElement("hypNature");
  const evidenceSelect = getSelectElement("hypEvidence");
  const confidenceInput = getInputElement("hypConfidence");
  const explanationInput = getTextAreaElement("hypExplanation");
  const alternativeInput = getTextAreaElement("hypAlternative");
  if (
    !suspectSelect ||
    !natureSelect ||
    !evidenceSelect ||
    !confidenceInput ||
    !explanationInput ||
    !alternativeInput
  )
    return;

  const draft: HypothesisDraft = {
    // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.
    suspectId: isPersonId(suspectSelect.value) ? suspectSelect.value : "",
    nature: isHypothesisNature(natureSelect.value) ? natureSelect.value : "",
    evidenceIds: getSelectedOptions(evidenceSelect),
    confidence: confidenceInput.value,
    explanation: explanationInput.value,
    alternative: alternativeInput.value,
    savedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY_HYPOTHESIS, JSON.stringify(draft));
  } catch (err) {
    console.error("Could not save hypothesis draft", err);
    alert("Your hypothesis could not be saved to local storage.");
    return;
  }

  const msg = document.getElementById("hypothesisSavedMsg"); // const: DOM-Referenz wird nicht neu zugewiesen.
  if (msg) {
    msg.classList.remove("hidden");
    setTimeout(function () {
      msg.classList.add("hidden");
    }, 2000);
  }
}

function getSelectedOptions(selectEl: HTMLSelectElement): string[] {
  const selectedValues: string[] = [];

  for (const option of selectEl.selectedOptions) {
    selectedValues.push(option.value);
  }

  return selectedValues;
}

function loadHypothesisFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEY_HYPOTHESIS); // const: Bindung wird nicht neu zugewiesen.
  if (!raw) return;

  const draft = parseHypothesisDraft(raw); // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.
  if (!draft) return;

  const suspectSelect = getSelectElement("hypSuspect");
  const natureSelect = getSelectElement("hypNature");
  const confidenceInput = getInputElement("hypConfidence");
  const confidenceValue = document.getElementById("hypConfidenceValue");
  const explanationInput = getTextAreaElement("hypExplanation");
  const alternativeInput = getTextAreaElement("hypAlternative");
  const evidenceSelect = getSelectElement("hypEvidence");

  if (suspectSelect) suspectSelect.value = draft.suspectId;
  if (natureSelect) natureSelect.value = draft.nature;
  if (confidenceInput) confidenceInput.value = draft.confidence;
  if (confidenceValue) confidenceValue.textContent = draft.confidence;
  if (explanationInput) explanationInput.value = draft.explanation;
  if (alternativeInput) alternativeInput.value = draft.alternative;

  if (evidenceSelect) {
    const savedIds = new Set(draft.evidenceIds); // const: Bindung wird nicht neu zugewiesen.
    for (const option of evidenceSelect.options) {
      option.selected = savedIds.has(option.value);
    }
  }
}
