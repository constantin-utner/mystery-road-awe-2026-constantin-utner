import {
    STORAGE_KEY_BOOKMARKS,
    STORAGE_KEY_NOTES,
    STORAGE_KEY_EVIDENCE_REVIEW,
    notesStore,
    bookmarks,
    setBookmarks,
    setNotesStore
} from "./state.js";

// ---------------------------------------------------------------------
// LOCAL STORAGE HELPERS (bookmarks, notes & evidence reviews)
// ---------------------------------------------------------------------


export function saveBookmarksToStorage() {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function loadBookmarksFromStorage() {
    try {
        var raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
        var parsed = raw ? JSON.parse(raw) : [];
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
    var raw = localStorage.getItem(STORAGE_KEY_NOTES);
    if (!raw) {
        setNotesStore({});
        return;
    }
    setNotesStore(JSON.parse(raw));
}

export function loadEvidenceReviews() {
    try {
        var value = JSON.parse(localStorage.getItem(STORAGE_KEY_EVIDENCE_REVIEW) || "{}");
        return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch (err) {
        console.warn("Could not read stored evidence reviews, starting empty", err);
        return {};
    }
}

export function saveEvidenceReview(ev) {
    var reviews = loadEvidenceReviews();
    reviews[ev.id] = { status: ev.status, relevance: ev.relevance };
    localStorage.setItem(STORAGE_KEY_EVIDENCE_REVIEW, JSON.stringify(reviews));
}

export function loadNoteAsync(evidenceId) {
    return new Promise(function (resolve) {
        resolve(notesStore[evidenceId] || "");
    });
}
