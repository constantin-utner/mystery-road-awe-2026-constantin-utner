import type { Evidence } from "../../../data";
import { OpenEvidenceButton } from "./OpenEvidenceButton";

type BookmarkedEvidenceItemProps = {
  evidence: Evidence;
};

export function BookmarkedEvidenceItem({
  evidence,
}: BookmarkedEvidenceItemProps) {
  return (
    <div className="mini-list-item">
      <strong>{evidence.id}</strong> — {evidence.title} <OpenEvidenceButton />
    </div>
  );
}
