import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@app/navigation/types';

import { signUp } from '../../lib/signup';

export function SignUpScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>) {
  async function createUser() {
    const data = await signUp();
    console.log({ data });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Sign up!</Text>
      <TouchableOpacity onPress={createUser}>
        <Text>Go back!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
