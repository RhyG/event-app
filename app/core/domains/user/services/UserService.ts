import { supabase } from '@core/lib/supabase';

/**
 * Gets the current user in session.
 * @returns the current user in session.
 */
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
