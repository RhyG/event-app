import { useQuery } from '@tanstack/react-query';

import { useUserContext } from '@feature/user';

import { EventsAPI } from './EventsAPI';

const userEventsQueryKey = ['events'];

export function useUserEventsQuery() {
  const { user } = useUserContext();

  return useQuery({ queryKey: userEventsQueryKey, queryFn: () => EventsAPI.getUserEvents(user?.id ?? '') });
}
