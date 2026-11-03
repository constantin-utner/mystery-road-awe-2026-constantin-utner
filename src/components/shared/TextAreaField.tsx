type TextAreaFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  variant?: "note" | "form";
};

export function TextAreaField({
  name,
  label,
  defaultValue,
  value,
  onValueChange,
  placeholder,
  rows = 3,
  variant = "note",
}: TextAreaFieldProps) {
  return (
    <>
      <label htmlFor={name}>
        {variant === "note" ? <strong>{label}</strong> : label}
      </label>
      <textarea
        id={name}
        name={name}
        className={variant === "note" ? "note-textarea" : undefined}
        rows={rows}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => onValueChange?.(event.currentTarget.value)}
        placeholder={placeholder}
      />
    </>
  );
}
