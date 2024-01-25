import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app/navigation/types';

import { theme } from '@ui/theme';

import { EmailSignUpScreen } from '../screens/EmailSignUpScreen/EmailSignUpScreen';
import { EmailLoginScreen } from '../screens/LoginScreen/EmailLoginScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';

const WelcomeStack = createNativeStackNavigator<RootStackParamList>();

export function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShadowVisible: false, headerTitle: '', headerStyle: { backgroundColor: theme.colours.secondaryBackground } }}>
      <WelcomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <WelcomeStack.Screen name="EmailSignUpScreen" component={EmailSignUpScreen} />
      <WelcomeStack.Screen name="EmailLoginScreen" component={EmailLoginScreen} />
    </WelcomeStack.Navigator>
  );
}
