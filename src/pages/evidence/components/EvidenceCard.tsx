import type { Evidence } from "../../../data";
import { formatDate } from "../../../utils";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { BookmarkButton } from "./BookmarkButton";
import { TagBadge } from "./TagBadge";
import { useBookmarks } from "../../../context/BookmarkContext";

type EvidenceCardProps = {
  evidence: Evidence;
};

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  const { bookmarkIds, toggleBookmark } = useBookmarks();

  function handleBookmarkClick() {
    toggleBookmark(evidence.id);
  }

  return (
    <article className="evidence-card">
      <BookmarkButton
        active={bookmarkIds.includes(evidence.id)}
        onToggle={handleBookmarkClick}
      />
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
