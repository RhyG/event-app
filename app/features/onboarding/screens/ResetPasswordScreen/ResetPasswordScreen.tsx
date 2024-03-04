import { ScreenProp } from '@app/navigation/types';

import { TwoPartPressableText } from '@feature/onboarding/components/TwoPartPressableText';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

export function ResetPasswordScreen({ navigation }: ScreenProp<typeof ResetPasswordScreenName>) {
  return (
    <WelcomeFlowScreen heading="Reset Password">
      <VBox gap="small">
        <InputWithLabel label="Email" placeholder="Enter your email" />
        <TwoPartPressableText texts={['Know your password?', 'Sign in']} onPress={() => navigation.goBack()} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

export const ResetPasswordScreenName = 'ResetPasswordScreen' as const;
