import type { AppData } from "../../data";
import { CaseSummaryCard } from "../../components/dashboard/CaseSummaryCard";

type DashboardPageProps = {
  data: AppData;
};

export function DashboardPage({ data }: DashboardPageProps) {
  return (
    <section>
      <h2>Case Dashboard</h2>
      <CaseSummaryCard caseData={data.caseData} />
    </section>
  );
}
