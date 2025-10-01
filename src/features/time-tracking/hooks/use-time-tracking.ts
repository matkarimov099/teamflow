import {
  endTimeTracking,
  getCurrentSession,
  getTimeTrackingHistory,
  getWeeklyStats,
  pauseTimeTracking,
  resumeTimeTracking,
  startTimeTracking,
} from '@/features/time-tracking/services/time-tracking.service.ts';
import type { TimeTrackingFilter } from '@/features/time-tracking/types.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEYS = {
  CURRENT_SESSION: 'currentSession',
  WEEKLY_STATS: 'weeklyStats',
  HISTORY: 'timeTrackingHistory',
};

/**
 * Hook to get the current active time tracking session
 */
export function useCurrentSession() {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_SESSION],
    queryFn: getCurrentSession,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000,
  });
}

/**
 * Hook to start time tracking
 */
export function useStartTimeTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTimeTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_SESSION] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WEEKLY_STATS] });
    },
  });
}

/**
 * Hook to end time tracking
 */
export function useEndTimeTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endTimeTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_SESSION] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WEEKLY_STATS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HISTORY] });
    },
  });
}

/**
 * Hook to pause time tracking
 */
export function usePauseTimeTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pauseTimeTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_SESSION] });
    },
  });
}

/**
 * Hook to resume time tracking
 */
export function useResumeTimeTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeTimeTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_SESSION] });
    },
  });
}

/**
 * Hook to get weekly stats
 */
export function useWeeklyStats(filter?: TimeTrackingFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.WEEKLY_STATS, filter],
    queryFn: () => getWeeklyStats(filter),
    staleTime: 60000,
  });
}

/**
 * Hook to get time tracking history
 */
export function useTimeTrackingHistory(filter?: TimeTrackingFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.HISTORY, filter],
    queryFn: () => getTimeTrackingHistory(filter),
    staleTime: 60000,
  });
}
