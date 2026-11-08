import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
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

const pageTitles = new Map([
  ["dashboard", "Dashboard"],
  ["evidence", "Evidence"],
  ["team", "People & Locations"],
  ["timeline", "Timeline"],
  ["workspace", "Workspace"],
]);

export function CurrentPage({ data, onNavigate }: CurrentPageProps) {
  const [evidence, setEvidence] = useState(data.evidence);
  const { pathname } = useLocation();
  const [, section = ""] = pathname.toLowerCase().split("/");
  const pageTitle = pageTitles.get(section) ?? "Investigation Portal";
  const title = `${pageTitle} | Project ReMotion`;

  useEffect(() => {
    document.title = title;
  }, [title]);

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

  function handleRelevanceChange(evidenceId: string, relevance: string) {
    const nextEvidence = evidence.map((item) => {
      if (item.id === evidenceId) {
        return {
          ...item,
          relevance: relevance,
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
            onRelevanceChange={handleRelevanceChange}
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
