import { getStatusBadgeClass } from "../../utils";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge ${getStatusBadgeClass(status)}`}>{status}</span>
  );
}
