import { useQuery } from '@tanstack/react-query';

import { useUserContext } from '@feature/user';

import { Event } from '../types';
import { EventsAPI } from './EventsAPI';

const userEventsQueryKey = ['events'];

const selectors = {
  selectPreviousEvents: (events: Event[]) => events.filter(event => new Date(event.event_date) < new Date()),
  selectUpcomingEvents: (events: Event[]) => events.filter(event => new Date(event.event_date) >= new Date()),
};

export function useUserEventsQuery(selector?: (events: Event[]) => Event[]) {
  const { user } = useUserContext();

  return useQuery({ queryKey: userEventsQueryKey, queryFn: () => EventsAPI.getUserEvents(user?.id ?? ''), select: selector });
}

export function usePreviousEventsQuery() {
  return useUserEventsQuery(selectors.selectPreviousEvents);
}

export function useUpcomingEventsQuery() {
  return useUserEventsQuery(selectors.selectUpcomingEvents);
}
