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
  onToggleBookmark: (evidenceId: string) => void;
  onStatusChange: (evidenceId: string, status: string) => void;
};

const initialFilterState = {
  searchTerm: "",
  selectedType: "",
  selectedPerson: "",
  selectedLocation: "",
  selectedStatus: "",
  selectedRelevance: "",
  sortOrder: "date-desc",
};

export function EvidencePage({
  evidence,
  people,
  locations,
  onToggleBookmark,
  onStatusChange,
}: EvidencePageProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilterState.searchTerm);
  const [selectedType, setSelectedType] = useState(initialFilterState.selectedType);
  const [selectedPerson, setSelectedPerson] = useState(
    initialFilterState.selectedPerson,
  );
  const [selectedLocation, setSelectedLocation] = useState(
    initialFilterState.selectedLocation,
  );
  const [selectedStatus, setSelectedStatus] = useState(
    initialFilterState.selectedStatus,
  );
  const [selectedRelevance, setSelectedRelevance] = useState(
    initialFilterState.selectedRelevance,
  );
  const [sortOrder, setSortOrder] = useState(initialFilterState.sortOrder);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredEvidence = evidence.filter((item) => {
    const searchableText = [item.title, item.summary, ...item.tags]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(normalizedSearchTerm);
    const matchesType = selectedType === "" || item.type === selectedType;

    const matchesPerson =
      selectedPerson === "" || item.personIds.includes(selectedPerson);
    const matchesLocation =
      selectedLocation === "" || item.locationIds.includes(selectedLocation);

    const matchesStatus =
      selectedStatus === "" || item.status === selectedStatus;
    const matchesRelevance =
      selectedRelevance === "" || item.relevance === selectedRelevance;

    return (
      matchesSearch &&
      matchesType &&
      matchesPerson &&
      matchesLocation &&
      matchesStatus &&
      matchesRelevance
    );
  });

  const sortedEvidence = [...filteredEvidence].sort((a, b) => {
    switch (sortOrder) {
      case "date-asc":
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    }
  });

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  function handleClearFilters() {
    setSearchTerm(initialFilterState.searchTerm);
    setSelectedType(initialFilterState.selectedType);
    setSelectedPerson(initialFilterState.selectedPerson);
    setSelectedLocation(initialFilterState.selectedLocation);
    setSelectedStatus(initialFilterState.selectedStatus);
    setSelectedRelevance(initialFilterState.selectedRelevance);
    setSortOrder(initialFilterState.sortOrder);
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
        selectedPerson={selectedPerson}
        onPersonChange={setSelectedPerson}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedRelevance={selectedRelevance}
        onRelevanceChange={setSelectedRelevance}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClearFilters={handleClearFilters}
      />
      <div>
        <EvidenceLoadingIndicator />
        <EvidenceGrid
          evidence={sortedEvidence}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
      {previewEvidence && (
        <EvidenceDetail
          evidence={previewEvidence}
          people={people}
          locations={locations}
          onStatusChange={onStatusChange}
        />
      )}
    </section>
  );
}
