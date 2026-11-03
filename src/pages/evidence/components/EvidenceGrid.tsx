import type { Evidence } from "../../../data";
import { EvidenceCard } from "./EvidenceCard";

type EvidenceGridProps = {
  evidence: Evidence[];
  onToggleBookmark: (evidenceId: string) => void;
};

export function EvidenceGrid({
  evidence,
  onToggleBookmark,
}: EvidenceGridProps) {
  return (
    <div className="evidence-grid">
      {evidence.length === 0 && <p>No evidence matches the current filters.</p>}

      {evidence.map((item) => (
        <EvidenceCard
          key={item.id}
          evidence={item}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}
