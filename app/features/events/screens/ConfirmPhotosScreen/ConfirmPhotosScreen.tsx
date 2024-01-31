import { Feather } from '@expo/vector-icons';

import { ScreenProp } from '@app/navigation/types';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

import { Gallery } from '../../components/Gallery';

export function ConfirmPhotosScreen({ route }: ScreenProp<'ConfirmPhotosScreen'>) {
  const { photos } = route.params;

  useHeaderOptions({
    headerRight: () => <Feather name="save" size={24} color="black" />,
  });

  return (
    <Screen>
      <Gallery photos={photos} />
    </Screen>
  );
}
