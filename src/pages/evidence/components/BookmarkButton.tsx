type BookmarkButtonProps = {
  active: boolean;
  onToggle: () => void;
};

export function BookmarkButton({ active, onToggle }: BookmarkButtonProps) {
  return (
    <button
      type="button"
      className={`bookmark-btn ${active ? "active" : ""}`}
      aria-label="Toggle bookmark"
      aria-pressed={active}
      onClick={onToggle}
    >
      <span className="bookmark-icon">{active ? "★" : "☆"}</span>
    </button>
  );
}
