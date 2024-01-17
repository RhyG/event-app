import { supabase } from '@app/core/lib/supabase';

import { Event } from '../types';

export async function createEvent(event: Event) {
  const { data, error } = await supabase.from('Events').insert([event]).select();

  if (error) throw error;

  return data;
}
