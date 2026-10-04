type ReviewProgressProps = {
  reviewedCount: number;
  evidenceCount: number;
};

export function ReviewProgress({
  reviewedCount,
  evidenceCount,
}: ReviewProgressProps) {
  // Ohne Evidence bleibt der Fortschritt bei 0, damit wir nicht durch 0 teilen.
  const progressPercentage =
    evidenceCount === 0 ? 0 : Math.round((reviewedCount / evidenceCount) * 100);

  return (
    <div className="dashboard-panel">
      <h3>Review progress</h3>
      <div
        className="progress-bar-outer"
        role="progressbar"
        aria-label="Evidence review progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercentage}
      >
        <div
          className="progress-bar-inner"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p>{progressPercentage}% of evidence reviewed</p>
    </div>
  );
}
