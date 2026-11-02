import type { Evidence } from "../../../data";

type EvidenceMultiSelectProps = {
  evidence: Evidence[];
};

export function EvidenceMultiSelect({ evidence }: EvidenceMultiSelectProps) {
  return (
    <div className="form-row">
      <label htmlFor="hypEvidence">Selected supporting evidence</label>
      <select id="hypEvidence" name="hypEvidence" multiple size={6}>
        {evidence.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id} - {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
