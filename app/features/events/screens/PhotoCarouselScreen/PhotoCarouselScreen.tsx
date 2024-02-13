import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { Text } from '@ui/components/Text';

export function PhotoCarouselScreen({ route }: ScreenProp<'PhotoCarouselScreen'>) {
  const initialIndex = route.params.initialIndex;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Rendering {initialIndex}</Text>
    </View>
  );
}
