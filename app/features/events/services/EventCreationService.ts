import { supabase } from '@app/core/lib/supabase';

import { Event, NewEvent } from '../types';

export async function createEvent(event: NewEvent): Promise<Event> {
  const { data, error } = await supabase.functions.invoke('create-event', {
    body: { event },
  });

  if (error) throw error;

  return data;
}
