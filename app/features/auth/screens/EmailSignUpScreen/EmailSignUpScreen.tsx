import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Text } from '@ui/components/Text';
import { HBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useEmailSignUp } from './useEmailSignUp';

export function EmailSignUpScreen({ navigation }: ScreenProp<'EmailLoginScreen'>) {
  const { styles } = useThemedStyles(stylesFn);

  const { changeDetails, createUser } = useEmailSignUp();

  return (
    <WelcomeFlowScreen heading="Sign up">
      <View style={styles.container}>
        <InputWithLabel placeholder="Enter email" label="Email" onChangeText={value => changeDetails('email', value)} />
        <InputWithLabel placeholder="Enter password" label="Password" onChangeText={value => changeDetails('password', value)} />

        <HBox justifyContent="center" mb="medium">
          <Text size="xs">Have an account already? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderBottomWidth: 1 }}>
            <Text size="xs">Sign in</Text>
          </TouchableOpacity>
        </HBox>

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
