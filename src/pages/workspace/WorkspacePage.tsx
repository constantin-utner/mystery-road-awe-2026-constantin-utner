import type { Evidence } from "../../data";
import { loadBookmarksFromStorage } from "../../storage";
import { BookmarkedEvidenceSection } from "./components/BookmarkedEvidenceSection";

type WorkspacePageProps = {
  evidence: Evidence[];
};

export function WorkspacePage({ evidence }: WorkspacePageProps) {
  const bookmarks = loadBookmarksFromStorage();
  const bookmarkedEvidence = evidence.filter((item) =>
    bookmarks.includes(item.id),
  );

  return (
    <section>
      <h2>Investigator Workspace</h2>
      <div className="workspace-grid">
        <BookmarkedEvidenceSection evidence={bookmarkedEvidence} />

        <section className="workspace-col">
          <h3>Personal Notes</h3>
          <p className="hint-text">
            Notes are attached to whichever evidence item is currently open in
            the Evidence view.
          </p>
          <div className="notes-list">
            <p>No notes yet. Add one from an evidence item's detail view.</p>
          </div>
        </section>
      </div>

      <section className="hypothesis-card">
        <h3>Hypothesis Draft</h3>
      </section>
    </section>
  );
}
