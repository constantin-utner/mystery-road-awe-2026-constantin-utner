import { useState } from "react";
import type { Evidence, Person } from "../../../data";
import {
  loadHypothesisFromStorage,
  saveHypothesisToStorage,
} from "../../../storage";
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
  // Lazy Initialization: Funktion übergeben statt direkt aufrufen mit loadHypothesisFromStorage(), damit nur
  // zur Initialisierung geladen wird. Gleichwertig: useState(() => loadHypothesisFromStorage()).
  const [savedDraft] = useState(loadHypothesisFromStorage);
  const [suspect, setSuspect] = useState(savedDraft?.suspectId ?? "");
  const [nature, setNature] = useState(savedDraft?.nature ?? "");
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>(
    savedDraft?.evidenceIds ?? [],
  );
  const [confidence, setConfidence] = useState(
    Number(savedDraft?.confidence ?? 50),
  );
  const [explanation, setExplanation] = useState(savedDraft?.explanation ?? "");
  const [alternative, setAlternative] = useState(savedDraft?.alternative ?? "");

  function handleSaveDraft() {
    saveHypothesisToStorage({
      suspectId: suspect,
      nature: nature,
      evidenceIds: selectedEvidence,
      confidence: String(confidence),
      explanation: explanation,
      alternative: alternative,
    });
  }

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

        <EvidenceMultiSelect
          evidence={evidence}
          value={selectedEvidence}
          onValueChange={setSelectedEvidence}
        />
        <ConfidenceSlider value={confidence} onValueChange={setConfidence} />

        <div className="form-row">
          <TextAreaField
            name="hypExplanation"
            label="Written explanation"
            value={explanation}
            onValueChange={setExplanation}
            rows={4}
            placeholder="Explain your reasoning…"
            variant="form"
          />
        </div>

        <div className="form-row">
          <TextAreaField
            name="hypAlternative"
            label="Alternative explanation"
            value={alternative}
            onValueChange={setAlternative}
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
            onClick={handleSaveDraft}
          />
          <span className="saved-msg hidden" role="status">
            Saved
          </span>
        </div>
      </form>
    </section>
  );
}
