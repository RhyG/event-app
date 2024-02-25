import { useEventDetailsQuery } from '@feature/events/api/useEventQuery';
import { EventById } from '@feature/events/types';

function selector(data: EventById) {
  const { event_name, event_description, event_date } = data;

  const eventIsInPast = new Date(event_date) < new Date();

  return {
    event_name,
    event_description,
    event_date,
    eventIsInPast,
  };
}

export function useEditEventDetails(id: string) {
  return useEventDetailsQuery(id, selector);
}
