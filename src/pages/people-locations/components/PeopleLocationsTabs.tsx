import { TabButton } from "./TabButton";

export function PeopleLocationsTabs() {
  return (
    <nav className="tab-bar">
      <TabButton label="People" to="/team/people" />
      <TabButton label="Locations" to="/team/locations" />
    </nav>
  );
}
