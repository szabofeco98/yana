import { z } from 'zod';

export const loginRequestSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>['body'];
