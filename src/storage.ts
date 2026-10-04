export type EvidenceReview = {
  status: string;
  relevance: string;
};

export type HypothesisDraft = {
  suspectId: string;
  nature: string;
  evidenceIds: string[];
  confidence: string;
  explanation: string;
  alternative: string;
  savedAt?: string;
};

export function loadBookmarksFromStorage(): string[] {
  const storedBookmarks = localStorage.getItem("remotion_bookmarks");
  return JSON.parse(storedBookmarks ?? "[]");
}

export function saveBookmarksToStorage(bookmarks: string[]): void {
  localStorage.setItem("remotion_bookmarks", JSON.stringify(bookmarks));
}

export function loadNotesFromStorage(): { [evidenceId: string]: string } {
  const storedNotes = localStorage.getItem("remotion_notes");
  return JSON.parse(storedNotes ?? "{}");
}

export function loadNoteForEvidence(evidenceId: string): string {
  const notes = loadNotesFromStorage();
  return notes[evidenceId] ?? "";
}

export function saveNoteForEvidence(evidenceId: string, text: string): void {
  const notes = loadNotesFromStorage();
  notes[evidenceId] = text;
  localStorage.setItem("remotion_notes", JSON.stringify(notes));
}

export function loadEvidenceReviews(): {
  [evidenceId: string]: EvidenceReview;
} {
  const storedReviews = localStorage.getItem("remotion_evidence_review");
  return JSON.parse(storedReviews ?? "{}");
}

export function saveEvidenceReview(
  evidenceId: string,
  status: string,
  relevance: string,
): void {
  const reviews = loadEvidenceReviews();
  reviews[evidenceId] = { status, relevance };
  localStorage.setItem("remotion_evidence_review", JSON.stringify(reviews));
}

export function loadHypothesisFromStorage(): HypothesisDraft | null {
  const storedHypothesis = localStorage.getItem("remotion_hypothesis");
  return JSON.parse(storedHypothesis ?? "null");
}

export function saveHypothesisToStorage(hypothesis: HypothesisDraft): void {
  const draft = {
    ...hypothesis,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem("remotion_hypothesis", JSON.stringify(draft));
}
