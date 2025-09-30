import { getUserStats } from '@/features/user-stats/services/user-stats.service.ts';
import type { UserStatsInput } from '@/features/user-stats/types.ts';
import { useMutation } from '@tanstack/react-query';

export function useGetUserStats() {
  return useMutation({
    mutationFn: (data: UserStatsInput) => getUserStats(data),
    mutationKey: ['user-stats'],
  });
}
