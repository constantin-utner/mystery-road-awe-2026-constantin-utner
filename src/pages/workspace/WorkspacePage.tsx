import type { Evidence, Person } from "../../data";
import { loadNotesFromStorage } from "../../storage";
import { BookmarkedEvidenceSection } from "./components/BookmarkedEvidenceSection";
import { PersonalNotesSection } from "./components/PersonalNotesSection";
import { HypothesisDraftForm } from "./components/HypothesisDraftForm";
import { useBookmarks } from "../../context/BookmarkContext";

type WorkspacePageProps = {
  evidence: Evidence[];
  people: Person[];
};

export function WorkspacePage({ evidence, people }: WorkspacePageProps) {
  const { bookmarkIds } = useBookmarks();
  const bookmarkedEvidence = evidence.filter((item) =>
    bookmarkIds.includes(item.id),
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
