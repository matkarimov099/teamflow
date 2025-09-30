import type { Agent, AgentCreate, AgentFilter, AgentUpdate } from '@/features/ai-agents/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createAgent(data: AgentCreate): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/agents/create',
    data
  );
  return response.data;
}

export async function updateAgent(id: string, data: AgentUpdate): Promise<ApiResponse> {
  const response = await axiosClient.put<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    `/agents/${id}`,
    data
  );
  return response.data;
}

export async function getAgents(
  filter: AgentFilter
): Promise<AxiosResponse<PaginatedResponse<Agent>>> {
  return await axiosClient.post<PaginatedResponse<Agent>>('/agents', filter);
}

export async function deleteAgent(id: string): Promise<AxiosResponse<ApiResponse>> {
  const response = await axiosClient.delete(`/agents/${id}`);
  return response.data;
}
