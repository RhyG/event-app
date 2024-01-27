import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { useEventQuery } from '@feature/events/api/useEventQuery';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

function ShareEventButton() {
  return (
    <TouchableOpacity>
      <Feather name="share" size={24} color="black" />
    </TouchableOpacity>
  );
}

export function EventScreen({ route }: ScreenProp<'EventScreen'>) {
  const { name, shouldPreventBack, id } = route.params;

  // When coming straight from creating an event the user should not be able to go back.
  useHeaderOptions({
    title: name,
    ...(shouldPreventBack ? { headerBackVisible: false, gestureEnabled: false } : {}),
    headerRight: () => <ShareEventButton />,
  });

  const { data: event, isLoading, isError, error } = useEventQuery(id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!event) return null;

  return (
    <Screen>
      <Text>{event.event_description}</Text>
      <Text>{event.event_date}</Text>
    </Screen>
  );
}
