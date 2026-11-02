export function EvidenceLoadingIndicator() {
  return (
    <div className="evidence-loading hidden" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>Loading evidence…</p>
    </div>
  );
}
