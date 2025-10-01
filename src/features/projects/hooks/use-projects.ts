import {
  checkProject,
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '@/features/projects/services/projects.service.ts';
import type {
  ProjectCreate,
  ProjectFilter,
  ProjectUpdate,
  Repository,
} from '@/features/projects/types.ts';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const QUERY_KEYS = {
  PROJECTS: 'projects',
};

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, ProjectCreate>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }).then();
    },
  });
}

export function useCheckProject() {
  return useMutation<Repository, ServerError, ProjectCreate>({
    mutationFn: checkProject,
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, { id: string; data: ProjectUpdate }>({
    mutationFn: ({ id, data }: { id: string; data: ProjectUpdate }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }).then();
    },
  });
}

export function useGetProjects(filter?: ProjectFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, filter],
    queryFn: filter ? () => getProjects(filter) : skipToken,
    placeholderData: keepPreviousData,
  });
}
useGetProjects.isQueryHook = true;

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, string>({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] }).then();
    },
  });
}
