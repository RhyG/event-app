import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@app/navigation/types';

import { useLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';
import { useIsLoggedIn } from '../../providers/AuthProvider';

export function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'WelcomeScreen'>) {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();
  const login = useLogin();

  console.log({ isLoggedIn });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Welcome!</Text>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logout}>
          <Text>Logout!</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={login}>
            <Text>Login!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text>Create an account!</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('JoinEventScreen')}>
        <Text>Open event!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
