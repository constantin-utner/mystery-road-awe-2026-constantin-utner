import type { Evidence } from "../../../data";
import { PersonalNoteItem } from "./PersonalNoteItem";

type PersonalNotesSectionProps = {
  evidence: Evidence[];
  notes: Record<string, string>;
};

export function PersonalNotesSection({
  evidence,
  notes,
}: PersonalNotesSectionProps) {
  return (
    <section className="workspace-col">
      <h3>Personal Notes</h3>
      <p className="hint-text">
        Notes are attached to whichever evidence item is currently open in the
        Evidence view.
      </p>
      <div className="notes-list">
        {evidence.length === 0 && (
          <div className="empty-state">
            <h4>Noch keine Notizen</h4>
            <p>
              Öffne einen Beweis in der Evidence-Ansicht und füge eine Notiz
              hinzu.
            </p>
          </div>
        )}

        {evidence.map((item) => (
          <PersonalNoteItem
            key={item.id}
            evidence={item}
            text={notes[item.id] ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
