type BookmarkButtonProps = {
  active: boolean;
};

export function BookmarkButton({ active }: BookmarkButtonProps) {
  return (
    <button
      type="button"
      className={`bookmark-btn ${active ? "active" : ""}`}
      aria-label="Toggle bookmark"
      aria-pressed={active}
      disabled
    >
      <span className="bookmark-icon">{active ? "★" : "☆"}</span>
    </button>
  );
}
