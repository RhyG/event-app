import { supabase } from '@app/core/lib/supabase';

export async function signUp() {
  const { data, error } = await supabase.auth.signUp({ email: 'rhysgeary@gmail.com', password: '123456' });
  if (error) {
    throw error;
  }
  return data;
}
