import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen, WelcomeScreen } from '@app/features/auth';
import { useIsLoggedIn } from '@app/features/auth/providers/AuthProvider';
import { JoinEventScreen } from '@app/features/event-joining';

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
  const isLoggedIn = useIsLoggedIn();

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
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}

        <RootStack.Screen name="JoinEventScreen" component={JoinEventScreen} />

        {/* Auth screens */}
        {/* <RootStack.Screen name="SignUpScreen" component={EmptyComponent} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
        {/* <RootStack.Screen name="LoginScreen" component={EmptyComponent} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
