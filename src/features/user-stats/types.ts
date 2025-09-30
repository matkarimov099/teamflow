import type { Project } from '@/features/projects/types.ts';
import type { User } from '@/features/users/types.ts';

export interface UserStatsInput {
  projectId: string;
  userId: string;
  from: string;
  to: string;
}

export interface FileChange {
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
  status: string;
}

export interface CommitSummary {
  sha: string;
  message: string;
  date: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  files: FileChange[];
}

export interface UserStats {
  user: User;
  project: Project;
  dateFrom: string;
  dateTo: string;
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
  totalChangedFiles: number;
  commits: CommitSummary[];
  topFiles: FileChange[];
  fileExtensions: Record<string, number>;
}

export interface CommitAnalysisInput {
  projectId: string;
  commitSha: string;
}
