import { useEffect, useState } from "react";
import type { AppData } from "../../data";
import { CaseSummaryCard } from "./components/CaseSummaryCard";
import { HowToUsePortal } from "./components/HowToUsePortal";
import type { PageName } from "../../app/pageTypes";
import { StatsSection } from "./components/StatsSection";
import { ReviewProgress } from "./components/ReviewProgress";
import { RecentEvidence } from "./components/RecentEvidence";
import { RecentTimeline } from "./components/RecentTimeline";
import { useBookmarks } from "../../context/BookmarkContext";

type DashboardPageProps = {
  data: AppData;
  onNavigate: (page: PageName) => void;
};

export function DashboardPage({ data, onNavigate }: DashboardPageProps) {
  const { bookmarkIds } = useBookmarks();
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    console.log("Effect mit []");
  }, []);

  useEffect(() => {
    console.log("Effect ohne Array");
  });

  useEffect(() => {
    console.log("Effect mit [count]", count);
  }, [count]);

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
      <button type="button" onClick={() => setCount(count + 1)}>
        Klicks: {count}
      </button>
      <button type="button" onClick={() => setOtherCount(otherCount + 1)}>
        Andere Klicks: {otherCount}
      </button>
      <HowToUsePortal onNavigate={onNavigate} />
      <CaseSummaryCard caseData={data.caseData} />
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
