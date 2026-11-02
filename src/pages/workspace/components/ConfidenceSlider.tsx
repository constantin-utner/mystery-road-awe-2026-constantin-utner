export function ConfidenceSlider() {
  return (
    <div className="form-row">
      <label htmlFor="hypConfidence">Confidence (0–100)</label>
      <input
        type="range"
        id="hypConfidence"
        name="hypConfidence"
        min="0"
        max="100"
        defaultValue="50"
      />
      <output id="hypConfidenceValue" htmlFor="hypConfidence">
        50
      </output>
    </div>
  );
}
