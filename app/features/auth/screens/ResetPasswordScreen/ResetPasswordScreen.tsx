import { ScreenProp } from '@app/navigation/types';

import { TwoPartPressableText } from '@feature/auth/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

export function ResetPasswordScreen({ navigation }: ScreenProp<'ResetPasswordScreen'>) {
  return (
    <WelcomeFlowScreen heading="Reset Password">
      <VBox gap="small">
        <InputWithLabel label="Email" placeholder="Enter your email" />
        <TwoPartPressableText texts={['Know your password', 'Sign in']} onPress={() => navigation.goBack()} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

ResetPasswordScreen.screenName = 'ResetPasswordScreen' as const;
