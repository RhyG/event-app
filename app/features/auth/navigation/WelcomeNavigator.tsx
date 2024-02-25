import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app/navigation/types';

import { theme } from '@ui/theme';

import { WelcomeFlowProvider } from '../context/WelcomeFlowContext';
import { EmailLoginScreen, EmailLoginScreenName } from '../screens/EmailLoginScreen/EmailLoginScreen';
import { EmailSignUpScreen, EmailSignUpScreenName } from '../screens/EmailSignUpScreen/EmailSignUpScreen';
import { ResetPasswordScreen, ResetPasswordScreenName } from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import { WelcomeScreen, WelcomeScreenName } from '../screens/WelcomeScreen/WelcomeScreen';

const WelcomeStack = createNativeStackNavigator<RootStackParamList>();

export function WelcomeNavigator() {
  return (
    <WelcomeFlowProvider>
      <WelcomeStack.Navigator
        initialRouteName={WelcomeScreenName}
        screenOptions={{ headerShadowVisible: false, headerTitle: '', headerStyle: { backgroundColor: theme.colours.secondaryBackground } }}>
        <WelcomeStack.Screen name={WelcomeScreenName} component={WelcomeScreen} />
        <WelcomeStack.Screen name={EmailSignUpScreenName} component={EmailSignUpScreen} />
        <WelcomeStack.Screen name={EmailLoginScreenName} component={EmailLoginScreen} />
        <WelcomeStack.Screen name={ResetPasswordScreenName} component={ResetPasswordScreen} />
      </WelcomeStack.Navigator>
    </WelcomeFlowProvider>
  );
}
