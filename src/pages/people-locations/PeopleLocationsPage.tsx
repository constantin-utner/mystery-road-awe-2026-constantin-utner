import type { Person, Location } from "../../data";
import { PeopleView } from "./components/PeopleView";
import { LocationsView } from "./components/LocationsView";

type PeopleLocationsPageProps = {
  people: Person[];
  locations: Location[];
};

export function PeopleLocationsPage({
  people,
  locations,
}: PeopleLocationsPageProps) {
  return (
    <section>
      <h2>People & Locations</h2>
      <h3>People</h3>
      <PeopleView people={people} />
      <h3>Locations</h3>
      <LocationsView locations={locations} />
    </section>
  );
}
