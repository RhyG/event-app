import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { AuthAPI } from '@feature/auth/api/AuthAPI';
import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';
import { EmailSignupSchema } from '@feature/onboarding/models/models';
import { useSetUser } from '@feature/user';

import { useToastContext } from '@core/providers/ToastProvider';

type EmailSignupFieldData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function useEmailSignUp() {
  const navigation = useNavigation();
  const setUser = useSetUser();
  const { showToast } = useToastContext();

  const { handleSubmit, ...rest } = useForm<EmailSignupFieldData>({
    resolver: zodResolver(EmailSignupSchema),
  });

  async function createUser({ email, password }: { email: string; password: string }) {
    try {
      throw new Error();
      const data = await AuthAPI.createAccount(email, password);

      if (data) {
        setUser(data.user);
        navigation.navigate('TabNavigator');
      }
    } catch (error) {
      showToast({ message: 'Something went wrong', type: 'ERROR' });
    }
  }

  const submitSignup = handleSubmit(createUser);

  return { submitSignup, ...rest };
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
