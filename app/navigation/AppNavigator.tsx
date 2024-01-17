import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen, WelcomeScreen } from '@feature/auth';
import { JoinEventScreen } from '@feature/events';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { useIsLoggedIn } from '@feature/user';

import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function EmptyComponent() {
  return <></>;
}

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
