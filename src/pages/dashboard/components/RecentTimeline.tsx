import type { TimelineEvent } from "../../../data";
import { TimelineListItem } from "./TimelineListItem";

type RecentTimelineProps = {
  timeline: TimelineEvent[];
};

export function RecentTimeline({ timeline }: RecentTimelineProps) {
  // Wie bei Evidence bleibt das ursprüngliche Array unverändert.
  const recentTimeline = timeline.slice(-5).reverse();

  return (
    <div className="dashboard-panel">
      <h3>Recent timeline events</h3>
      {recentTimeline.length === 0 && (
        <div className="empty-state">
          <h4>Noch keine Timeline-Einträge</h4>
          <p>Neue Ereignisse erscheinen hier, sobald sie erfasst sind.</p>
        </div>
      )}
      {recentTimeline.map((event) => (
        <TimelineListItem key={event.id} event={event} />
      ))}
    </div>
  );
}
