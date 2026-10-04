import type { Evidence } from "../../../data";
import { StatusBadge } from "../../../components/shared/StatusBadge";

type EvidenceListItemProps = {
  evidence: Evidence;
};

export function EvidenceListItem({ evidence }: EvidenceListItemProps) {
  return (
    <div className="mini-list-item">
      <strong>{evidence.id}</strong> — {evidence.title}{" "}
      <StatusBadge status={evidence.status} />
    </div>
  );
}
