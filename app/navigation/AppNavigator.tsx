import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen, WelcomeScreen } from '@feature/auth';
import { CreateEventScreen, JoinEventScreen } from '@feature/events';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { useIsLoggedIn } from '@feature/user';

import { TabIcon } from './TabIcon';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function EmptyComponent() {
  return <></>;
}

function HomeTabStack() {
  return (
    <RootStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
    </RootStack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeTabStack} options={{ title: 'Home', tabBarIcon: props => <TabIcon name="home" {...props} /> }} />
      <Tab.Screen name="AccountTab" component={EmptyComponent} options={{ title: 'Account', tabBarIcon: props => <TabIcon name="user" {...props} /> }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer>
      <RootStack.Navigator id="RootStack" initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <RootStack.Group>
              <RootStack.Screen name="CreateEventScreen" component={CreateEventScreen} />
            </RootStack.Group>

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
