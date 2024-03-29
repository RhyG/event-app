export interface Event {
  created_at: string;
  event_date: string;
  access_code: string;
  event_description: string | null;
  event_name: string;
  host_id: string;
  id: string;
  is_private: boolean | null;
  password: string | null;
  preview_url: string | null;
}

export type EventById = Pick<Event, 'event_date' | 'id' | 'event_description' | 'event_name' | 'host_id' | 'access_code' | 'preview_url'>;

export type NewEvent = Pick<Event, 'event_date' | 'event_description' | 'event_name' | 'host_id' | 'is_private' | 'password'>;
