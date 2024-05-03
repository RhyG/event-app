import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { getEventPhotos } from '@core/domains/photo-management/services/PhotoService';

import { EventById } from '../types';
import { EventsAPI } from './EventsAPI';
import { eventDetailsQueryKey, eventPhotosQueryKey } from './query-keys';

export function useEventDetailsQuery<TSelector = undefined>(
  eventId: string,
  selector?: (data: EventById) => TSelector,
): UseQueryResult<TSelector extends undefined ? EventById : TSelector> {
  return useQuery({
    queryKey: eventDetailsQueryKey(eventId),
    queryFn: () => EventsAPI.getEventById(eventId),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    select: selector as unknown as (data: any) => any, // Type assertion to satisfy TS compiler.
  });
}

export function useEventPhotosQuery(eventId: string) {
  return useQuery({
    queryKey: eventPhotosQueryKey(eventId),
    queryFn: () => getEventPhotos(eventId),
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
