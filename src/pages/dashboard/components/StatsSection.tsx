import { StatCard } from "./StatCard";

type StatsSectionProps = {
  evidenceCount: number;
  peopleCount: number;
  locationsCount: number;
  bookmarkedCount: number;
  reviewedCount: number;
};

export function StatsSection({
  evidenceCount,
  peopleCount,
  locationsCount,
  bookmarkedCount,
  reviewedCount,
}: StatsSectionProps) {
  return (
    <div className="stat-grid">
      <StatCard value={evidenceCount} label="Evidence items" />
      <StatCard value={peopleCount} label="People" />
      <StatCard value={locationsCount} label="Locations" />
      <StatCard value={bookmarkedCount} label="Bookmarked" />
      <StatCard value={reviewedCount} label="Reviewed" />
    </div>
  );
}
