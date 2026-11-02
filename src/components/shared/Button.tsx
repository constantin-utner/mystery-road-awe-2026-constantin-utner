type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "normal";
  variant?: "secondary" | "primary";
};

export function Button({
  label,
  onClick,
  disabled = false,
  size = "small",
  variant = "secondary",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant}${size === "small" ? " btn-small" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
