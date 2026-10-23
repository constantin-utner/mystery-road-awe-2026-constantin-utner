import { NavLink } from "react-router";

type TabButtonProps = {
  label: string;
  to: string;
};

export function TabButton({ label, to }: TabButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "tab-btn active" : "tab-btn")}
    >
      {label}
    </NavLink>
  );
}
