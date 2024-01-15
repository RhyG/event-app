import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '@app/features/auth/screens/WelcomeScreen/WelcomeScreen';

import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function EmptyComponent() {
  return <></>;
}

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={EmptyComponent} options={{ title: 'Home' }} />
      <Tab.Screen name="AccountTab" component={EmptyComponent} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator id="RootStack" initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <RootStack.Screen name="TabNavigator" component={TabNavigator} />
          </>
        ) : (
          <>
            <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          </>
        )}

        {/* <RootStack.Screen name="OpenEventScreen" component={EmptyComponent} /> */}

        {/* Auth screens */}
        {/* <RootStack.Screen name="SignUpScreen" component={EmptyComponent} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
        {/* <RootStack.Screen name="LoginScreen" component={EmptyComponent} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
