import type { Evidence, Person } from "../../../data";
import { SelectField } from "../../../components/shared/SelectField";
import { EvidenceMultiSelect } from "./EvidenceMultiSelect";
import { ConfidenceSlider } from "./ConfidenceSlider";

type HypothesisDraftFormProps = {
  people: Person[];
  evidence: Evidence[];
};

export function HypothesisDraftForm({
  people,
  evidence,
}: HypothesisDraftFormProps) {
  return (
    <section className="hypothesis-card">
      <h3>Hypothesis Draft</h3>
      <form id="hypothesisForm">
        <div className="form-row">
          <SelectField
            name="hypSuspect"
            label="Suspected responsible person"
            defaultValue=""
          >
            <option value="">Select a person…</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </SelectField>
        </div>

        <div className="form-row">
          <SelectField
            name="hypNature"
            label="Accidental or deliberate incident"
            defaultValue=""
          >
            <option value="">Select…</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </SelectField>
        </div>

        <EvidenceMultiSelect evidence={evidence} />
        <ConfidenceSlider />
      </form>
    </section>
  );
}
