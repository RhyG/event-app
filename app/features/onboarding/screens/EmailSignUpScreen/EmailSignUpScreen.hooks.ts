import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthAPI } from '@feature/auth/api/AuthAPI';
import { useWelcomeFlowContext } from '@feature/onboarding/context/WelcomeFlowContext';
import { useSetUser } from '@feature/user';

import { useToastContext } from '@core/providers/ToastProvider';

// Schemas are fine here for now just be conscious of re-use
// and if shared move to a schema folder for the feature.
export const EmailSignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

type EmailSignupForm = z.infer<typeof EmailSignupSchema>;

export function useEmailSignUpForm() {
  const navigation = useNavigation();
  const setUser = useSetUser();
  const { showToast } = useToastContext();

  const { handleSubmit, ...rest } = useForm<EmailSignupForm>({
    resolver: zodResolver(EmailSignupSchema),
  });

  async function createUser({ email, password }: EmailSignupForm) {
    try {
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
