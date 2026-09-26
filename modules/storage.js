import {
  STORAGE_KEY_BOOKMARKS,
  STORAGE_KEY_NOTES,
  STORAGE_KEY_EVIDENCE_REVIEW,
  notesStore,
  bookmarks,
  setBookmarks,
  setNotesStore,
} from "./state.js";

// ---------------------------------------------------------------------
// LOCAL STORAGE HELPERS (bookmarks, notes & evidence reviews)
// ---------------------------------------------------------------------

export function saveBookmarksToStorage() {
  localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function loadBookmarksFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS); // const: Bindung wird nicht neu zugewiesen.
    const parsed = raw ? JSON.parse(raw) : []; // const: Bindung wird nicht neu zugewiesen.
    setBookmarks(Array.isArray(parsed) ? parsed : []);
  } catch (err) {
    console.warn("Could not read stored bookmarks, starting empty", err);
    setBookmarks([]);
  }
}

export function saveNoteForEvidence(evidenceId, text) {
  notesStore[evidenceId] = text;
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notesStore));
}

export function loadNoteForEvidence(evidenceId) {
  return notesStore[evidenceId] || "";
}

export function loadNotesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES); // const: Bindung wird nicht neu zugewiesen.
    const parsed = raw ? JSON.parse(raw) : {}; // const: Bindung wird nicht neu zugewiesen.
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Stored notes must be an object");
    }
    setNotesStore(parsed);
  } catch (err) {
    console.warn("Could not read stored notes, starting empty", err);
    setNotesStore({});
  }
}

export function loadEvidenceReviews() {
  try {
    const value = JSON.parse(
      localStorage.getItem(STORAGE_KEY_EVIDENCE_REVIEW) || "{}",
    ); // const: Bindung wird nicht neu zugewiesen.
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch (err) {
    console.warn("Could not read stored evidence reviews, starting empty", err);
    return {};
  }
}

export function saveEvidenceReview(ev) {
  const reviews = loadEvidenceReviews(); // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.
  reviews[ev.id] = { status: ev.status, relevance: ev.relevance };
  localStorage.setItem(STORAGE_KEY_EVIDENCE_REVIEW, JSON.stringify(reviews));
}

export function loadNoteAsync(evidenceId) {
  return new Promise(function (resolve) {
    resolve(notesStore[evidenceId] || "");
  });
}
