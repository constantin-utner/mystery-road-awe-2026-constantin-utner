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
          <p>
            No bookmarked evidence yet. Bookmark items from the Evidence view.
          </p>
        )}

        {evidence.map((item) => (
          <BookmarkedEvidenceItem key={item.id} evidence={item} />
        ))}
      </div>
    </section>
  );
}
