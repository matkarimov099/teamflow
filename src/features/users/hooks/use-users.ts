import type { UserCreate, UserFilter, UserUpdate } from '@/features/users/types.ts';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  checkUser,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../services/users.service.ts';

const QUERY_KEYS = {
  USERS: 'users',
};

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, UserCreate>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] }).then();
    },
  });
}

export function useCheckUser() {
  return useMutation<boolean, ServerError, string>({
    mutationFn: checkUser,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, { id: string; data: UserUpdate }>({
    mutationFn: ({ id, data }: { id: string; data: UserUpdate }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] }).then();
    },
  });
}

export function useGetUsers(filter?: UserFilter) {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, filter],
    queryFn: filter ? () => getUsers(filter) : skipToken,
    placeholderData: keepPreviousData,
  });
}
useGetUsers.isQueryHook = true;

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] }).then();
    },
  });
}
