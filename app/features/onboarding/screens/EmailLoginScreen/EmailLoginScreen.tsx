import I18n from 'i18n-js';
import { Controller } from 'react-hook-form';

import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { TwoPartPressableText } from '@feature/onboarding/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { ButtonWithLoading } from '@ui/components/ButtonWithLoading';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';
import { useSafeAreaInsetsStyle } from '@ui/hooks/useSafeAreaInsetsStyle';

import { ResetPasswordScreenName } from '../ResetPasswordScreen/ResetPasswordScreen';
import { useCreateAccountPress, useEmailLoginForm } from './EmailLoginScreen.hooks';

export function EmailLoginScreen({ navigation }: ScreenProp<typeof EmailLoginScreenName>) {
  const {
    control,
    submitLogin,
    formState: { errors },
    isSubmitting,
  } = useEmailLoginForm();

  const onCreateAccountPress = useCreateAccountPress();

  // Bit ugly, but ensures content is above bottom bar and satisfies the arithmetic type requirements.
  // const insets = useSafeAreaInsetsStyle(['bottom']);
  // const paddingBottom = ((insets?.paddingBottom as number) ?? 0) * 1.8;

  return (
    <WelcomeFlowScreen heading={I18n.t('emailLoginScreen.heading')}>
      <VBox gap="medium" style={{ marginBottom: 'auto' }}>
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

        <TwoPartPressableText texts={['New here?', 'Create an account']} onPress={onCreateAccountPress} />
      </VBox>
      {/* TODO: Work out why marginTop: auto isn't working here */}
      <VBox style={{ marginTop: 300 }}>
        <TwoPartPressableText texts={['Forgot password?', 'Reset it']} onPress={() => navigation.navigate(ResetPasswordScreenName)} />

        <ButtonWithLoading loading={isSubmitting} onPress={submitLogin} label={I18n.t('emailLoginScreen.signIn')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

export const EmailLoginScreenName = 'EmailLoginScreen' as const;
