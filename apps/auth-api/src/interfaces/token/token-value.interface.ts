import z from 'zod';

export const tokenSchema = z.object({
  sessionToken: z.uuid(),
  refreshToken: z.uuid(),
});

export type TokenValue = z.infer<typeof tokenSchema>;
