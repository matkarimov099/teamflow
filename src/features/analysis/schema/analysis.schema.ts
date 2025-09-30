import { z } from 'zod';

export const analysisCreateSchema = () => {
  return z
    .object({
      projectId: z.string().min(1, 'Project is required'),
      agentId: z.string().min(1, 'Agent is required'),
      userIds: z.array(z.string().min(1)).min(1, 'At least one user is required'),
      from: z.date({
        required_error: 'From date is required',
      }),
      to: z.date({
        required_error: 'To date is required',
      }),
    })
    .refine(data => data.from <= data.to, {
      message: 'From date must be before or equal to To date',
      path: ['to'],
    });
};

export type AnalysisCreateSchema = z.infer<ReturnType<typeof analysisCreateSchema>>;
