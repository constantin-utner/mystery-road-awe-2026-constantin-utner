import type { Evidence } from "../../../data";
import { EvidenceListItem } from "./EvidenceListItem";

type RecentEvidenceProps = {
  evidence: Evidence[];
};

export function RecentEvidence({ evidence }: RecentEvidenceProps) {
  // slice erstellt eine Kopie, damit reverse die Originaldaten nicht verändert.
  const recentEvidence = evidence.slice(-5).reverse();

  return (
    <div className="dashboard-panel">
      <h3>Recent evidence</h3>
      {recentEvidence.length === 0 && <p>No evidence loaded yet.</p>}
      {recentEvidence.map((item) => (
        <EvidenceListItem key={item.id} evidence={item} />
      ))}
    </div>
  );
}
