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
  // Lazy Initialization: Der gespeicherte Entwurf wird zur Initialisierung geladen.
  const [draft, setDraft] = useState(() => {
    const savedDraft = loadHypothesisFromStorage();

    return {
      suspectId: savedDraft?.suspectId ?? "",
      nature: savedDraft?.nature ?? "",
      evidenceIds: savedDraft?.evidenceIds ?? [],
      confidence: Number(savedDraft?.confidence ?? 50),
      explanation: savedDraft?.explanation ?? "",
      alternative: savedDraft?.alternative ?? "",
    };
  });

  function handleSaveDraft() {
    saveHypothesisToStorage({
      ...draft,
      confidence: String(draft.confidence), // Convert confidence to string for storage
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
            value={draft.suspectId}
            onValueChange={(value) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                suspectId: value,
              }))
            }
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
            value={draft.nature}
            onValueChange={(value) =>
              setDraft((currentDraft) => ({ ...currentDraft, nature: value }))
            }
          >
            <option value="">Select…</option>
            <option value="accidental">Accidental</option>
            <option value="deliberate">Deliberate</option>
            <option value="unclear">Unclear</option>
          </SelectField>
        </div>

        <EvidenceMultiSelect
          evidence={evidence}
          value={draft.evidenceIds}
          onValueChange={(value) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              evidenceIds: value,
            }))
          }
        />
        <ConfidenceSlider
          value={draft.confidence}
          onValueChange={(value) =>
            setDraft((currentDraft) => ({ ...currentDraft, confidence: value }))
          }
        />

        <div className="form-row">
          <TextAreaField
            name="hypExplanation"
            label="Written explanation"
            value={draft.explanation}
            onValueChange={(value) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                explanation: value,
              }))
            }
            rows={4}
            placeholder="Explain your reasoning…"
            variant="form"
          />
        </div>

        <div className="form-row">
          <TextAreaField
            name="hypAlternative"
            label="Alternative explanation"
            value={draft.alternative}
            onValueChange={(value) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                alternative: value,
              }))
            }
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
