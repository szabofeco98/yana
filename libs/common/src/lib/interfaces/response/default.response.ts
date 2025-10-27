import z from 'zod';

export const defaultResponseSchema = z.object({
  message: z.string(),
});

export type DefaultResponse = z.infer<typeof defaultResponseSchema>;
