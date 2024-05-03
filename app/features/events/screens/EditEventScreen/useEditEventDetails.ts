import { useEventDetailsQuery } from '@core/domains/events/api/useEventQuery';
import { EventById } from '@core/domains/events/types';

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
