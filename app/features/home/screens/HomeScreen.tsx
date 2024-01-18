import { Text, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  return (
    <BaseScreen>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('CreateEventScreen')}>
          <Text>Create new event</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Upcoming events</Text>
      </View>
      <View>
        <Text>Previous events</Text>
      </View>
    </BaseScreen>
  );
}
