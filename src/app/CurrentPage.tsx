import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import type { PageName } from "./pageTypes";
import type { AppData } from "../data";
import { saveEvidenceReview } from "../storage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { EvidencePage } from "../pages/evidence/EvidencePage";
import { PeopleLocationsPage } from "../pages/people-locations/PeopleLocationsPage";
import { PersonPage } from "../pages/people-locations/PersonPage";
import { PeopleView } from "../pages/people-locations/components/PeopleView";
import { LocationsView } from "../pages/people-locations/components/LocationsView";
import { TimelinePage } from "../pages/timeline/TimelinePage";
import { WorkspacePage } from "../pages/workspace/WorkspacePage";

type CurrentPageProps = {
  data: AppData;
  onNavigate: (page: PageName) => void;
};

export function CurrentPage({ data, onNavigate }: CurrentPageProps) {
  const [evidence, setEvidence] = useState(data.evidence);

  function handleStatusChange(evidenceId: string, status: string) {
    const nextEvidence = evidence.map((item) => {
      if (item.id === evidenceId) {
        return {
          ...item,
          status: status,
        };
      }

      return item;
    });

    setEvidence(nextEvidence);

    const updatedEvidence = nextEvidence.find((item) => item.id === evidenceId);

    if (updatedEvidence) {
      saveEvidenceReview(
        updatedEvidence.id,
        updatedEvidence.status,
        updatedEvidence.relevance,
      );
    }
  }

  const currentData = {
    ...data,
    evidence: evidence,
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={<DashboardPage data={currentData} onNavigate={onNavigate} />}
      />
      <Route path="/team" element={<PeopleLocationsPage />}>
        <Route index element={<Navigate to="people" replace />} />
        <Route path="people" element={<PeopleView people={data.people} />} />
        <Route
          path="people/:personId"
          element={<PersonPage people={data.people} />}
        />
        <Route
          path="locations"
          element={<LocationsView locations={data.locations} />}
        />
      </Route>
      <Route
        path="/timeline"
        element={<TimelinePage timeline={data.timeline} />}
      />
      <Route
        path="/evidence"
        element={
          <EvidencePage
            evidence={evidence}
            people={data.people}
            locations={data.locations}
            onStatusChange={handleStatusChange}
          />
        }
      />
      <Route
        path="/workspace"
        element={<WorkspacePage evidence={evidence} people={data.people} />}
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
