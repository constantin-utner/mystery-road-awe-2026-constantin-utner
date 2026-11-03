import type { Evidence } from "../../../data";

type EvidenceMultiSelectProps = {
  evidence: Evidence[];
  value: string[];
  onValueChange: (value: string[]) => void;
};

export function EvidenceMultiSelect({
  evidence,
  value,
  onValueChange,
}: EvidenceMultiSelectProps) {
  return (
    <div className="form-row">
      <label htmlFor="hypEvidence">Selected supporting evidence</label>
      <select
        id="hypEvidence"
        name="hypEvidence"
        multiple
        size={6}
        value={value}
        onChange={(event) => {
          const selectedIds = Array.from(
            event.currentTarget.selectedOptions,
            (option) => option.value,
          );

          onValueChange(selectedIds);
        }}
      >
        {evidence.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id} - {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
