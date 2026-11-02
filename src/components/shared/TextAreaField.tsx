type TextAreaFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
};

export function TextAreaField({
  name,
  label,
  defaultValue,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <>
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>
      <textarea
        id={name}
        name={name}
        className="note-textarea"
        rows={3}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </>
  );
}
