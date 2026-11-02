export function SearchField() {
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
      />
    </>
  );
}
