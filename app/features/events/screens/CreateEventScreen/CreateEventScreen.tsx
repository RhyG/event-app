import { Text } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

export function CreateEventScreen({ navigation }: ScreenProp<'CreateEventScreen'>) {
  return (
    <BaseScreen>
      <Text>Create event</Text>
    </BaseScreen>
  );
}
