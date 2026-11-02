import { Button } from "../../../components/shared/Button";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { NotePreview } from "./NotePreview";

type NoteEditorProps = {
  note: string;
};

export function NoteEditor({ note }: NoteEditorProps) {
  return (
    <>
      <div className="detail-field">
        <TextAreaField
          name="evidenceNoteInput"
          label="Investigator note"
          defaultValue={note}
          placeholder="Add a private note about this evidence..."
        />
        <div style={{ marginTop: 6 }}>
          <Button label="Save note" variant="primary" disabled />
        </div>
      </div>

      <NotePreview text={note} />
    </>
  );
}
