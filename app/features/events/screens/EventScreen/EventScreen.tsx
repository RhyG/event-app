import { ScreenProp } from '@app/navigation/types';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

export function EventScreen({ route }: ScreenProp<'EventScreen'>) {
  useHeaderOptions({ title: route.params.name });

  return (
    <Screen>
      <Text>Event screen</Text>
    </Screen>
  );
}
