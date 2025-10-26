import z from 'zod';

export const loginResponseSchema = z.object({
  message: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
