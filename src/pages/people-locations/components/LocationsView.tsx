import type { Location } from "../../../data";
import { LocationCard } from "./LocationCard";

type LocationsViewProps = {
  locations: Location[];
};

export function LocationsView({ locations }: LocationsViewProps) {
  return (
    <div className="locations-grid">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
