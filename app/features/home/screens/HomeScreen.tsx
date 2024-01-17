import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenProp } from '@app/navigation/types';

export function HomeScreen({ navigation }: ScreenProp<'HomeScreen'>) {
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}
