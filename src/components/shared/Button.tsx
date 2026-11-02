type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "normal";
};

export function Button({
  label,
  onClick,
  disabled = false,
  size = "small",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-secondary${size === "small" ? " btn-small" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
