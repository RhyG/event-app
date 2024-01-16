import { supabase } from '@app/core/lib/supabase';

export async function signUp(email = 'rhysgeary@gmail.com', password = '123456') {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data;
}
