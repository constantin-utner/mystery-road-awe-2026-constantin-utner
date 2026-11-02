type TextAreaFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  variant?: "note" | "form";
};

export function TextAreaField({
  name,
  label,
  defaultValue,
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
        placeholder={placeholder}
      />
    </>
  );
}
