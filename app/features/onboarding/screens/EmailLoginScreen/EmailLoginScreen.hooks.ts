import { useLogin } from '@features/auth/hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';
import { EmailAuthSchema } from '@feature/onboarding/models/models';

export function useCreateAccountPress() {
  const navigation = useNavigation();
  const { toggleFormMode } = useWelcomeFlowContext();

  function onCreateAccountPress() {
    toggleFormMode();
    navigation.goBack();
  }

  return onCreateAccountPress;
}

type EmailLoginFieldData = {
  email: string;
  password: string;
};

export function useEmailLoginForm() {
  const { handleSubmit, ...rest } = useForm<EmailLoginFieldData>({
    resolver: zodResolver(EmailAuthSchema),
  });

  const loginUser = useLogin();

  const submitLogin = handleSubmit(loginUser);

  return { submitLogin, ...rest };
}
