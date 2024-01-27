import { FunctionsHttpError } from '@supabase/supabase-js';

import { supabase } from '@core/lib/supabase';

import { Event, NewEvent } from '../types';

type EventById = Pick<Event, 'event_date' | 'id' | 'event_description' | 'event_name' | 'host_id' | 'access_code'>;

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
    const { data, error } = await supabase.from('Events').select('id,event_name,event_date').eq('host_id', userId);

    if (error) throw error;

    return data as Array<Event>;
  },
  async getEventById(eventId: string): Promise<EventById> {
    const { data, error } = await supabase.from('Events').select('event_date,id,event_description,event_name,host_id,access_code').eq('id', eventId).limit(1);

    if (error) throw error;

    return data[0] as EventById;
  },
};
