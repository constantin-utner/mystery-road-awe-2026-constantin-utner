import type { Evidence, Location, Person } from "../../data";
import { EvidenceGrid } from "./components/EvidenceGrid";
import { EvidenceFilters } from "./components/EvidenceFilters";

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
  return (
    <section>
      <h2>Evidence Catalogue</h2>
      <EvidenceFilters
        evidence={evidence}
        people={people}
        locations={locations}
      />
      <EvidenceGrid evidence={evidence} />
    </section>
  );
}
