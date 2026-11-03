type ConfidenceSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
};

export function ConfidenceSlider({
  value,
  onValueChange,
}: ConfidenceSliderProps) {
  return (
    <div className="form-row">
      <label htmlFor="hypConfidence">Confidence (0–100)</label>
      <input
        type="range"
        id="hypConfidence"
        name="hypConfidence"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onValueChange(Number(event.currentTarget.value))}
      />
      <output id="hypConfidenceValue" htmlFor="hypConfidence">
        {value}
      </output>
    </div>
  );
}
