type NavButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function NavButton({ label, active, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className={active ? "nav-btn active" : "nav-btn"}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
