import { useParams } from "react-router";
import type { Person } from "../../data";
import { PersonCard } from "./components/PersonCard";

type PersonPageProps = {
  people: Person[];
};

export function PersonPage({ people }: PersonPageProps) {
  const { personId } = useParams();
  const person = people.find((person) => person.id === personId);

  if (!person) {
    return <p>Person not found.</p>;
  }

  return <PersonCard person={person} />;
}
