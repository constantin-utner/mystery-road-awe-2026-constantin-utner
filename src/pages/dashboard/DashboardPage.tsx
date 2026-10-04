import type { AppData } from "../../data";
import { CaseSummaryCard } from "./components/CaseSummaryCard";
import { HowToUsePortal } from "./components/HowToUsePortal";
import type { PageName } from "../../app/pageTypes";

type DashboardPageProps = {
  data: AppData;
  onNavigate: (page: PageName) => void;
};

export function DashboardPage({ data, onNavigate }: DashboardPageProps) {
  return (
    <section>
      <h2>Case Dashboard</h2>
      <HowToUsePortal onNavigate={onNavigate} />
      <CaseSummaryCard caseData={data.caseData} />
    </section>
  );
}
