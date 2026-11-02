type TagBadgeProps = {
  tag: string;
};

export function TagBadge({ tag }: TagBadgeProps) {
  return <span className="tag-chip">{tag}</span>;
}
