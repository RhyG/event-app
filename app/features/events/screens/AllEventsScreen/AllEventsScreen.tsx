import { useAllEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { EventCard } from '@feature/events/components/EventCard';
import { Event } from '@feature/events/types';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

export function AllEventsScreen() {
  useHeaderOptions({
    title: 'All Previous Events',
  });

  const { data: events, isLoading, isError } = useAllEventsQuery();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!events || events.length === 0) return null;

  return (
    <Screen>
      {events.map((event: Event) => (
        <EventCard {...event} />
      ))}
    </Screen>
  );
}

AllEventsScreen.screenName = 'AllEventsScreen' as const;
