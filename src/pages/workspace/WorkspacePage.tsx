import type { Evidence, Person } from "../../data";
import { loadBookmarksFromStorage, loadNotesFromStorage } from "../../storage";
import { BookmarkedEvidenceSection } from "./components/BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./components/PersonalNotesSection";
import { HypothesisDraftForm } from "./components/HypothesisDraftForm";

type WorkspacePageProps = {
  evidence: Evidence[];
  people: Person[];
};

export function WorkspacePage({ evidence, people }: WorkspacePageProps) {
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

      <HypothesisDraftForm people={people} evidence={evidence} />
    </section>
  );
}
