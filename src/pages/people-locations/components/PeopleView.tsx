import type { Person } from "../../../data";
import { PersonCard } from "./PersonCard";

type PeopleViewProps = {
  people: Person[];
};

export function PeopleView({ people }: PeopleViewProps) {
  if (people.length === 0) {
    return <p>No people available.</p>;
  }

  return (
    <div className="people-grid">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
