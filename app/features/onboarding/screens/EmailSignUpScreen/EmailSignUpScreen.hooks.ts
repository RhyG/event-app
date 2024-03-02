import { useNavigation } from '@react-navigation/native';

import { AuthAPI } from '@feature/auth/api/AuthAPI';
import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';
import { useSetUser } from '@feature/user';

import { useEmailForm } from '../../hooks/useEmailForm';

export function useEmailSignUp() {
  const navigation = useNavigation();
  const setUser = useSetUser();

  const { changeDetails, getFormValues } = useEmailForm();

  async function createUser() {
    try {
      const { email, password } = getFormValues();
      const data = await AuthAPI.createAccount(email, password);

      if (data) {
        setUser(data.user);
        navigation.navigate('TabNavigator');
      }
    } catch (error) {
      // TODO: Something with the error
    }
  }

  return { changeDetails, createUser };
}

export function useSignUpPress() {
  const navigation = useNavigation();

  const { toggleFormMode } = useWelcomeFlowContext();

  function onSignInPress() {
    toggleFormMode();
    navigation.goBack();
  }

  return onSignInPress;
}
