import type { AgentCreate, AgentUpdate } from '@/features/ai-agents/types.ts';
import { z } from 'zod';

export const agentCreateSchema = () => {
  return z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be 100 characters or less'),
    prompt: z
      .string()
      .min(10, 'Prompt must be at least 10 characters')
      .max(10000, 'Prompt must be 10000 characters or less'),
    description: z
      .string()
      .max(1000, 'Description must be 1000 characters or less')
      .optional()
      .transform(val => (val === '' ? undefined : val)),
  }) satisfies z.ZodType<AgentCreate>;
};

export type AgentCreateSchema = z.infer<ReturnType<typeof agentCreateSchema>>;

export const agentUpdateSchema = () => {
  return z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be 100 characters or less')
      .optional(),
    prompt: z
      .string()
      .min(10, 'Prompt must be at least 10 characters')
      .max(2000, 'Prompt must be 2000 characters or less')
      .optional(),
    description: z
      .string()
      .max(500, 'Description must be 500 characters or less')
      .optional()
      .transform(val => (val === '' ? undefined : val)),
  }) satisfies z.ZodType<AgentUpdate>;
};

export type AgentUpdateSchema = z.infer<ReturnType<typeof agentUpdateSchema>>;
