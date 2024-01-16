import { signUp } from '@app/features/auth/lib/signUp';
import { useSetUser } from '@app/features/auth/providers/AuthProvider';

export function useCreateUser() {
  const setUser = useSetUser();

  async function createUser() {
    const data = await signUp();

    setUser(data.user);
    // navigation.navigate('TabNavigator');
  }

  return createUser;
}
