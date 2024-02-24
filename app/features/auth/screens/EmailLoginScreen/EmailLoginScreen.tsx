import I18n from 'i18n-js';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/auth/components/PasswordInput';
import { TwoPartPressableText } from '@feature/auth/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { ButtonWithLoading } from '@ui/components/ButtonWithLoading';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';
import { useSafeAreaInsetsStyle } from '@ui/hooks/useSafeAreaInsetsStyle';

import { useCreateAccountPress, useEmailLogin } from './EmailLoginScreen.hooks';

export function EmailLoginScreen({ navigation }: ScreenProp<'EmailLoginScreen'>) {
  const { changeDetails, login } = useEmailLogin();

  const onCreateAccountPress = useCreateAccountPress();

  // Bit ugly, but ensures content is above bottom bar and satisfies the arithmetic type requirements.
  const insets = useSafeAreaInsetsStyle(['bottom']);
  const paddingBottom = ((insets?.paddingBottom as number) ?? 0) * 1.8;

  return (
    <WelcomeFlowScreen heading={I18n.t('emailLoginScreen.heading')}>
      <VBox gap="small" style={{ marginBottom: 'auto' }}>
        <InputWithLabel
          placeholder={I18n.t('emailLoginScreen.emailInputPlaceholder')}
          label={I18n.t('emailLoginScreen.emailInputLabel')}
          onChangeText={value => changeDetails('email', value)}
          autoCapitalize="none"
        />
        <PasswordInput onChangeText={value => changeDetails('password', value)} />

        <TwoPartPressableText texts={['New here?', 'Create an account']} onPress={onCreateAccountPress} />
      </VBox>
      {/* TODO: Work out why marginTop: auto isn't working here */}
      <VBox style={{ marginTop: 300 }}>
        <TwoPartPressableText texts={['Forgot password?', 'Reset it']} onPress={() => navigation.navigate(Screens.ResetPasswordScreen)} />

        <ButtonWithLoading loading={false} onPress={login} label={I18n.t('emailLoginScreen.signIn')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

EmailLoginScreen.screenName = 'EmailLoginScreen' as const;
