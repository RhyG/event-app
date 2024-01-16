import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@app/navigation/types';

import { useAuthContext } from '../../providers/AuthProvider';

export function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>) {
  const { toggleLoggedIn } = useAuthContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Welcome!</Text>
      <TouchableOpacity onPress={toggleLoggedIn}>
        <Text>Login!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text>Create an account!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('JoinEventScreen')}>
        <Text>Open event!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
