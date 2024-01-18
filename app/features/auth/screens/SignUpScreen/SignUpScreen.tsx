import { Text, TouchableOpacity } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

import { signup } from '../../services/AuthService';

export function SignUpScreen({ navigation }: ScreenProp<'SignUpScreen'>) {
  async function createUser() {
    const data = await signup();
    console.log({ data });
    navigation.navigate('TabNavigator');
  }

  return (
    <BaseScreen>
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
    </BaseScreen>
  );
}
