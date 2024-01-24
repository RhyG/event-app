import { supabase } from '@app/core/lib/supabase';

export const AuthAPI = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
  async createAccount(email = 'rhysgeary@gmail.com', password = '123456') {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw error;
    }

    return data;
  },
};
