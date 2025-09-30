import type { UserStats, UserStatsInput } from '@/features/user-stats/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { AxiosResponse } from 'axios';

export async function getUserStats(data: UserStatsInput): Promise<UserStats> {
  const response = await axiosClient.post<UserStats, AxiosResponse<UserStats>>(
    '/user-stats/get',
    data
  );
  return response.data;
}
