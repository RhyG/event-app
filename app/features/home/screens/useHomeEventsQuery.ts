import { useUserEventsQuery } from '@feature/events/api/useUserEventsQuery';

export function useHomeEventsQuery() {
  const data = useUserEventsQuery();

  return { ...data, data: data.data?.slice(0, 5) };
}
