import { Text, TouchableOpacity } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

import { AuthAPI } from '../../api/AuthAPI';

export function CreateAccountScreen({ navigation }: ScreenProp<'CreateAccountScreen'>) {
  async function createUser() {
    const data = await AuthAPI.createAccount();
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
