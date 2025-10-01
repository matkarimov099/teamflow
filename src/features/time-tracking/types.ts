import type { LucideIcon } from 'lucide-react';

export interface TimeTrackingSession {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string | null;
  totalHours: number;
  status: TimeTrackingStatus;
  pauses: TimeTrackingPause[];
  createdAt: string;
  updatedAt: string;
}

export interface TimeTrackingPause {
  id: string;
  sessionId: string;
  pauseTime: string;
  resumeTime: string | null;
  reason: PauseReason;
  customReason?: string;
  duration: number; // in minutes
  createdAt: string;
}

export interface WeeklyTimeStats {
  weekStart: string;
  weekEnd: string;
  totalWorkHours: number;
  totalPauseHours: number;
  sessions: TimeTrackingSession[];
}

export const TimeTrackingStatus = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
} as const;

export type TimeTrackingStatus = (typeof TimeTrackingStatus)[keyof typeof TimeTrackingStatus];

export const PauseReason = {
  LUNCH: 'lunch',
  BREAK: 'break',
  MEETING: 'meeting',
  TECHNICAL_ISSUE: 'technical_issue',
  OTHER: 'other',
} as const;

export type PauseReason = (typeof PauseReason)[keyof typeof PauseReason];

// API Request/Response types
export interface StartTimeTrackingRequest {
  startTime: string;
}

export interface EndTimeTrackingRequest {
  endTime: string;
}

export interface PauseTimeTrackingRequest {
  reason: PauseReason;
  customReason?: string;
}

export interface ResumeTimeTrackingRequest {
  resumeTime: string;
}

export interface TimeTrackingFilter {
  startDate?: string;
  endDate?: string;
  status?: TimeTrackingStatus;
}

// Component Props Types
export interface PauseReasonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export interface RadioOptionProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
  description?: string;
}
