import { useAllEventsQuery } from '@feature/home/api/useEventsQuery';

export function useHomeEventsQuery() {
  const data = useAllEventsQuery();

  return { ...data, data: data.data?.slice(0, 5) };
}
