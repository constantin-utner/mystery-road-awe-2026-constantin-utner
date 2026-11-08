import type { Evidence } from "../../../data";
import { BookmarkedEvidenceItem } from "./BookmarkedEvidenceItem";

type BookmarkedEvidenceSectionProps = {
  evidence: Evidence[];
};

export function BookmarkedEvidenceSection({
  evidence,
}: BookmarkedEvidenceSectionProps) {
  return (
    <section className="workspace-col">
      <h3>Bookmarked Evidence</h3>
      <div className="bookmarks-list">
        {evidence.length === 0 && (
          <div className="empty-state">
            <h4>Noch keine Lesezeichen</h4>
            <p>Markiere einen Beweis in der Evidence-Ansicht.</p>
          </div>
        )}

        {evidence.map((item) => (
          <BookmarkedEvidenceItem key={item.id} evidence={item} />
        ))}
      </div>
    </section>
  );
}
