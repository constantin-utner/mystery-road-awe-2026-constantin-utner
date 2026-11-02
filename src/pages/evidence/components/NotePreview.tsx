type NotePreviewProps = {
  text: string;
};

export function NotePreview({ text }: NotePreviewProps) {
  return (
    <div className="detail-field">
      <strong>Note preview</strong>
      <div>{text}</div>
    </div>
  );
}
