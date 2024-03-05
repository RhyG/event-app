import I18n from 'i18n-js';
import { Controller } from 'react-hook-form';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { TwoPartPressableText } from '@feature/onboarding/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { ButtonWithLoading } from '@ui/components/ButtonWithLoading';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { useEmailSignUpForm, useSignUpPress } from './EmailSignUpScreen.hooks';

export function EmailSignUpScreen() {
  const {
    submitSignup,
    formState: { errors },
    control,
  } = useEmailSignUpForm();

  const onSignInPress = useSignUpPress();

  return (
    <WelcomeFlowScreen heading={I18n.t('emailSignUpScreen.heading')}>
      <VBox gap="medium">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              placeholder={I18n.t('emailLoginScreen.emailInputPlaceholder')}
              label={I18n.t('emailLoginScreen.emailInputLabel')}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput onBlur={onBlur} onChangeText={onChange} value={value} error={errors.password?.message} />
          )}
          name="password"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
        />

        <TwoPartPressableText texts={['Have an account already?', 'Sign in']} onPress={onSignInPress} />
        <ButtonWithLoading loading={false} onPress={submitSignup} label={I18n.t('emailSignUpScreen.createAccount')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

export const EmailSignUpScreenName = 'EmailSignUpScreen' as const;
