import { FunctionsHttpError } from '@supabase/supabase-js';

import { supabase } from '@core/lib/supabase';

import { Event, NewEvent } from '../types';

export const EventsAPI = {
  async getJoinDetails(code: string): Promise<Pick<Event, 'id' | 'is_private' | 'event_name'> | null> {
    const { data, error } = await supabase.from('Events').select('*').eq('access_code', code).limit(1);

    if (error) {
      throw error;
    }

    return data[0] ?? null;
  },
  async authenticateEventPassword(code: string, password: string) {
    const { data, error } = await supabase.functions.invoke('join-event', {
      body: { code, password },
    });

    if (error) {
      let message = 'Unknown error';

      // TODO establish consistent way to handle errors and error messages
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        message = errorMessage.error;
      }

      throw message;
    }

    return data;
  },
  async createEvent(event: NewEvent): Promise<Event> {
    const { data, error } = await supabase.functions.invoke('create-event', {
      body: { event },
    });

    if (error) throw error;

    return data as Event;
  },
  async getUserEvents(userId: string): Promise<Array<Event>> {
    const { data, error } = await supabase.from('Events').select('*').eq('host_id', userId);

    if (error) throw error;

    return data;
  },
};
