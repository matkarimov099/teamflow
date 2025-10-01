import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import type { TimeTrackingSession } from '@/features/time-tracking/types';
import { humanizeDateTime } from '@/utils/humanize';
import { ClockIcon, PauseIcon } from 'lucide-react';

interface TodaysSummaryCardProps {
  currentSession: TimeTrackingSession | null | undefined;
  formattedTime: string;
  hasSession: boolean;
}

export function TodaysSummaryCard({
  currentSession,
  formattedTime,
  hasSession,
}: TodaysSummaryCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>
          <Typography variant="h4" className="!text-lg md:!text-xl !mt-0">
            Today's Summary
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <ClockIcon className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <Typography variant="muted" className="!text-xs mb-0.5 !mt-0">
                Work Time
              </Typography>
              <Typography variant="h3" className="!text-2xl font-bold !mt-0">
                {formattedTime}
              </Typography>
            </div>
          </div>
        </div>

        {currentSession && currentSession.pauses.length > 0 && (
          <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-500/20">
                <PauseIcon className="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <Typography variant="muted" className="!text-xs mb-0.5 !mt-0">
                  Total Breaks
                </Typography>
                <Typography variant="h3" className="!text-2xl font-bold !mt-0">
                  {currentSession.pauses.length}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {hasSession && currentSession && (
          <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <ClockIcon className="size-5 text-primary" />
              </div>
              <div>
                <Typography variant="muted" className="!text-xs mb-0.5 !mt-0">
                  Started At
                </Typography>
                <Typography variant="h4" className="!text-xl font-semibold !mt-0">
                  {humanizeDateTime(currentSession.startTime)}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
