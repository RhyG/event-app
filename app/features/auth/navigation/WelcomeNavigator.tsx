import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from '@app/navigation/screens';
import { RootStackParamList } from '@app/navigation/types';

import { theme } from '@ui/theme';

import { WelcomeFlowProvider } from '../context/WelcomeFlowContext';
import { EmailLoginScreen } from '../screens/EmailLoginScreen/EmailLoginScreen';
import { EmailSignUpScreen } from '../screens/EmailSignUpScreen/EmailSignUpScreen';
import { ResetPasswordScreen } from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';

const WelcomeStack = createNativeStackNavigator<RootStackParamList>();

export function WelcomeNavigator() {
  return (
    <WelcomeFlowProvider>
      <WelcomeStack.Navigator
        initialRouteName={Screens.WelcomeScreen}
        screenOptions={{ headerShadowVisible: false, headerTitle: '', headerStyle: { backgroundColor: theme.colours.secondaryBackground } }}>
        <WelcomeStack.Screen name={Screens.WelcomeScreen} component={WelcomeScreen} />
        <WelcomeStack.Screen name={Screens.EmailSignUpScreen} component={EmailSignUpScreen} />
        <WelcomeStack.Screen name={Screens.EmailLoginScreen} component={EmailLoginScreen} />
        <WelcomeStack.Screen name={Screens.ResetPasswordScreen} component={ResetPasswordScreen} />
      </WelcomeStack.Navigator>
    </WelcomeFlowProvider>
  );
}
