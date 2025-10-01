import { analyzeCommit } from '@/features/user-stats/services/commit-analysis.service.ts';
import type { CommitAnalysisInput } from '@/features/user-stats/types.ts';
import { useMutation } from '@tanstack/react-query';

const QUERY_KEYS = {
  COMMIT_ANALYSIS: 'commit-analysis',
};

export function useCommitAnalysis() {
  return useMutation({
    mutationFn: (data: CommitAnalysisInput) => analyzeCommit(data),
    mutationKey: [QUERY_KEYS.COMMIT_ANALYSIS],
  });
}
