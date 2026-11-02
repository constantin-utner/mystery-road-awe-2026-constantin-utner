import type { Evidence } from "../../../data";
import { formatDate } from "../../../utils";

type EvidenceDetailProps = {
  evidence: Evidence;
};

export function EvidenceDetail({ evidence }: EvidenceDetailProps) {
  return (
    <section className="evidence-detail">
      <div className="evidence-detail-header">
        <div>
          <h2>{evidence.title}</h2>

          <div className="evidence-meta">
            {evidence.id} · {evidence.type} · {formatDate(evidence.timestamp)}
          </div>
        </div>

        <button type="button" className="btn btn-secondary btn-small" disabled>
          Close
        </button>
      </div>

      <div className="detail-field">
        <strong>Summary</strong>
        {evidence.summary}
      </div>

      <div className="evidence-detail-content">{evidence.content}</div>
    </section>
  );
}
