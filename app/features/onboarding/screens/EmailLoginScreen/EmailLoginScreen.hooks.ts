import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLogin } from '@feature/auth/hooks/useLogin';
import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';

const EmailLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function useCreateAccountPress() {
  const navigation = useNavigation();
  const { toggleFormMode } = useWelcomeFlowContext();

  function onCreateAccountPress() {
    toggleFormMode();
    navigation.goBack();
  }

  return onCreateAccountPress;
}

export function useEmailLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, ...rest } = useForm<z.infer<typeof EmailLoginSchema>>({
    resolver: zodResolver(EmailLoginSchema),
  });

  const _loginUser = useLogin();

  async function loginUser({ email, password }: { email: string; password: string }) {
    setIsSubmitting(true);
    await _loginUser({ email, password });
    setIsSubmitting(false);
  }

  const submitLogin = handleSubmit(loginUser);

  return { submitLogin, isSubmitting, ...rest };
}
