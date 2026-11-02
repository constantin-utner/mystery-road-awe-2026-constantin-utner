import type { Evidence } from "../../data";
import { EvidenceGrid } from "./components/EvidenceGrid";

type EvidencePageProps = {
  evidence: Evidence[];
};

export function EvidencePage({ evidence }: EvidencePageProps) {
  return (
    <section>
      <h2>Evidence Catalogue</h2>
      <p>{evidence.length} evidence items loaded.</p>
      <EvidenceGrid evidence={evidence} />
    </section>
  );
}
