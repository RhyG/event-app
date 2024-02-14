import { supabase } from '@app/core/lib/supabase';

export const AuthAPI = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data);

    if (error) {
      throw error;
    }

    return data;
  },
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return 'SUCCESS';
  },
  async createAccount(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw error;
    }

    return data;
  },
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com/update-password', // TODO: Setup universal/deep links so this works
    });

    if (error) throw error;

    return data;
  },
};
