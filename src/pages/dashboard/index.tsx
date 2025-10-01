import { PageTitle } from '@/components/common/page-title';
import { Typography } from '@/components/ui/typography';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function DashboardPage() {
  const { currentUser } = useAuthContext();

  return (
    <div className="container py-4">
      <PageTitle title="Dashboard Overview" />

      <div className="mt-6 grid gap-6">
        {currentUser && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Typography variant="h2" className="mb-4">
              Welcome, {currentUser.firstName} {currentUser.lastName}!
            </Typography>
            <Typography variant="muted">
              Good to see you back. Here's your dashboard overview with the latest updates.
            </Typography>
          </div>
        )}

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Typography variant="h2" className="mb-4">
            Dashboard Overview
          </Typography>
          <Typography variant="muted">
            This is the main dashboard overview page. It shows a summary of your most important
            data.
          </Typography>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={`metric-${i}`} className="rounded-md border bg-card p-4">
                <Typography variant="h3">Metric {i}</Typography>
                <div className="mt-2 font-bold text-2xl">{Math.floor(Math.random() * 1000)}</div>
                <Typography variant="small" className="mt-1 text-muted-foreground">
                  +{Math.floor(Math.random() * 10)}% from last period
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
