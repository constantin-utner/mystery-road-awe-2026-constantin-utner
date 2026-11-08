import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import type { PageName } from "./pageTypes";
import { prepareEvidenceForDisplay, type SharedData } from "../data";
import { saveEvidenceReview } from "../storage";
import { LoadingIndicator } from "../components/shared/LoadingIndicator";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { EvidencePage } from "../pages/evidence/EvidencePage";
import { PeopleLocationsPage } from "../pages/people-locations/PeopleLocationsPage";
import { PersonPage } from "../pages/people-locations/PersonPage";
import { PeopleView } from "../pages/people-locations/components/PeopleView";
import { LocationsView } from "../pages/people-locations/components/LocationsView";
import { TimelinePage } from "../pages/timeline/TimelinePage";
import { WorkspacePage } from "../pages/workspace/WorkspacePage";

type CurrentPageProps = {
  onNavigate: (page: PageName) => void;
};

const pageTitles = new Map([
  ["dashboard", "Dashboard"],
  ["evidence", "Evidence"],
  ["team", "People & Locations"],
  ["timeline", "Timeline"],
  ["workspace", "Workspace"],
]);

export function CurrentPage({ onNavigate }: CurrentPageProps) {
  const [data, setData] = useState<SharedData | null>(null);
  const [error, setError] = useState("");
  const { pathname } = useLocation();
  const [, section = ""] = pathname.toLowerCase().split("/");
  const pageTitle = pageTitles.get(section) ?? "Investigation Portal";
  const title = `${pageTitle} | Project ReMotion`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    async function loadData() {
      try {
        const api = `${import.meta.env.BASE_URL}api`;
        const responses = await Promise.all([
          fetch(`${api}/people`),
          fetch(`${api}/locations`),
          fetch(`${api}/evidence`),
          fetch(`${api}/timeline`),
        ]);

        const failedResponse = responses.find((response) => !response.ok);
        if (failedResponse) {
          throw new Error(`HTTP ${failedResponse.status}`);
        }

        const [people, locations, evidence, timeline] = await Promise.all(
          responses.map((response) => response.json()),
        );

        setData({
          people,
          locations,
          evidence: prepareEvidenceForDisplay(evidence),
          timeline,
        });
      } catch {
        setError("Die gemeinsamen Falldaten konnten nicht geladen werden.");
      }
    }

    loadData();
  }, []);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (data === null) {
    return <LoadingIndicator message="Falldaten werden geladen …" />;
  }

  const { people, locations, evidence, timeline } = data;

  const handleStatusChange = (evidenceId: string, status: string) => {
    const nextEvidence = evidence.map((item) => {
      if (item.id === evidenceId) {
        return {
          ...item,
          status: status,
        };
      }

      return item;
    });

    setData({ ...data, evidence: nextEvidence });

    const updatedEvidence = nextEvidence.find((item) => item.id === evidenceId);

    if (updatedEvidence) {
      saveEvidenceReview(
        updatedEvidence.id,
        updatedEvidence.status,
        updatedEvidence.relevance,
      );
    }
  };

  const handleRelevanceChange = (evidenceId: string, relevance: string) => {
    const nextEvidence = evidence.map((item) => {
      if (item.id === evidenceId) {
        return {
          ...item,
          relevance: relevance,
        };
      }

      return item;
    });

    setData({ ...data, evidence: nextEvidence });

    const updatedEvidence = nextEvidence.find((item) => item.id === evidenceId);

    if (updatedEvidence) {
      saveEvidenceReview(
        updatedEvidence.id,
        updatedEvidence.status,
        updatedEvidence.relevance,
      );
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={<DashboardPage data={data} onNavigate={onNavigate} />}
      />
      <Route path="/team" element={<PeopleLocationsPage />}>
        <Route index element={<Navigate to="people" replace />} />
        <Route path="people" element={<PeopleView people={people} />} />
        <Route
          path="people/:personId"
          element={<PersonPage people={people} />}
        />
        <Route
          path="locations"
          element={<LocationsView locations={locations} />}
        />
      </Route>
      <Route path="/timeline" element={<TimelinePage timeline={timeline} />} />
      <Route
        path="/evidence"
        element={
          <EvidencePage
            evidence={evidence}
            people={people}
            locations={locations}
            onStatusChange={handleStatusChange}
            onRelevanceChange={handleRelevanceChange}
          />
        }
      />
      <Route
        path="/workspace"
        element={<WorkspacePage evidence={evidence} people={people} />}
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
