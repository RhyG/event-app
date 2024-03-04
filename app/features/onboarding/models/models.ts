import { z } from 'zod';

export const EmailAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const EmailSignupSchema = EmailAuthSchema.extend({
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });
