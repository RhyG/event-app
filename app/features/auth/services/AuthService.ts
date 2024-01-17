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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  return 'SUCCESS';
}

export async function signup(email = 'rhysgeary@gmail.com', password = '123456') {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data;
}
