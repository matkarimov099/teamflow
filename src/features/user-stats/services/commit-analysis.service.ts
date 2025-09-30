import type { CommitAnalysisInput } from '@/features/user-stats/types.ts';
import axiosClient from '@/plugins/axios.ts';

export async function analyzeCommit(data: CommitAnalysisInput): Promise<string> {
  const response = await axiosClient.post<string>('/user-stats/analyze-commit', data);
  return response.data;
}
