import type { Evidence, Location, Person } from "../../data";
import { EvidenceGrid } from "./components/EvidenceGrid";
import { EvidenceFilters } from "./components/EvidenceFilters";
import { EvidenceDetail } from "./components/EvidenceDetail";

type EvidencePageProps = {
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
};

export function EvidencePage({
  evidence,
  people,
  locations,
}: EvidencePageProps) {
  const previewEvidence = evidence[0];

  return (
    <section>
      <h2>Evidence Catalogue</h2>
      <EvidenceFilters
        evidence={evidence}
        people={people}
        locations={locations}
      />
      <EvidenceGrid evidence={evidence} />
      {previewEvidence && <EvidenceDetail evidence={previewEvidence} />}
    </section>
  );
}
