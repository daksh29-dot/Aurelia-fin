import { Button } from "./button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center" role="alert">
      <div className="h-10 w-10 rounded-full border border-negative" aria-hidden />
      <p className="text-sm font-medium text-negative">Something went wrong</p>
      <p className="max-w-sm text-sm text-text-muted">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
