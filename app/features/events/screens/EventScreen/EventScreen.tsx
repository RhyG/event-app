import { ScreenProp } from '@app/navigation/types';

import { useIsLoggedIn } from '@feature/user';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

export function EventScreen({ route }: ScreenProp<'EventScreen'>) {
  const { name, shouldPreventBack } = route.params;

  // When coming straight from creating an event the user should not be able to go back.
  useHeaderOptions({ title: name, ...(shouldPreventBack ? { headerBackVisible: false, gestureEnabled: false } : {}) });

  const isLoggedIn = useIsLoggedIn();

  return (
    <Screen>
      <Text>Event screen</Text>
    </Screen>
  );
}
