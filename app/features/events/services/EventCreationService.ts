import { supabase } from '@app/core/lib/supabase';

import { Event, NewEvent } from '../types';

export async function createEvent(event: NewEvent): Promise<Event[]> {
  const { data, error } = await supabase.from('Events').insert([event]).select();

  if (error) throw error;

  return data;
}
