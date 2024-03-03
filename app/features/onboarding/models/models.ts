import { ZodType, z } from 'zod';

interface EmailAuthData {
  email: string;
  password: string;
}

export const EmailAuthSchema: ZodType<EmailAuthData> = z.object({
  email: z.string().email(),
  password: z.string(),
});
