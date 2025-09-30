import type { ProjectCreate, ProjectUpdate } from '@/features/projects/types.ts';
import { z } from 'zod';

export const projectCreateSchema = () => {
  return z.object({
    url: z
      .string()
      .url('Please enter a valid URL')
      .regex(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
  }) satisfies z.ZodType<ProjectCreate>;
};

export type ProjectCreateSchema = z.infer<ReturnType<typeof projectCreateSchema>>;

export const projectUpdateSchema = () => {
  return z.object({
    url: z
      .string()
      .url('Please enter a valid URL')
      .regex(/^https?:\/\/.+/, 'URL must start with http:// or https://'),
  }) satisfies z.ZodType<ProjectUpdate>;
};

export type ProjectUpdateSchema = z.infer<ReturnType<typeof projectUpdateSchema>>;
