import { Button } from "../../../components/shared/Button";
import { SelectField } from "../../../components/shared/SelectField";
import { SearchField } from "./SearchField";

type EvidenceFiltersProps = {
  evidence: Evidence[];
  people: Person[];
  locations: Location[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export function EvidenceFilters({
  evidence,
  people,
  locations,
  searchTerm,
  onSearchChange,
}: EvidenceFiltersProps) {
  const types: string[] = [];

  for (const item of evidence) {
    const type = item.type.toLowerCase();
    if (!types.includes(type)) types.push(type);
  }

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <SearchField value={searchTerm} onValueChange={onSearchChange} />

        <SelectField name="type" label="Type" hideLabel>
          <option value="">All types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectField>

        <SelectField name="person" label="Person" hideLabel>
          <option value="">All people</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </SelectField>

        <SelectField name="location" label="Location" hideLabel>
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.id} - {location.name}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="toolbar-row">
        <SelectField name="status" label="Status" hideLabel>
          <option value="">All statuses</option>
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </SelectField>

        <SelectField name="relevance" label="Relevance" hideLabel>
          <option value="">All relevance</option>
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </SelectField>

        <SelectField name="sort" label="Sort" hideLabel>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
        </SelectField>

        <Button label="Clear filters" size="normal" disabled />
      </div>
    </div>
  );
}
import type { Evidence, Location, Person } from "../../../data";
