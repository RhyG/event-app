import I18n from 'i18n-js';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { TwoPartPressableText } from '@feature/onboarding/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { useEmailSignUp, useSignUpPress } from './EmailSignUpScreen.hooks';

export function EmailSignUpScreen() {
  const { changeDetails, createUser } = useEmailSignUp();

  const onSignInPress = useSignUpPress();

  return (
    <WelcomeFlowScreen heading={I18n.t('emailSignUpScreen.heading')}>
      <VBox gap="small">
        <InputWithLabel
          placeholder={I18n.t('emailSignUpScreen.emailInputPlaceholder')}
          label={I18n.t('emailSignUpScreen.emailInputLabel')}
          onChangeText={value => changeDetails('email', value)}
        />
        <PasswordInput onChangeText={value => changeDetails('password', value)} />

        <TwoPartPressableText texts={['Have an account already?', 'Sign in']} onPress={onSignInPress} />

        <Button onPress={createUser} label={I18n.t('emailSignUpScreen.createAccount')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

export const EmailSignUpScreenName = 'EmailSignUpScreen' as const;
