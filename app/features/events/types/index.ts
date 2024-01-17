export interface Event {
  created_at: string;
  event_date: string | null;
  event_description: string | null;
  event_name: string;
  host_id: string;
  id: number;
  is_private: boolean | null;
  password: string | null;
}
