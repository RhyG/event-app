import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen, WelcomeScreen } from '@feature/auth';
import { CreateEventScreen, JoinEventScreen } from '@feature/events';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { useIsLoggedIn } from '@feature/user';

import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function EmptyComponent() {
  return <></>;
}

function HomeTabStack() {
  return (
    <RootStack.Navigator initialRouteName="HomeScreen">
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
    </RootStack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTabStack}
        options={{
          title: 'Home',
          tabBarIcon: props => <TabBarIcon name="home" {...props} />,
          tabBarLabel: props => <TabBarLabel label="Home" {...props} />,
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={EmptyComponent}
        options={{
          title: 'Account',
          tabBarIcon: props => <TabBarIcon name="user" {...props} />,
          tabBarLabel: props => <TabBarLabel label="Account" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <NavigationContainer>
      <RootStack.Navigator id="RootStack" initialRouteName="TabNavigator" screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {isLoggedIn ? (
          <>
            {/* Event creation screens - render above tabs */}
            <RootStack.Group>
              <RootStack.Screen name="CreateEventScreen" component={CreateEventScreen} options={{ title: 'Create Event' }} />
            </RootStack.Group>

            <RootStack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}

        <RootStack.Screen name="JoinEventScreen" component={JoinEventScreen} options={{ title: 'Join Event' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
