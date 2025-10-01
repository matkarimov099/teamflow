import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { PauseReasonModal } from '@/features/time-tracking/components/PauseReasonModal';
import { TimerCard } from '@/features/time-tracking/components/TimerCard';
import { TodaysSummaryCard } from '@/features/time-tracking/components/TodaysSummaryCard';
import { WeeklyHistory } from '@/features/time-tracking/components/WeeklyHistory';
import {
  useCurrentSession,
  useEndTimeTracking,
  useResumeTimeTracking,
  useStartTimeTracking,
} from '@/features/time-tracking/hooks/use-time-tracking.ts';
import { TimeTrackingStatus } from '@/features/time-tracking/types.ts';
import { phoneToString } from '@/utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function TimeTracking() {
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { data: currentSession, isPending: isSessionLoading } = useCurrentSession();
  const { mutate: startTracking, isPending: isStarting } = useStartTimeTracking();
  const { mutate: endTracking, isPending: isEnding } = useEndTimeTracking();
  const { mutate: resumeTracking, isPending: isResuming } = useResumeTimeTracking();

  const isActive = currentSession?.status === TimeTrackingStatus.ACTIVE;
  const isPaused = currentSession?.status === TimeTrackingStatus.PAUSED;
  const hasSession = !!currentSession && currentSession.status !== TimeTrackingStatus.COMPLETED;

  // Calculate elapsed time
  useEffect(() => {
    if (!currentSession || currentSession.status === TimeTrackingStatus.COMPLETED) {
      setElapsedTime(0);
      return;
    }

    const calculateElapsed = () => {
      const start = new Date(currentSession.startTime).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);

      // Subtract pause duration
      let totalPauseDuration = 0;
      for (const pause of currentSession.pauses) {
        if (pause.resumeTime) {
          totalPauseDuration += pause.duration * 60;
        } else {
          // Active pause
          const pauseStart = new Date(pause.pauseTime).getTime();
          const pauseElapsed = Math.floor((now - pauseStart) / 1000);
          totalPauseDuration += pauseElapsed;
        }
      }

      setElapsedTime(Math.max(0, elapsed - totalPauseDuration));
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [elapsedTime]);

  const handleStart = () => {
    startTracking(
      { startTime: phoneToString(new Date().toISOString()) },
      {
        onSuccess: () => {
          toast.success('Time tracking started successfully');
        },
        onError: error => {
          toast.error(error?.message || 'Failed to start time tracking');
        },
      }
    );
  };

  const handlePause = () => {
    setIsPauseModalOpen(true);
  };

  const handleResume = () => {
    resumeTracking(
      { resumeTime: phoneToString(new Date().toISOString()) },
      {
        onSuccess: () => {
          toast.success('Time tracking resumed');
        },
        onError: error => {
          toast.error(error?.message || 'Failed to resume time tracking');
        },
      }
    );
  };

  const handleEnd = () => {
    endTracking(
      { endTime: phoneToString(new Date().toISOString()) },
      {
        onSuccess: () => {
          toast.success('Work session completed successfully');
        },
        onError: error => {
          toast.error(error?.message || 'Failed to end time tracking');
        },
      }
    );
  };

  if (isSessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner show size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <Typography variant="h2">Time Tracking</Typography>
          <Typography variant="muted">Track and manage your work hours</Typography>
        </div>

        {/* Top Section - Timer and Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <TimerCard
            currentSession={currentSession}
            formattedTime={formattedTime}
            isActive={isActive}
            isPaused={isPaused}
            hasSession={hasSession}
            isStarting={isStarting}
            isEnding={isEnding}
            isResuming={isResuming}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onEnd={handleEnd}
          />
          <TodaysSummaryCard
            currentSession={currentSession}
            formattedTime={formattedTime}
            hasSession={hasSession}
          />
        </div>

        {/* Weekly History Section - Full Width Below */}
        <WeeklyHistory />
      </div>

      {/* Pause Reason Modal */}
      <PauseReasonModal
        open={isPauseModalOpen}
        onOpenChange={setIsPauseModalOpen}
        onSuccess={() => setIsPauseModalOpen(false)}
      />
    </>
  );
}
