import { useState } from "react";
import { saveNoteForEvidence } from "../../../storage";
import { Button } from "../../../components/shared/Button";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { NotePreview } from "./NotePreview";

type NoteEditorProps = {
  evidenceId: string;
  note: string;
};

export function NoteEditor({ evidenceId, note }: NoteEditorProps) {
  const [draftNote, setDraftNote] = useState(note);
  const [savedNote, setSavedNote] = useState(note);

  function handleSaveNote() {
    saveNoteForEvidence(evidenceId, draftNote);
    setSavedNote(draftNote);
  }

  return (
    <>
      <div className="detail-field">
        <TextAreaField
          name="evidenceNoteInput"
          label="Investigator note"
          value={draftNote}
          onValueChange={setDraftNote}
          placeholder="Add a private note about this evidence..."
        />
        <div style={{ marginTop: 6 }}>
          <Button
            label="Save note"
            variant="primary"
            onClick={handleSaveNote}
          />
        </div>
      </div>

      <NotePreview text={savedNote} />
    </>
  );
}
