type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-small"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
