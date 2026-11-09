import { useEffect, useState } from "react";
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

type DashboardPageProps = {
  data: SharedData;
  onNavigate: (page: PageName) => void;
};

export function DashboardPage({ data, onNavigate }: DashboardPageProps) {
  const { bookmarkIds } = useBookmarks();

  const [selectedCase, setSelectedCase] = useState<"a" | "b">("a");
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCase() {
      setIsLoading(true);
      setError("");
      const delay = selectedCase === "a" ? 4000 : 200;

      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}api/case?id=${selectedCase}&delay=${delay}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result: CaseData | null = await response.json();
        if (!controller.signal.aborted) {
          setCaseData(result);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Die Fallübersicht konnte nicht geladen werden.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCase();

    return () => {
      controller.abort();
    };
  }, [selectedCase]);

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
      <button type="button" onClick={() => setSelectedCase("a")}>
        Fall A (4 s)
      </button>
      <button type="button" onClick={() => setSelectedCase("b")}>
        Fall B (0,2 s)
      </button>
      <p>Ausgewählt: Fall {selectedCase.toUpperCase()}</p>
      <HowToUsePortal onNavigate={onNavigate} />
      {error && (
        <div className="load-error" role="alert">
          <h3>Laden fehlgeschlagen</h3>
          <p>{error}</p>
        </div>
      )}
      {!error && isLoading && (
        <LoadingIndicator message="Fallübersicht wird geladen …" />
      )}
      {!error && !isLoading && caseData === null && (
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
