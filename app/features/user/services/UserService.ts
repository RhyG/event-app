import { supabase } from '@app/core/lib/supabase';

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!data || !data.session) {
    return null;
  }

  return data.session.user;
}
