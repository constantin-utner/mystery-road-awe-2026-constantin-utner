import { useState } from "react";
import type { Evidence, Location, Person } from "../../data";
import { EvidenceGrid } from "./components/EvidenceGrid";
import { EvidenceFilters } from "./components/EvidenceFilters";
import { EvidenceDetail } from "./components/EvidenceDetail";
import { EvidenceLoadingIndicator } from "./components/EvidenceLoadingIndicator";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredEvidence = evidence.filter((item) => {
    const searchableText = [item.title, item.summary, ...item.tags]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearchTerm);
    const matchesType =
      selectedType === "" || item.type.toLowerCase() === selectedType;

    return matchesSearch && matchesType;
  });

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  const previewEvidence = evidence[0];

  return (
    <section>
      <h2>Evidence Catalogue</h2>
      <EvidenceFilters
        evidence={evidence}
        people={people}
        locations={locations}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <div>
        <EvidenceLoadingIndicator />
        <EvidenceGrid evidence={filteredEvidence} />
      </div>
      {previewEvidence && (
        <EvidenceDetail
          evidence={previewEvidence}
          people={people}
          locations={locations}
        />
      )}
    </section>
  );
}
