import { useQuery } from '@tanstack/react-query';

import { useUserContext } from '@core/context/UserContext';

import { EventsAPI } from '../../../core/domains/events/api/EventsAPI';
import { Event } from '../../../core/domains/events/types';

const userEventsQueryKey = ['events'];

function sortEventsByDate(a: Event, b: Event) {
  return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
}

const selectors = {
  selectPreviousEvents: (events: Event[]) => events.filter(event => new Date(event.event_date) < new Date()).sort(sortEventsByDate),
  selectUpcomingEvents: (events: Event[]) => events.filter(event => new Date(event.event_date) >= new Date()).sort(sortEventsByDate),
};

export function useAllEventsQuery(selector?: (events: Event[]) => Event[]) {
  const { user } = useUserContext();

  return useQuery({ queryKey: userEventsQueryKey, queryFn: () => EventsAPI.getUserEvents(user?.id ?? ''), select: selector });
}

export function usePreviousEventsQuery() {
  return useAllEventsQuery(selectors.selectPreviousEvents);
}

export function useUpcomingEventsQuery() {
  return useAllEventsQuery(selectors.selectUpcomingEvents);
}
