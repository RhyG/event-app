import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIsLoggedIn } from '@app/features/user';
import { ScreenProp } from '@app/navigation/types';

import { useLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';

export function WelcomeScreen({ navigation }: ScreenProp<'WelcomeScreen'>) {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();
  const login = useLogin();

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
