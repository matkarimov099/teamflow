import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import type { TimeTrackingSession } from '@/features/time-tracking/types';
import { cn } from '@/utils/utils';
import { CheckCircleIcon, PauseIcon, PlayIcon } from 'lucide-react';

interface TimerCardProps {
  currentSession: TimeTrackingSession | null | undefined;
  formattedTime: string;
  isActive: boolean;
  isPaused: boolean;
  hasSession: boolean;
  isStarting: boolean;
  isEnding: boolean;
  isResuming: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}

export function TimerCard({
  currentSession,
  formattedTime,
  isActive,
  isPaused,
  hasSession,
  isStarting,
  isEnding,
  isResuming,
  onStart,
  onPause,
  onResume,
  onEnd,
}: TimerCardProps) {
  return (
    <Card className="overflow-hidden h-full py-0">
      <div
        className={cn(
          'p-6 md:p-8 h-full flex flex-col justify-between transition-all duration-500',
          isActive && 'bg-gradient-to-br from-green-500/10 via-background to-background',
          isPaused && 'bg-gradient-to-br from-yellow-500/10 via-background to-background',
          !hasSession && 'bg-gradient-to-br from-primary/5 via-background to-background'
        )}
      >
        {/* Status Badge */}
        {hasSession && currentSession && (
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                'px-3 py-1.5 rounded-full text-xs md:text-sm font-medium inline-flex items-center gap-2',
                isActive && 'bg-green-500/20 text-green-600 dark:text-green-400',
                isPaused && 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                    isActive && 'bg-green-500',
                    isPaused && 'bg-yellow-500'
                  )}
                />
                <span
                  className={cn(
                    'relative inline-flex rounded-full h-2 w-2',
                    isActive && 'bg-green-500',
                    isPaused && 'bg-yellow-500'
                  )}
                />
              </span>
              <Typography variant="small" className="!text-xs md:!text-sm !mt-0">
                {isActive && 'Working'}
                {isPaused && 'Paused'}
              </Typography>
            </div>
          </div>
        )}

        {/* Timer */}
        <div className="text-center flex-1 flex flex-col justify-center">
          <Typography
            variant="h1"
            align="center"
            className={cn(
              'md:!text-8xl text-5xl font-mono font-bold mb-2 transition-all duration-300 tracking-tight !mt-0',
              isActive && 'text-green-600 dark:text-green-400',
              isPaused && 'text-yellow-600 dark:text-yellow-400',
              !hasSession && 'text-muted-foreground/40'
            )}
          >
            {formattedTime}
          </Typography>
          {!hasSession && (
            <Typography variant="muted" align="center" className="!text-sm md:!text-base !mt-0">
              Ready to start tracking
            </Typography>
          )}
        </div>

        {/* Control Buttons */}
        <div className="mt-4">
          {!hasSession && (
            <Button
              size="lg"
              className="w-full h-14 md:h-16 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={onStart}
              loading={isStarting}
            >
              <PlayIcon className="size-5 md:size-6 mr-2" />
              Start Work Session
            </Button>
          )}

          {isActive && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 md:h-16 text-sm md:text-base font-semibold bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 dark:text-orange-400 border-orange-500/30"
                onClick={onPause}
              >
                <PauseIcon className="size-4 md:size-5 mr-1.5 md:mr-2" />
                Pause
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="h-14 md:h-16 text-sm md:text-base font-semibold"
                onClick={onEnd}
                loading={isEnding}
              >
                <CheckCircleIcon className="size-4 md:size-5 mr-1.5 md:mr-2" />
                End Session
              </Button>
            </div>
          )}

          {isPaused && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="lg"
                className="h-14 md:h-16 text-sm md:text-base font-semibold"
                onClick={onResume}
                loading={isResuming}
              >
                <PlayIcon className="size-4 md:size-5 mr-1.5 md:mr-2" />
                Resume
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="h-14 md:h-16 text-sm md:text-base font-semibold"
                onClick={onEnd}
                loading={isEnding}
              >
                <CheckCircleIcon className="size-4 md:size-5 mr-1.5 md:mr-2" />
                End Session
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
