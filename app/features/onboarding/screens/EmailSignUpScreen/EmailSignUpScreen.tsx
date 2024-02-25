import I18n from 'i18n-js';
import { StyleSheet, View } from 'react-native';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { TwoPartPressableText } from '@feature/onboarding/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useEmailSignUp, useSignUpPress } from './EmailSignUpScreen.hooks';

export function EmailSignUpScreen() {
  const { styles } = useThemedStyles(stylesFn);

  const { changeDetails, createUser } = useEmailSignUp();

  const onSignInPress = useSignUpPress();

  return (
    <WelcomeFlowScreen heading={I18n.t('emailSignUpScreen.heading')}>
      <View style={styles.container}>
        <InputWithLabel
          placeholder={I18n.t('emailSignUpScreen.emailInputPlaceholder')}
          label={I18n.t('emailSignUpScreen.emailInputLabel')}
          onChangeText={value => changeDetails('email', value)}
        />
        <PasswordInput onChangeText={value => changeDetails('password', value)} />

        <TwoPartPressableText texts={['Have an account already?', 'Sign in']} onPress={onSignInPress} />

        <Button onPress={createUser} label={I18n.t('emailSignUpScreen.createAccount')} />
      </View>
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: theme.spacing.small,
    },
  });

export const EmailSignUpScreenName = 'EmailSignUpScreen' as const;
