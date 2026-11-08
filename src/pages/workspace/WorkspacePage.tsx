import { useEffect, useState } from "react";
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
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    console.log(`[Workspace] Start (${delay} ms)`);

    const intervalId = window.setInterval(() => {
      console.log(`[Workspace] Tick (${delay} ms)`);
    }, delay);

    return () => {
      window.clearInterval(intervalId);
      console.log(`[Workspace] Cleanup (${delay} ms)`);
    };
  }, [delay]);

  const bookmarkedEvidence = evidence.filter((item) =>
    bookmarkIds.includes(item.id),
  );
  const notes = loadNotesFromStorage();
  const evidenceWithNotes = evidence.filter((item) => notes[item.id]);

  return (
    <section>
      <h2>Investigator Workspace</h2>
      <button
        type="button"
        onClick={() => setDelay(delay === 1000 ? 2000 : 1000)}
      >
        Switch timer interval ({delay} ms)
      </button>
      <div className="workspace-grid">
        <BookmarkedEvidenceSection evidence={bookmarkedEvidence} />

        <PersonalNotesSection evidence={evidenceWithNotes} notes={notes} />
      </div>

      <HypothesisDraftForm people={people} evidence={evidence} />
    </section>
  );
}
