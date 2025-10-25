import z from 'zod';

export const userResponseSchema = z.object({
  email: z.email(),
  username: z.string().min(1),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
