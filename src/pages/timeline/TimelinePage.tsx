import type { TimelineEvent } from "../../data";
import { TimelineList } from "./components/TimelineList";

type TimelinePageProps = {
  timeline: TimelineEvent[];
};

export function TimelinePage({ timeline }: TimelinePageProps) {
  return (
    <section>
      <h2>Timeline</h2>
      <TimelineList events={timeline} />
    </section>
  );
}
