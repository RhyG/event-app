import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { RootStackParamList } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

export function JoinEventScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'JoinEventScreen'>) {
  return (
    <BaseScreen>
      <Text>Join Event</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Login!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text>Signup!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
        <Text>Open event!</Text>
      </TouchableOpacity> */}
    </BaseScreen>
  );
}
