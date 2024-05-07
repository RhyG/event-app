import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';

import { useSetUser } from '@core/context/UserContext';
import { loginUser as _loginUser } from '@core/domains/auth/services/AuthService';

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
  const setUser = useSetUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, ...rest } = useForm<z.infer<typeof EmailLoginSchema>>({
    resolver: zodResolver(EmailLoginSchema),
  });

  async function loginUser({ email, password }: { email: string; password: string }) {
    setIsSubmitting(true);
    await _loginUser({ email, password, onSuccess: setUser });
    setIsSubmitting(false);
  }

  const submitLogin = handleSubmit(loginUser);

  return { submitLogin, isSubmitting, ...rest };
}
