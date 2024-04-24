import { useAllEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { EventCard } from '@feature/events/components/EventCard';
import { Event } from '@feature/events/types';

import { VBox } from '@ui/components/layout/Box';

function selectSortedEvents(events: Event[]) {
  return events.sort((a: Event, b: Event) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
}

export function EventList() {
  const { data } = useAllEventsQuery(selectSortedEvents);

  if (!data || data.length === 0) return null;

  return (
    <VBox>
      {/* TODO: filters and sorting */}
      {data.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
      {/* Add a footer here with an illustration saying "That's all for now" or something like that. */}
    </VBox>
  );
}
