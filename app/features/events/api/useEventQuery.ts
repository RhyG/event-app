import { useQuery } from '@tanstack/react-query';

import { getEventPhotos } from '@feature/photo-management/services/PhotoService';

import { EventsAPI } from './EventsAPI';

export const eventDetailsQueryKey = (id: string) => ['events', 'event', { id }] as const;
export const eventImagesQueryKey = (id: string) => ['events', 'event', 'images', { id }] as const;

export function useEventDetailsQuery(eventId: string) {
  return useQuery({ queryKey: eventDetailsQueryKey(eventId), queryFn: () => EventsAPI.getEventById(eventId), staleTime: 60_000, refetchOnWindowFocus: true });
}

export function useEventImagesQuery(eventId: string) {
  return useQuery({
    queryKey: eventImagesQueryKey(eventId),
    queryFn: () => getEventPhotos(eventId),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
