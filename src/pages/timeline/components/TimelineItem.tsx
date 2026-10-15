import type { TimelineEvent } from "../../../data";
import { formatDate } from "../../../utils";

type TimelineItemProps = {
  event: TimelineEvent;
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <article className={`timeline-event certainty-${event.certainty}`}>
      <div className="timeline-time">{formatDate(event.time)}</div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </article>
  );
}
