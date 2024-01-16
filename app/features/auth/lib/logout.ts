import { supabase } from '@app/core/lib/supabase';

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  return 'SUCCESS';
}
