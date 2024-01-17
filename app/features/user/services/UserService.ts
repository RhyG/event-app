import { supabase } from '@app/core/lib/supabase';

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data;
}
