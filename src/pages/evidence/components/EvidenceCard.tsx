import type { Evidence } from "../../../data";

type EvidenceCardProps = {
  evidence: Evidence;
};

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <article className="evidence-card">
      <h3>{evidence.title}</h3>
      <div className="evidence-meta">
        {evidence.id} · {evidence.type}
      </div>
      <p className="evidence-summary">{evidence.summary}</p>
    </article>
  );
}
