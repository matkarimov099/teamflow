import type { Agent } from '@/features/ai-agents/types.ts';
import type { Project } from '@/features/projects/types.ts';
import type { User } from '@/features/users/types.ts';
import type { PaginationFilter } from '@/types/common.ts';

export interface Analysis {
  id: string;
  createdAt: string;
  project: Project;
  agent: Agent;
  users: User[];
  response: string;
  dateFrom: string;
  dateTo: string;
  durationSeconds: number;
}

export interface AnalysisFilter extends PaginationFilter {
  projectId?: string;
  agentId?: string;
  userId?: string;
}

export interface AnalysisCreate {
  projectId: string;
  agentId: string;
  userIds: string[];
  from: string;
  to: string;
}

export interface AnalysisResponse {
  id: string;
  message: string;
}

export type AnalysisStatus =
  | 'started'
  | 'get_commits'
  | 'get_commit_details'
  | 'analyzing'
  | 'success'
  | 'failed'
  | null;
