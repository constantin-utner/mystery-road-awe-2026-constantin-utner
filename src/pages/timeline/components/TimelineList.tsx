import type { TimelineEvent } from "../../../data";
import { TimelineItem } from "./TimelineItem";

type TimelineListProps = {
  events: TimelineEvent[];
};

export function TimelineList({ events }: TimelineListProps) {
  if (events.length === 0) {
    return <p>No timeline events available.</p>;
  }

  return (
    <div className="timeline-container">
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} />
      ))}
    </div>
  );
}
