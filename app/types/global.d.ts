declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
      EXPO_PUBLIC_AWS_ACCESS_KEY_ID: string;
      EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY: string;
      [key: string]: string | undefined;
    }
  }
}
