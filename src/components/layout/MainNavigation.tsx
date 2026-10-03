import type { PageName } from "../../app/pageTypes";
import { NavButton } from "./NavButton";

type MainNavigationProps = {
  currentPage: PageName;
};

export function MainNavigation({ currentPage }: MainNavigationProps) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavButton label="Dashboard" active={currentPage === "dashboard"} />
      <NavButton label="Evidence" active={currentPage === "evidence"} />
      <NavButton label="People & Locations" active={currentPage === "people"} />
      <NavButton label="Timeline" active={currentPage === "timeline"} />
      <NavButton label="Workspace" active={currentPage === "workspace"} />
    </nav>
  );
}
