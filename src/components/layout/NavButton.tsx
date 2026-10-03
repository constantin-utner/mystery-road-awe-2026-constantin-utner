type NavButtonProps = {
  label: string;
  active: boolean;
};

export function NavButton({ label, active }: NavButtonProps) {
  return (
    <button
      type="button"
      className={active ? "nav-btn active" : "nav-btn"}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
}
