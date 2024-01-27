import { useQuery } from '@tanstack/react-query';

import { EventsAPI } from './EventsAPI';

export const eventQueryKey = (id: string) => ['events', 'event', { id }] as const;

export function useEventQuery(eventId: string) {
  return useQuery({ queryKey: eventQueryKey(eventId), queryFn: () => EventsAPI.getEventById(eventId), staleTime: 60_000 });
}
