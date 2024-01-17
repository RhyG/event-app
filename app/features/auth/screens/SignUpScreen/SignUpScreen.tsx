import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@app/navigation/types';

import { signup } from '../../services/AuthService';

export function SignUpScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>) {
  async function createUser() {
    const data = await signup();
    console.log({ data });
    navigation.navigate('TabNavigator');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Sign up!</Text>
      <TouchableOpacity onPress={createUser}>
        <Text>Email and pasword!</Text>
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
