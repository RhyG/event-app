import { TouchableOpacity } from 'react-native';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';

import { useCreateAccountPress, useEmailLogin } from './EmailLoginScreen.hooks';

export function EmailLoginScreen() {
  const { changeDetails, login } = useEmailLogin();

  const onCreateAccountPress = useCreateAccountPress();

  return (
    <WelcomeFlowScreen heading="Sign in">
      <VBox gap="small">
        <InputWithLabel placeholder="Enter email" label="Email" onChangeText={value => changeDetails('email', value)} />
        <InputWithLabel placeholder="Enter password" label="Password" onChangeText={value => changeDetails('password', value)} />

        <HBox justifyContent="center" mb="medium">
          <Text size="xs">New here? </Text>
          <TouchableOpacity onPress={onCreateAccountPress} style={{ borderBottomWidth: 1 }}>
            <Text size="xs">Create an account</Text>
          </TouchableOpacity>
        </HBox>

        <Button onPress={login} label="Sign in" />
      </VBox>
    </WelcomeFlowScreen>
  );
}
