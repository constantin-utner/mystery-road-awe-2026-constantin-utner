import { NavButton } from "./NavButton";

export function MainNavigation() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavButton label="Dashboard" to="/dashboard" />
      <NavButton label="Evidence" to="/evidence" />
      <NavButton label="People & Locations" to="/team" />
      <NavButton label="Timeline" to="/timeline" />
      <NavButton label="Workspace" to="/workspace" />
    </nav>
  );
}
