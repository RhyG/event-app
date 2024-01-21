import { supabase } from '@app/core/lib/supabase';

import { Event } from '../types';

// Temp for testing purposes
function getFutureTimestampTz(): string {
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const year = threeDaysLater.getUTCFullYear();
  const month = String(threeDaysLater.getUTCMonth() + 1).padStart(2, '0');
  const day = String(threeDaysLater.getUTCDate()).padStart(2, '0');
  const hours = String(threeDaysLater.getUTCHours()).padStart(2, '0');
  const minutes = String(threeDaysLater.getUTCMinutes()).padStart(2, '0');
  const seconds = String(threeDaysLater.getUTCSeconds()).padStart(2, '0');
  const timezoneOffset = -threeDaysLater.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const offsetSign = timezoneOffset > 0 ? '+' : '-';

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export async function createEvent(event: { date: string; name: string; description?: string; password?: string; userId: string }): Promise<Event[]> {
  const isPrivateEvent = !!event.password && event.password.length > 0;

  const newEvent = {
    event_date: getFutureTimestampTz(),
    event_description: event.description ?? null,
    event_name: event.name,
    host_id: event.userId,
    password: event.password ?? null,
    is_private: isPrivateEvent,
  };

  const { data, error } = await supabase.from('Events').insert([newEvent]).select();

  if (error) throw error;

  console.log('Created:', data);
  return data;
}
