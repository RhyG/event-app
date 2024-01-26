import { StyleSheet, View } from 'react-native';

import { TwoPartPressableText } from '@feature/auth/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

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
    <WelcomeFlowScreen heading="Sign up">
      <View style={styles.container}>
        <InputWithLabel placeholder="Enter email" label="Email" onChangeText={value => changeDetails('email', value)} />
        <InputWithLabel placeholder="Enter password" label="Password" onChangeText={value => changeDetails('password', value)} />

        <TwoPartPressableText texts={['Have an account already?', 'Sign in']} onPress={onSignInPress} />

        <Button onPress={createUser} label="Create account" />
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
