import type { CaseData, SharedData } from "../../data";
import { LoadingIndicator } from "../../components/shared/LoadingIndicator";
import { CaseSummaryCard } from "./components/CaseSummaryCard";
import { HowToUsePortal } from "./components/HowToUsePortal";
import type { PageName } from "../../app/pageTypes";
import { StatsSection } from "./components/StatsSection";
import { ReviewProgress } from "./components/ReviewProgress";
import { RecentEvidence } from "./components/RecentEvidence";
import { RecentTimeline } from "./components/RecentTimeline";
import { useBookmarks } from "../../context/BookmarkContext";
import { useFetch } from "../../hooks/useFetch";

type DashboardPageProps = {
  data: SharedData;
  onNavigate: (page: PageName) => void;
};

export function DashboardPage({ data, onNavigate }: DashboardPageProps) {
  const { bookmarkIds } = useBookmarks();

  const {
    data: caseData,
    isLoading,
    error,
    isEmpty,
  } = useFetch<CaseData>(`${import.meta.env.BASE_URL}api/case?delay=3000`);

  // Abgeleitete Werte werden bei jedem Render aus den aktuellen Props berechnet.
  const reviewedCount = data.evidence.filter(
    (item) => item.status.toLowerCase() === "reviewed",
  ).length;
  const bookmarkedCount = data.evidence.filter((item) =>
    bookmarkIds.includes(item.id),
  ).length;

  return (
    <section>
      <h2>Case Dashboard</h2>
      <HowToUsePortal onNavigate={onNavigate} />
      {error !== null && (
        <div className="load-error" role="alert">
          <h3>Laden fehlgeschlagen</h3>
          <p>Die Fallübersicht konnte nicht geladen werden.</p>
        </div>
      )}
      {isLoading && <LoadingIndicator message="Fallübersicht wird geladen …" />}
      {isEmpty && (
        <div className="empty-state">
          <h3>Keine Fallübersicht vorhanden</h3>
          <p>Für diesen Fall ist aktuell keine Übersicht hinterlegt.</p>
        </div>
      )}
      {caseData && <CaseSummaryCard caseData={caseData} />}
      <StatsSection
        evidenceCount={data.evidence.length}
        peopleCount={data.people.length}
        locationsCount={data.locations.length}
        bookmarkedCount={bookmarkedCount}
        reviewedCount={reviewedCount}
      />
      <ReviewProgress
        reviewedCount={reviewedCount}
        evidenceCount={data.evidence.length}
      />
      <div className="dashboard-columns">
        <RecentEvidence evidence={data.evidence} />
        <RecentTimeline timeline={data.timeline} />
      </div>
    </section>
  );
}
