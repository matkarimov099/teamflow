import type { LoginCredentials } from '@/features/auth/types.ts';
import { z } from 'zod';

// Phone number regex for Uzbekistan
// const phoneRegex = /^(?:\+998|998|8)\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

export const createLoginSchema = () => {
  return z.object({
    username: z.string().min(1, 'Username is required'),
    password: z
      .string({ message: 'Password is required' })
      .min(4, 'Password must be at least 4 characters'),
  }) satisfies z.ZodType<LoginCredentials>;
};

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
