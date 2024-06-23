import { FlashList, ListRenderItem } from '@shopify/flash-list';

import { Event } from '@core/domains/events/types';

import { useAllEventsQuery } from '../../../api/useEventsQuery';
import { EventCard } from './EventCard';

function selectSortedEvents(events: Event[]) {
  return events.sort((a: Event, b: Event) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
}

const renderItem: ListRenderItem<Event> = ({ item }) => <EventCard {...item} />;

export function EventList() {
  const { data: events } = useAllEventsQuery(selectSortedEvents);

  if (!events || events.length === 0) return null;

  // TODO: filters and sorting
  return (
    <>
      <FlashList data={events} renderItem={renderItem} estimatedItemSize={114} />
      {/* Add a footer here with an illustration saying "That's all for now" or something like that. */}
    </>
  );
}
