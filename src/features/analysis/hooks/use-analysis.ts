import type {
  AnalysisCreate,
  AnalysisFilter,
  AnalysisResponse,
  AnalysisStatus,
} from '@/features/analysis/types.ts';
import type { ServerError } from '@/types/common.ts';
import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  checkAnalysisStatus,
  createAnalysis,
  deleteAnalysis,
  getAnalyses,
  getAnalysisById,
} from '../services/analysis.service.ts';

export function useCreateAnalysis() {
  const queryClient = useQueryClient();
  return useMutation<AnalysisResponse, ServerError, AnalysisCreate>({
    mutationFn: createAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis'] }).then();
    },
  });
}

export function useGetAnalyses(filter?: AnalysisFilter) {
  return useQuery({
    queryKey: ['analysis', filter],
    queryFn: filter ? () => getAnalyses(filter) : skipToken,
    placeholderData: keepPreviousData,
  });
}
useGetAnalyses.isQueryHook = true;

export function useGetAnalysisById(id: string) {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysisById(id),
    enabled: !!id,
  });
}

export function useCheckAnalysisStatus(id: string, enabled = true) {
  return useQuery<AnalysisStatus>({
    queryKey: ['analysis-status', id],
    queryFn: () => checkAnalysisStatus(id),
    enabled: enabled && !!id,
    refetchInterval: query => {
      // Stop polling if analysis is completed or failed
      const data = query.state?.data;
      if (data === 'success' || data === 'failed') {
        return false;
      }
      // Poll every 5 seconds for in-progress analyses
      return 5000;
    },
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAnalysis(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis'] }).then();
    },
  });
}
