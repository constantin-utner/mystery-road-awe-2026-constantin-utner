import type { CaseData } from "../../../data";

type CaseSummaryCardProps = {
  caseData: CaseData;
};

export function CaseSummaryCard({ caseData }: CaseSummaryCardProps) {
  return (
    <div className="case-summary-card">
      <h3>{caseData.title}</h3>
      <p>
        <span className="badge badge-flagged">
          {caseData.status.toUpperCase()}
        </span>
      </p>
      <p>{caseData.summary}</p>
    </div>
  );
}
