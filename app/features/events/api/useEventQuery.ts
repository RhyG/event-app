import { useQuery } from '@tanstack/react-query';

import { getEventPhotos } from '@feature/photo-management/services/PhotoService';

import { EventsAPI } from './EventsAPI';
import { eventDetailsQueryKey, eventPhotosQueryKey } from './query-keys';

export function useEventDetailsQuery(eventId: string) {
  return useQuery({ queryKey: eventDetailsQueryKey(eventId), queryFn: () => EventsAPI.getEventById(eventId), staleTime: 60_000, refetchOnWindowFocus: true });
}

export function useEventPhotosQuery(eventId: string) {
  return useQuery({
    queryKey: eventPhotosQueryKey(eventId),
    queryFn: () => getEventPhotos(eventId),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
