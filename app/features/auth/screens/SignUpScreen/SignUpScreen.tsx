import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenProp } from '@app/navigation/types';

import { signup } from '../../services/AuthService';

export function SignUpScreen({ navigation }: ScreenProp<'SignUpScreen'>) {
  async function createUser() {
    const data = await signup();
    console.log({ data });
    navigation.navigate('TabNavigator');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Sign up!</Text>
      <TouchableOpacity onPress={createUser}>
        <Text>Email and password!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text>Apple!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text>Google!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
