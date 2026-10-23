import { NavLink } from "react-router";

type NavButtonProps = {
  label: string;
  to: string;
};

export function NavButton({ label, to }: NavButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}
    >
      {label}
    </NavLink>
  );
}
