import { useReducer } from "react";
import type { Evidence, Location, Person } from "../../data";
import { EvidenceGrid } from "./components/EvidenceGrid";
import { EvidenceFilters } from "./components/EvidenceFilters";
import { EvidenceDetail } from "./components/EvidenceDetail";
import { EvidenceLoadingIndicator } from "./components/EvidenceLoadingIndicator";

type EvidencePageProps = {
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
  onStatusChange: (evidenceId: string, status: string) => void;
  onRelevanceChange: (evidenceId: string, relevance: string) => void;
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

type FilterState = typeof initialFilterState;

type FilterAction =
  | {
      type: "SET_FILTER";
      field: Exclude<keyof FilterState, "sortOrder">;
      value: string;
    }
  | {
      type: "SET_SORT";
      value: string;
    }
  | {
      type: "CLEAR_FILTERS";
    };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_SORT":
      return {
        ...state,
        sortOrder: action.value,
      };
    case "CLEAR_FILTERS":
      return initialFilterState;
    default:
      return state;
  }
}

export function EvidencePage({
  evidence,
  people,
  locations,
  onStatusChange,
  onRelevanceChange,
}: EvidencePageProps) {
  const [filterState, dispatch] = useReducer(
    filterReducer,
    initialFilterState,
  );
  const {
    searchTerm,
    selectedType,
    selectedPerson,
    selectedLocation,
    selectedStatus,
    selectedRelevance,
    sortOrder,
  } = filterState;
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
    dispatch({ type: "SET_FILTER", field: "searchTerm", value });
  }

  function handleClearFilters() {
    dispatch({ type: "CLEAR_FILTERS" });
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
        onTypeChange={(value) =>
          dispatch({ type: "SET_FILTER", field: "selectedType", value })
        }
        selectedPerson={selectedPerson}
        onPersonChange={(value) =>
          dispatch({ type: "SET_FILTER", field: "selectedPerson", value })
        }
        selectedLocation={selectedLocation}
        onLocationChange={(value) =>
          dispatch({ type: "SET_FILTER", field: "selectedLocation", value })
        }
        selectedStatus={selectedStatus}
        onStatusChange={(value) =>
          dispatch({ type: "SET_FILTER", field: "selectedStatus", value })
        }
        selectedRelevance={selectedRelevance}
        onRelevanceChange={(value) =>
          dispatch({ type: "SET_FILTER", field: "selectedRelevance", value })
        }
        sortOrder={sortOrder}
        onSortChange={(value) =>
          dispatch({ type: "SET_SORT", value })
        }
        onClearFilters={handleClearFilters}
      />
      <div>
        <EvidenceLoadingIndicator />
        <EvidenceGrid evidence={sortedEvidence} />
      </div>
      {previewEvidence && (
        <EvidenceDetail
          evidence={previewEvidence}
          people={people}
          locations={locations}
          onStatusChange={onStatusChange}
          onRelevanceChange={onRelevanceChange}
        />
      )}
    </section>
  );
}
