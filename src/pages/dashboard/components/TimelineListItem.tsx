import type { TimelineEvent } from "../../../data";
import { formatDate } from "../../../utils";

type TimelineListItemProps = {
  event: TimelineEvent;
};

export function TimelineListItem({ event }: TimelineListItemProps) {
  return (
    <div className="mini-list-item">
      <strong>{formatDate(event.time)}</strong>
      <br />
      {event.title}
    </div>
  );
}
