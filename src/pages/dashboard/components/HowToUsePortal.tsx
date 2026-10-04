import type { PageName } from "../../../app/pageTypes";
import { PortalGuideCard } from "./PortalGuideCard";

type HowToUsePortalProps = {
  onNavigate: (page: PageName) => void;
};

export function HowToUsePortal({ onNavigate }: HowToUsePortalProps) {
  return (
    <div className="intro-card">
      <h3>How to use this portal</h3>
      <p>
        Everything gathered on the case so far is organised into four working
        views. Use the navigation bar at the top to move between them at any
        time.
      </p>
      <div className="howto-grid">
        <PortalGuideCard
          title="1. Evidence Catalogue"
          description="Search, filter, and sort every evidence item. Open one for full details, related people and locations, and to add a private note."
          buttonLabel="Go to Evidence"
          page="evidence"
          onNavigate={onNavigate}
        />
        <PortalGuideCard
          title="2. People & Locations"
          description="Read profiles and statements from the six team members involved, and look up the six key locations in the investigation."
          buttonLabel="Go to People & Locations"
          page="people"
          onNavigate={onNavigate}
        />
        <PortalGuideCard
          title="3. Timeline"
          description="Walk through events in chronological order, filter by person, location, or type, and jump straight to the evidence behind any event."
          buttonLabel="Go to Timeline"
          page="timeline"
          onNavigate={onNavigate}
        />
        <PortalGuideCard
          title="4. Investigator Workspace"
          description="Your bookmarked evidence and notes collect here. Draft a hypothesis — who you suspect, why, and how confident you are — it's saved automatically in your browser."
          buttonLabel="Go to Workspace"
          page="workspace"
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}
