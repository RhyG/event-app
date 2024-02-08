import { useQuery } from '@tanstack/react-query';

import { getEventPhotos } from '@feature/photo-management/services/PhotoService';

import { EventsAPI } from './EventsAPI';

export const eventDetailsQueryKey = (id: string) => ['events', { id }] as const;
export const eventPhotosQueryKey = (id: string) => ['events', 'photos', { id }] as const;

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
