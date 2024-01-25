import { useNavigation } from '@react-navigation/native';

import { AuthAPI } from '@feature/auth/api/AuthAPI';
import { useSetUser } from '@feature/user';

import { useEmailForm } from '../../hooks/useEmailForm';

export function useEmailSignUp() {
  const navigation = useNavigation();
  const setUser = useSetUser();

  const { changeDetails, email, password } = useEmailForm();

  async function createUser() {
    const data = await AuthAPI.createAccount(email, password);

    if (data) {
      setUser(data.user);
      navigation.navigate('TabNavigator');
    }
  }

  return { changeDetails, createUser };
}
