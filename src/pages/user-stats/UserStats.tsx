import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { EmptyState } from '@/features/user-stats/components/EmptyState.tsx';
import { UserStatsDisplay } from '@/features/user-stats/components/UserStatsDisplay.tsx';
import { UserStatsForm } from '@/features/user-stats/components/UserStatsForm.tsx';
import type { UserStats as UserStatsType } from '@/features/user-stats/types.ts';

const UserStats = () => {
  const [userStats, setUserStats] = useState<UserStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatsLoaded = (stats: UserStatsType) => {
    setUserStats(stats);
    setIsLoading(false);
  };

  const handleLoadingStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Typography variant="title" className="text-2xl font-bold tracking-tight">
            GitHub User Stats
          </Typography>
          <Typography variant="muted" className="text-sm">
            Analyze team member contributions and code patterns
          </Typography>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-0">
          <UserStatsForm onStatsLoaded={handleStatsLoaded} onLoadingStart={handleLoadingStart} />
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center space-y-4">
              <Spinner size="medium" />
              <Typography variant="muted" className="text-sm">
                Analyzing GitHub data...
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && !userStats && <EmptyState />}

      {!isLoading && userStats && <UserStatsDisplay stats={userStats} />}
    </div>
  );
};

export default UserStats;
