import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { TimelineEvent } from "../../data";
import { TimelineList } from "./components/TimelineList";

export function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const personId = searchParams.get("person");

  useEffect(() => {
    async function loadTimeline() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}api/timeline`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const events: TimelineEvent[] = await response.json();
        setTimeline(events);
      } catch {
        setError("Die Timeline konnte nicht geladen werden.");
      }
    }

    loadTimeline();
  }, []);

  const visibleEvents = personId
    ? timeline.filter((event) => event.personIds.includes(personId))
    : timeline;

  return (
    <section>
      <h2>Timeline</h2>
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <TimelineList events={visibleEvents} />
      )}
    </section>
  );
}
