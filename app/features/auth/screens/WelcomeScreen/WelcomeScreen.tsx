import { Text, TouchableOpacity } from 'react-native';

import { useIsLoggedIn } from '@app/features/user';
import { ScreenProp } from '@app/navigation/types';

import { BaseScreen } from '@ui/components/layout/BaseScreen';

import { useLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';

export function WelcomeScreen({ navigation }: ScreenProp<'WelcomeScreen'>) {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();
  const login = useLogin();

  return (
    <BaseScreen>
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
    </BaseScreen>
  );
}
