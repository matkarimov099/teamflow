import type {
  Project,
  ProjectCreate,
  ProjectFilter,
  ProjectUpdate,
  Repository,
} from '@/features/projects/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createProject(data: ProjectCreate): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/projects/create',
    data
  );
  return response.data;
}

export async function updateProject(id: string, data: ProjectUpdate): Promise<ApiResponse> {
  const response = await axiosClient.put<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    `/projects/${id}`,
    data
  );
  return response.data;
}

export async function getProjects(filter: ProjectFilter): Promise<PaginatedResponse<Project>> {
  const response = await axiosClient.post<
    PaginatedResponse<Project>,
    AxiosResponse<PaginatedResponse<Project>, ServerError>
  >('/projects', filter);
  return response.data;
}

export async function deleteProject(id: string): Promise<ApiResponse> {
  const response = await axiosClient.delete<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    `/projects/${id}`
  );
  return response.data;
}

export async function checkProject(data: ProjectCreate): Promise<Repository> {
  const response = await axiosClient.post<Repository, AxiosResponse<Repository, ServerError>>(
    '/projects/check',
    data
  );
  return response.data;
}
