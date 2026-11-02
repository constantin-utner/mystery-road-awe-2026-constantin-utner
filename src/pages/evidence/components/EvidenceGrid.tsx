import type { Evidence } from "../../../data";
import { EvidenceCard } from "./EvidenceCard";

type EvidenceGridProps = {
  evidence: Evidence[];
};

export function EvidenceGrid({ evidence }: EvidenceGridProps) {
  return (
    <div className="evidence-grid">
      {evidence.length === 0 && <p>No evidence loaded yet.</p>}

      {evidence.map((item) => (
        <EvidenceCard key={item.id} evidence={item} />
      ))}
    </div>
  );
}
