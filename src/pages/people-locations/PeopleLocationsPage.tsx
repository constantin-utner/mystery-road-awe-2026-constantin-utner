import { Outlet } from "react-router";
import { PeopleLocationsTabs } from "./components/PeopleLocationsTabs";

export function PeopleLocationsPage() {
  return (
    <section>
      <h2>People & Locations</h2>
      <PeopleLocationsTabs />
      <Outlet />
    </section>
  );
}
