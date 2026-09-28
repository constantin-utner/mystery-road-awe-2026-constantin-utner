import {
  STORAGE_KEY_BOOKMARKS,
  STORAGE_KEY_NOTES,
  STORAGE_KEY_EVIDENCE_REVIEW,
  notesStore,
  bookmarks,
  setBookmarks,
  setNotesStore,
} from "./state.js";
import type { Evidence, EvidenceRelevance, EvidenceStatus } from "./domain.js";

type EvidenceReview = {
  status: EvidenceStatus;
  relevance: EvidenceRelevance;
};

type EvidenceReviewStore = Record<string, EvidenceReview>;

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isNotesStore(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((note) => typeof note === "string")
  );
}

function isEvidenceStatus(value: unknown): value is EvidenceStatus {
  return value === "unreviewed" || value === "reviewed" || value === "flagged";
}

function isEvidenceRelevance(value: unknown): value is EvidenceRelevance {
  return value === "unknown" || value === "relevant" || value === "irrelevant";
}

function isEvidenceReviewStore(value: unknown): value is EvidenceReviewStore {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((review) => {
    if (
      typeof review !== "object" ||
      review === null ||
      Array.isArray(review)
    ) {
      return false;
    }

    const candidate = review as Record<string, unknown>;
    return (
      isEvidenceStatus(candidate.status) &&
      isEvidenceRelevance(candidate.relevance)
    );
  });
}

// ---------------------------------------------------------------------
// LOCAL STORAGE HELPERS (bookmarks, notes & evidence reviews)
// ---------------------------------------------------------------------

export function saveBookmarksToStorage(): void {
  localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
}

export function loadBookmarksFromStorage(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS); // const: Bindung wird nicht neu zugewiesen.
    const parsed: unknown = raw ? JSON.parse(raw) : []; // const: Bindung wird nicht neu zugewiesen.
    setBookmarks(isStringArray(parsed) ? parsed : []);
  } catch (err) {
    console.warn("Could not read stored bookmarks, starting empty", err);
    setBookmarks([]);
  }
}

export function saveNoteForEvidence(evidenceId: string, text: string): void {
  notesStore[evidenceId] = text;
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notesStore));
}

export function loadNoteForEvidence(evidenceId: string): string {
  return notesStore[evidenceId] ?? "";
}

export function loadNotesFromStorage(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES); // const: Bindung wird nicht neu zugewiesen.
    const parsed: unknown = raw ? JSON.parse(raw) : {}; // const: Bindung wird nicht neu zugewiesen.
    if (!isNotesStore(parsed)) {
      throw new Error("Stored notes must be an object");
    }
    setNotesStore(parsed);
  } catch (err) {
    console.warn("Could not read stored notes, starting empty", err);
    setNotesStore({});
  }
}

export function loadEvidenceReviews(): EvidenceReviewStore {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY_EVIDENCE_REVIEW) || "{}",
    ); // const: Bindung wird nicht neu zugewiesen.
    return isEvidenceReviewStore(value) ? value : {};
  } catch (err) {
    console.warn("Could not read stored evidence reviews, starting empty", err);
    return {};
  }
}

export function saveEvidenceReview(
  ev: Pick<Evidence, "id" | "status" | "relevance">,
): void {
  const reviews = loadEvidenceReviews(); // const: Objekt-Inhalt darf sich ändern; Bindung bleibt gleich.
  reviews[ev.id] = { status: ev.status, relevance: ev.relevance };
  localStorage.setItem(STORAGE_KEY_EVIDENCE_REVIEW, JSON.stringify(reviews));
}

export function loadNoteAsync(evidenceId: string): Promise<string> {
  return Promise.resolve(notesStore[evidenceId] ?? "");
}
