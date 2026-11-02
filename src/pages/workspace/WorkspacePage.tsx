export function WorkspacePage() {
  return (
    <section>
      <h2>Investigator Workspace</h2>
      <div className="workspace-grid">
        <section className="workspace-col">
          <h3>Bookmarked Evidence</h3>
          <div className="bookmarks-list">
            <p>
              No bookmarked evidence yet. Bookmark items from the Evidence view.
            </p>
          </div>
        </section>

        <section className="workspace-col">
          <h3>Personal Notes</h3>
          <p className="hint-text">
            Notes are attached to whichever evidence item is currently open in
            the Evidence view.
          </p>
          <div className="notes-list">
            <p>No notes yet. Add one from an evidence item's detail view.</p>
          </div>
        </section>
      </div>

      <section className="hypothesis-card">
        <h3>Hypothesis Draft</h3>
      </section>
    </section>
  );
}
