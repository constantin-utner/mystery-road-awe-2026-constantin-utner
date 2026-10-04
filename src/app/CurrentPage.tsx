import type { PageName } from "./pageTypes";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { EvidencePage } from "../pages/evidence/EvidencePage";
import { PeopleLocationsPage } from "../pages/people-locations/PeopleLocationsPage";
import { TimelinePage } from "../pages/timeline/TimelinePage";
import { WorkspacePage } from "../pages/workspace/WorkspacePage";
import type { AppData } from "../data";

type CurrentPageProps = {
  page: PageName;
  data: AppData;
};

export function CurrentPage({ page, data }: CurrentPageProps) {
  switch (page) {
    case "dashboard":
      return <DashboardPage data={data} />;
    case "evidence":
      return <EvidencePage />;
    case "people":
      return <PeopleLocationsPage />;
    case "timeline":
      return <TimelinePage />;
    case "workspace":
      return <WorkspacePage />;
    default:
      return <DashboardPage data={data} />;
  }
}
