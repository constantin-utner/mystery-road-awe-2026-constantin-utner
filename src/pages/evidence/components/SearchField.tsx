type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function SearchField({ value, onValueChange }: SearchFieldProps) {
  return (
    <>
      <label htmlFor="evidenceSearch" className="visually-hidden">
        Search evidence
      </label>
      <input
        id="evidenceSearch"
        type="text"
        name="evidenceSearch"
        placeholder="Search evidence by title, summary, or tag…"
        autoComplete="off"
        value={value}
        onChange={(event) => onValueChange(event.currentTarget.value)}
      />
    </>
  );
}
