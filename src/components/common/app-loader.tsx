import { Typography } from '@/components/ui/typography';

export const AppLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <Typography variant="muted">Loading application...</Typography>
      </div>
    </div>
  );
};
