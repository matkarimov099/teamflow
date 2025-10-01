import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent,
} from '@/features/ai-agents/services/agents.service.ts';
import type { AgentCreate, AgentFilter, AgentUpdate } from '@/features/ai-agents/types.ts';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const QUERY_KEYS = {
  AGENTS: 'agents',
};

export function useCreateAgent() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, AgentCreate>({
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] }).then();
    },
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, { id: string; data: AgentUpdate }>({
    mutationFn: ({ id, data }: { id: string; data: AgentUpdate }) => updateAgent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] }).then();
    },
  });
}

export function useGetAgents(filter?: AgentFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.AGENTS, filter],
    queryFn: filter ? () => getAgents(filter) : skipToken,
    placeholderData: keepPreviousData,
    select: data => data.data,
  });
}
useGetAgents.isQueryHook = true;

export function useDeleteAgent() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, string>({
    mutationFn: (id: string) => deleteAgent(id).then(response => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] }).then();
    },
  });
}
