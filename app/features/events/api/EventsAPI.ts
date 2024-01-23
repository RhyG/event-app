import { supabase } from '@core/lib/supabase';

import { Event } from '../types';

export const EventsAPI = {
  async getJoinDetails(code: string): Promise<Pick<Event, 'id' | 'is_private' | 'event_name'> | null> {
    console.log({ code });
    try {
      const { data, error } = await supabase.from('Events').select('*').eq('access_code', code).limit(1);
      console.log(data, error);

      if (error) {
        throw error;
      }

      return data[0] ?? null;
    } catch (err) {
      console.error('Error fetching event join details:', err);
      return null;
    }
  },
  async authenticateEventPassword(code: string, password: string) {
    const { data, error } = await supabase.functions.invoke('join-event', {
      body: { code, password },
    });

    if (error) throw error;

    return data;
  },
};
