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
      <TimelineList events={visibleEvents} />
    </section>
  );
}
