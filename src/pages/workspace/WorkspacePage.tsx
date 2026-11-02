import type { Evidence } from "../../data";
import { loadBookmarksFromStorage, loadNotesFromStorage } from "../../storage";
import { BookmarkedEvidenceSection } from "./components/BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./components/PersonalNotesSection";

type WorkspacePageProps = {
  evidence: Evidence[];
};

export function WorkspacePage({ evidence }: WorkspacePageProps) {
  const bookmarks = loadBookmarksFromStorage();
  const bookmarkedEvidence = evidence.filter((item) =>
    bookmarks.includes(item.id),
  );
  const notes = loadNotesFromStorage();
  const evidenceWithNotes = evidence.filter((item) => notes[item.id]);

  return (
    <section>
      <h2>Investigator Workspace</h2>
      <div className="workspace-grid">
        <BookmarkedEvidenceSection evidence={bookmarkedEvidence} />

        <PersonalNotesSection evidence={evidenceWithNotes} notes={notes} />
      </div>

      <section className="hypothesis-card">
        <h3>Hypothesis Draft</h3>
      </section>
    </section>
  );
}
