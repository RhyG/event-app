import { supabase } from '@app/core/lib/supabase';

export async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'rhysgeary@gmail.com',
    password: '123456',
  });

  if (error) {
    throw error;
  }

  return data;
}
