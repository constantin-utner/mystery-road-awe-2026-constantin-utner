import { Navigate, Route, Routes } from "react-router";
import type { PageName } from "./pageTypes";
import type { AppData } from "../data";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { EvidencePage } from "../pages/evidence/EvidencePage";
import { PeopleLocationsPage } from "../pages/people-locations/PeopleLocationsPage";
import { TimelinePage } from "../pages/timeline/TimelinePage";
import { WorkspacePage } from "../pages/workspace/WorkspacePage";

type CurrentPageProps = {
  data: AppData;
  onNavigate: (page: PageName) => void;
};

export function CurrentPage({ data, onNavigate }: CurrentPageProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={<DashboardPage data={data} onNavigate={onNavigate} />}
      />
      <Route
        path="/team"
        element={
          <PeopleLocationsPage
            people={data.people}
            locations={data.locations}
          />
        }
      />
      <Route
        path="/timeline"
        element={<TimelinePage timeline={data.timeline} />}
      />
      <Route path="/evidence" element={<EvidencePage />} />
      <Route path="/workspace" element={<WorkspacePage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
