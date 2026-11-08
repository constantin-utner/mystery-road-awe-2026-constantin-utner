import { useSearchParams } from "react-router";
import type { TimelineEvent } from "../../data";
import { TimelineList } from "./components/TimelineList";

type TimelinePageProps = {
  timeline: TimelineEvent[];
};

export function TimelinePage({ timeline }: TimelinePageProps) {
  const [searchParams] = useSearchParams();
  const personId = searchParams.get("person");

  const visibleEvents = personId
    ? timeline.filter((event) => event.personIds.includes(personId))
    : timeline;

  return (
    <section>
      <h2>Timeline</h2>
      {timeline.length === 0 ? (
        <div className="empty-state">
          <h3>Noch keine Timeline-Einträge</h3>
          <p>Für diesen Fall sind aktuell keine Ereignisse erfasst.</p>
        </div>
      ) : (
        <TimelineList events={visibleEvents} />
      )}
    </section>
  );
}
