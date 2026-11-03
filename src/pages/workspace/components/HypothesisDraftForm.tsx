import { useState } from "react";
import type { Evidence, Person } from "../../../data";
import { SelectField } from "../../../components/shared/SelectField";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { Button } from "../../../components/shared/Button";
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
  const [suspect, setSuspect] = useState("");
  const [nature, setNature] = useState("");

  return (
    <section className="hypothesis-card">
      <h3>Hypothesis Draft</h3>
      <form id="hypothesisForm">
        <div className="form-row">
          <SelectField
            name="hypSuspect"
            label="Suspected responsible person"
            value={suspect}
            onValueChange={setSuspect}
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
            value={nature}
            onValueChange={setNature}
          >
            <option value="">Select…</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </SelectField>
        </div>

        <EvidenceMultiSelect evidence={evidence} />
        <ConfidenceSlider />

        <div className="form-row">
          <TextAreaField
            name="hypExplanation"
            label="Written explanation"
            rows={4}
            placeholder="Explain your reasoning…"
            variant="form"
          />
        </div>

        <div className="form-row">
          <TextAreaField
            name="hypAlternative"
            label="Alternative explanation"
            rows={3}
            placeholder="What else could explain the evidence?"
            variant="form"
          />
        </div>

        <div className="form-actions">
          <Button
            label="Save hypothesis draft"
            variant="primary"
            size="normal"
            disabled
          />
          <span className="saved-msg hidden" role="status">
            Saved
          </span>
        </div>
      </form>
    </section>
  );
}
