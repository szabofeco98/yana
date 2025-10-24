import { z } from 'zod';

export const userRequestSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(1),
  }),
});

export type UserRequest = z.infer<typeof userRequestSchema>['body'];
