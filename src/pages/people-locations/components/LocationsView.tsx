import type { Location } from "../../../data";
import { LocationCard } from "./LocationCard";

type LocationsViewProps = {
  locations: Location[];
};

export function LocationsView({ locations }: LocationsViewProps) {
  if (locations.length === 0) {
    return (
      <div className="empty-state">
        <h3>Noch keine Orte erfasst</h3>
        <p>Für diesen Fall sind aktuell keine Orte hinterlegt.</p>
      </div>
    );
  }

  return (
    <div className="locations-grid">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
