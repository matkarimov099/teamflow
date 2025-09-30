import type {
  Analysis,
  AnalysisCreate,
  AnalysisFilter,
  AnalysisResponse,
  AnalysisStatus,
} from '@/features/analysis/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function getAnalyses(filter: AnalysisFilter) {
  return await axiosClient.post<PaginatedResponse<Analysis>>('/analysis', filter);
}

export async function getAnalysisById(id: string): Promise<Analysis> {
  const response = await axiosClient.get(`/analysis/${id}`);
  return response.data;
}

export async function checkAnalysisStatus(id: string): Promise<AnalysisStatus> {
  const response = await axiosClient.get(`/analysis/check/${id}`);
  return response.data;
}

export async function createAnalysis(data: AnalysisCreate): Promise<AnalysisResponse> {
  const response = await axiosClient.post<
    AnalysisResponse,
    AxiosResponse<AnalysisResponse, ServerError>
  >('/analysis/analyze', data);
  return response.data;
}

export async function deleteAnalysis(id: string): Promise<ApiResponse> {
  const response = await axiosClient.delete(`/analysis/${id}`);
  return response.data;
}
