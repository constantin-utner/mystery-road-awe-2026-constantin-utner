import { getRelevanceBadgeClass, getStatusBadgeClass } from "../../utils";

type StatusBadgeProps = {
  status: string;
  variant?: "status" | "relevance" | "critical";
};

export function StatusBadge({ status, variant = "status" }: StatusBadgeProps) {
  let badgeClass = getStatusBadgeClass(status);

  if (variant === "relevance") {
    badgeClass = getRelevanceBadgeClass(status);
  } else if (variant === "critical") {
    badgeClass = "badge-critical";
  }

  return (
    <span className={`badge ${badgeClass}`}>{status}</span>
  );
}
