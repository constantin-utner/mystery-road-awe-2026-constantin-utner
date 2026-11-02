import type { Evidence, Location, Person } from "../../../data";
import { SelectField } from "../../../components/shared/SelectField";
import { findLocationById, findPersonById, formatDate } from "../../../utils";
import { CriticalNotice } from "./CriticalNotice";
import { TagBadge } from "./TagBadge";

type EvidenceDetailProps = {
  evidence: Evidence;
  people: Person[];
  locations: Location[];
};

export function EvidenceDetail({
  evidence,
  people,
  locations,
}: EvidenceDetailProps) {
  const relatedPeople = evidence.personIds.map((id) => {
    const person = findPersonById(id, people);
    return person ? person.name : id;
  });

  const relatedLocations = evidence.locationIds.map((id) => {
    const location = findLocationById(id, locations);
    return location ? `${location.id} - ${location.name}` : id;
  });

  return (
    <section className="evidence-detail">
      <div className="evidence-detail-header">
        <div>
          <h2>{evidence.title}</h2>

          <div className="evidence-meta">
            {evidence.id} · {evidence.type} · {formatDate(evidence.timestamp)}
          </div>
        </div>

        <button type="button" className="btn btn-secondary btn-small" disabled>
          Close
        </button>
      </div>

      {evidence.tags.includes("critical") && <CriticalNotice />}

      <div className="detail-field">
        <strong>Summary</strong>
        {evidence.summary}
      </div>

      <div className="evidence-detail-content">{evidence.content}</div>

      <div className="detail-field">
        <strong>Related people</strong>
        {relatedPeople.join(", ")}
      </div>

      <div className="detail-field">
        <strong>Related locations</strong>
        {relatedLocations.join(", ")}
      </div>

      <div className="detail-field">
        <strong>Tags</strong>
        {evidence.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <div className="detail-field">
        <strong>Review status</strong>
        <SelectField
          name="detailStatus"
          label="Review status"
          defaultValue={evidence.status}
          hideLabel
        >
          <option value="unreviewed">Unreviewed</option>
          <option value="reviewed">Reviewed</option>
          <option value="flagged">Flagged</option>
        </SelectField>
      </div>

      <div className="detail-field">
        <strong>Relevance</strong>
        <SelectField
          name="detailRelevance"
          label="Relevance"
          defaultValue={evidence.relevance}
          hideLabel
        >
          <option value="unknown">Unknown</option>
          <option value="relevant">Relevant</option>
          <option value="irrelevant">Irrelevant</option>
        </SelectField>
      </div>
    </section>
  );
}
