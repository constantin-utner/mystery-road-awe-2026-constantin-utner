import type { Person } from "../../../data";
import { PersonCard } from "./PersonCard";

type PeopleViewProps = {
  people: Person[];
};

export function PeopleView({ people }: PeopleViewProps) {
  if (people.length === 0) {
    return (
      <div className="empty-state">
        <h3>Noch keine Personen erfasst</h3>
        <p>Für diesen Fall sind aktuell keine Personen hinterlegt.</p>
      </div>
    );
  }

  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
