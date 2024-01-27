import { TouchableOpacity } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { useUserEventsQuery } from '@feature/events/api/useUserEventsQuery';
import { Event } from '@feature/events/types';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

export function AllEventsScreen({ navigation }: ScreenProp<'AllEventsScreen'>) {
  const { data: events, isLoading, isError } = useUserEventsQuery();

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
        <TouchableOpacity key={event.id} onPress={() => navigation.navigate(Screens.EventScreen, { id: event.id, name: event.event_name })}>
          <Text>{event.event_name}</Text>
        </TouchableOpacity>
      ))}
    </Screen>
  );
}
