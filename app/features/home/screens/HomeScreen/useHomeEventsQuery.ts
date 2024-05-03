import { useAllEventsQuery } from '@core/domains/events/api/useUserEventsQuery';

export function useHomeEventsQuery() {
  const data = useAllEventsQuery();

  return { ...data, data: data.data?.slice(0, 5) };
}
