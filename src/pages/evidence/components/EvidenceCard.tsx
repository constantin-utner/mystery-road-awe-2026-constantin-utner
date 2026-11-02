import type { Evidence } from "../../../data";
import { formatDate } from "../../../utils";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { BookmarkButton } from "./BookmarkButton";
import { TagBadge } from "./TagBadge";

type EvidenceCardProps = {
  evidence: Evidence;
};

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <article className="evidence-card">
      <BookmarkButton active={evidence.bookmarked ?? false} />
      <h3>{evidence.title}</h3>
      <div className="evidence-meta">
        {evidence.id} · {evidence.type} · {formatDate(evidence.timestamp)}
      </div>
      <p className="evidence-summary">{evidence.summary}</p>
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
