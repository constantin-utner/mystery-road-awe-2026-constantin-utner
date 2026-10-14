import type { Person } from "../../../data";
import { PersonCard } from "./PersonCard";

type PeopleViewProps = {
  people: Person[];
};

export function PeopleView({ people }: PeopleViewProps) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
