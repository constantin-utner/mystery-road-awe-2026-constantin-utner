type LoadingIndicatorProps = {
  message: string;
};

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
  return (
    <div className="evidence-loading" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
