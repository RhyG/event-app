import { z } from 'zod';

const envVars = z.object({
  EXPO_PUBLIC_SUPABASE_URL: z.string(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  EXPO_PUBLIC_AWS_ACCESS_KEY_ID: z.string(),
  EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY: z.string(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
