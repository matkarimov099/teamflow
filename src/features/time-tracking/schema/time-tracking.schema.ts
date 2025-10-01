import { PauseReason } from '@/features/time-tracking/types.ts';
import { z } from 'zod';

export const timeTrackingSchema = z.object({
  reason: z.nativeEnum(PauseReason, {
    required_error: 'Please select a reason',
    invalid_type_error: 'Invalid reason selected',
  }),
  customReason: z
    .string()
    .min(3, 'Custom reason must be at least 3 characters')
    .max(200, 'Custom reason must not exceed 200 characters')
    .optional(),
});

export type PauseReasonFormData = z.infer<typeof timeTrackingSchema>;
