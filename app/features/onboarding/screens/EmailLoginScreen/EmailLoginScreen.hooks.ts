import { useNavigation } from '@react-navigation/native';

import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';
import { useEmailForm } from '@feature/onboarding/hooks/useEmailForm';

import { useLogin } from '../../../auth/hooks/useLogin';

export function useCreateAccountPress() {
  const navigation = useNavigation();
  const { toggleFormMode } = useWelcomeFlowContext();

  function onCreateAccountPress() {
    toggleFormMode();
    navigation.goBack();
  }

  return onCreateAccountPress;
}

export function useEmailLogin() {
  const { email, password, changeDetails } = useEmailForm();

  const loginUser = useLogin();

  function login() {
    if (email.length === 0 || password.length === 0) {
      return;
    }

    loginUser(email, password);
  }

  return { changeDetails, login };
}