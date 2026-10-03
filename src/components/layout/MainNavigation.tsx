import type { PageName } from "../../app/pageTypes";
import { NavButton } from "./NavButton";

type MainNavigationProps = {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
};

export function MainNavigation({
  currentPage,
  onNavigate,
}: MainNavigationProps) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavButton
        label="Dashboard"
        active={currentPage === "dashboard"}
        onClick={() => onNavigate("dashboard")}
      />
      <NavButton
        label="Evidence"
        active={currentPage === "evidence"}
        onClick={() => onNavigate("evidence")}
      />
      <NavButton
        label="People & Locations"
        active={currentPage === "people"}
        onClick={() => onNavigate("people")}
      />
      <NavButton
        label="Timeline"
        active={currentPage === "timeline"}
        onClick={() => onNavigate("timeline")}
      />
      <NavButton
        label="Workspace"
        active={currentPage === "workspace"}
        onClick={() => onNavigate("workspace")}
      />
    </nav>
  );
}
