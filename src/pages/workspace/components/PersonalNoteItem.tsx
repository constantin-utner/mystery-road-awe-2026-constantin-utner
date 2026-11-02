import type { Evidence } from "../../../data";

type PersonalNoteItemProps = {
  evidence: Evidence;
  text: string;
};

export function PersonalNoteItem({ evidence, text }: PersonalNoteItemProps) {
  return (
    <div className="mini-list-item">
      <strong>{evidence.id}</strong> — {evidence.title}
      <div>{text}</div>
    </div>
  );
}
