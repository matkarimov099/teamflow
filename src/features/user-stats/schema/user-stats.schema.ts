import type { UserStatsInput } from '@/features/user-stats/types.ts';
import { z } from 'zod';

export const userStatsInputSchema = () => {
  return z.object({
    projectId: z.string().min(1, 'Project is required'),
    userId: z.string().min(1, 'User is required'),
    from: z.string().min(1, 'From date is required'),
    to: z.string().min(1, 'To date is required'),
  }) satisfies z.ZodType<UserStatsInput>;
};

export type UserStatsInputSchema = z.infer<ReturnType<typeof userStatsInputSchema>>;
