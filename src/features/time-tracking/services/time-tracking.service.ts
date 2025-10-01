import type {
  EndTimeTrackingRequest,
  PauseTimeTrackingRequest,
  ResumeTimeTrackingRequest,
  StartTimeTrackingRequest,
  TimeTrackingFilter,
  TimeTrackingSession,
  WeeklyTimeStats,
} from '@/features/time-tracking/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

/**
 * Start a new time tracking session
 */
export async function startTimeTracking(
  data: StartTimeTrackingRequest
): Promise<TimeTrackingSession> {
  const response = await axiosClient.post<
    TimeTrackingSession,
    AxiosResponse<TimeTrackingSession, ServerError>
  >('/time-tracking/start', data);
  return response.data;
}

/**
 * End the current time tracking session
 */
export async function endTimeTracking(data: EndTimeTrackingRequest): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/time-tracking/end',
    data
  );
  return response.data;
}

/**
 * Pause the current time-tracking session
 */
export async function pauseTimeTracking(data: PauseTimeTrackingRequest): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/time-tracking/pause',
    data
  );
  return response.data;
}

/**
 * Resume the paused time tracking session
 */
export async function resumeTimeTracking(data: ResumeTimeTrackingRequest): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/time-tracking/resume',
    data
  );
  return response.data;
}

/**
 * Get a current active time tracking session
 */
export async function getCurrentSession(): Promise<TimeTrackingSession | null> {
  const response = await axiosClient.get<TimeTrackingSession | null>('/time-tracking/current');
  return response.data;
}

/**
 * Get weekly time tracking statistics
 */
export async function getWeeklyStats(filter?: TimeTrackingFilter): Promise<WeeklyTimeStats> {
  const response = await axiosClient.post<WeeklyTimeStats>('/time-tracking/weekly-stats', filter);
  return response.data;
}

/**
 * Get time tracking history with filters
 */
export async function getTimeTrackingHistory(
  filter?: TimeTrackingFilter
): Promise<TimeTrackingSession[]> {
  const response = await axiosClient.post<TimeTrackingSession[]>('/time-tracking/history', filter);
  return response.data;
}
