import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { useWeeklyStats } from '@/features/time-tracking/hooks/use-time-tracking.ts';
import { PauseReason } from '@/features/time-tracking/types.ts';
import { humanizeDate, humanizeDateTime } from '@/utils/humanize.ts';
import { CalendarIcon, ClockIcon, PauseIcon } from 'lucide-react';
import { useMemo } from 'react';

const pauseReasonLabels: Record<PauseReason, string> = {
  [PauseReason.LUNCH]: 'Lunch Break',
  [PauseReason.BREAK]: 'Short Break',
  [PauseReason.MEETING]: 'Meeting',
  [PauseReason.TECHNICAL_ISSUE]: 'Technical Issue',
  [PauseReason.OTHER]: 'Other',
};

export function WeeklyHistory() {
  const { data: weeklyStats, isPending, isError } = useWeeklyStats();

  const totalWorkHours = useMemo(() => {
    if (!weeklyStats) return 0;
    return weeklyStats.totalWorkHours.toFixed(2);
  }, [weeklyStats]);

  const totalPauseHours = useMemo(() => {
    if (!weeklyStats) return 0;
    return weeklyStats.totalPauseHours.toFixed(2);
  }, [weeklyStats]);

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Typography variant="h4" className="!mt-0">
              Weekly History
            </Typography>
          </CardTitle>
          <Typography variant="muted" className="!mt-1">
            Your work sessions for this week
          </Typography>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <Spinner show size="medium" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !weeklyStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Typography variant="h4" className="!mt-0">
              Weekly History
            </Typography>
          </CardTitle>
          <Typography variant="muted" className="!mt-1">
            Your work sessions for this week
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="muted" align="center" className="py-8">
            Failed to load weekly statistics
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Typography variant="h4" className="!text-lg md:!text-xl !mt-0">
                Weekly History
              </Typography>
            </CardTitle>
            <Typography variant="caption" className="!mt-1">
              {humanizeDateTime(weeklyStats.weekStart)}- {humanizeDateTime(weeklyStats.weekEnd)}
            </Typography>
          </div>
          {/* Weekly Summary Stats */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <Typography variant="muted" className="!text-xs !mt-0">
                Total Work
              </Typography>
              <Typography
                variant="h4"
                className="!text-lg md:!text-xl font-bold text-blue-600 dark:text-blue-400 !mt-0"
              >
                {totalWorkHours}h
              </Typography>
            </div>
            <div className="text-right">
              <Typography variant="muted" className="!text-xs !mt-0">
                Total Breaks
              </Typography>
              <Typography
                variant="h4"
                className="!text-lg md:!text-xl font-bold text-orange-600 dark:text-orange-400 !mt-0"
              >
                {totalPauseHours}h
              </Typography>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-t p-0">
        {/* Sessions List */}
        <div className="divide-y">
          {weeklyStats.sessions.length === 0 ? (
            <Typography variant="muted" align="center" className="py-12 !text-sm">
              No work sessions recorded this week
            </Typography>
          ) : (
            <>
              {weeklyStats.sessions.map(session => (
                <div
                  key={session.id}
                  className="p-4 md:px-6 md:py-2 hover:bg-accent/30 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                    {/* Left Section - Date and Time */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <CalendarIcon className="size-4 text-muted-foreground" />
                        <div>
                          <Typography variant="small" className="font-semibold !mt-0">
                            {humanizeDate(session.date)}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <ClockIcon className="size-3.5 text-muted-foreground" />
                          <Typography variant="muted" className="!text-xs !mt-0">
                            {humanizeDate(session.date)}
                          </Typography>
                        </div>
                        {session.endTime && (
                          <>
                            <Typography variant="muted" className="!text-xs !mt-0">
                              →
                            </Typography>
                            <Typography variant="muted" className="!text-xs !mt-0">
                              {humanizeDate(session.date)}
                            </Typography>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Middle Section - Pauses */}
                    {session.pauses.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {session.pauses.map(pause => (
                          <div
                            key={pause.id}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-orange-500/10"
                          >
                            <PauseIcon className="size-3 text-orange-600 dark:text-orange-400" />
                            <Typography
                              variant="small"
                              className="!text-xs font-medium text-orange-600 dark:text-orange-400 !mt-0"
                            >
                              {pauseReasonLabels[pause.reason]}
                            </Typography>
                            <Typography variant="muted" className="!text-xs !mt-0">
                              ({pause.duration}m)
                            </Typography>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Right Section - Total Hours and Status */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Typography variant="muted" className="!text-xs !mt-0">
                          Duration
                        </Typography>
                        <Typography variant="h5" className="!text-lg font-bold !mt-0">
                          {session.totalHours.toFixed(2)}h
                        </Typography>
                      </div>
                      <Badge
                        variant={
                          session.status === 'active'
                            ? 'success'
                            : session.status === 'paused'
                              ? 'warning'
                              : 'default'
                        }
                        className="capitalize"
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
