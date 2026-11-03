import { useState } from "react";
import type { Evidence } from "../../../data";
import {
  loadBookmarksFromStorage,
  saveBookmarksToStorage,
} from "../../../storage";
import { formatDate } from "../../../utils";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { BookmarkButton } from "./BookmarkButton";
import { TagBadge } from "./TagBadge";

type EvidenceCardProps = {
  evidence: Evidence;
};

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  // Die Arrow Function liest den Storage nur beim Initialisieren, nicht bei jedem Rendern.
  const [isBookmarked, setIsBookmarked] = useState(() =>
    loadBookmarksFromStorage().includes(evidence.id),
  );

  function handleBookmarkClick() {
    const bookmarks = loadBookmarksFromStorage();
    const nextIsBookmarked = !isBookmarked;

    // Exercise 5 | Demo 3 | Task 1: Immutable Lösung.
    // Spread fügt hinzu, filter entfernt. Beide erstellen ein neues Array mit neuer Referenz.
    // Das bisherige Array "bookmarks" bleibt unverändert mit gleicher Referenz.
    const nextBookmarks = nextIsBookmarked
      ? [...bookmarks, evidence.id]
      : bookmarks.filter((id) => id !== evidence.id);

    saveBookmarksToStorage(nextBookmarks);
    setIsBookmarked(nextIsBookmarked);
  }

  return (
    <article className="evidence-card">
      <BookmarkButton active={isBookmarked} onToggle={handleBookmarkClick} />
      <h3>{evidence.title}</h3>
      <div className="evidence-meta">
        {evidence.id} · {evidence.type} · {formatDate(evidence.timestamp)}
      </div>
      <div className="evidence-summary">{evidence.summary}</div>
      {evidence.tags.includes("critical") && (
        <StatusBadge status="Critical" variant="critical" />
      )}
      <StatusBadge status={evidence.status} />
      <StatusBadge status={evidence.relevance} variant="relevance" />
      <div>
        {evidence.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}
