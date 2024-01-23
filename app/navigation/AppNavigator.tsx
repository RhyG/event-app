import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen, WelcomeScreen } from '@feature/auth';
import { CreateEventScreen, JoinEventScreen } from '@feature/events';
import { AllEventsScreen } from '@feature/events/screens/AllEventsScreen/AllEventsScreen';
import { EventScreen } from '@feature/events/screens/EventScreen/EventScreen';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { AccountScreen, useIsLoggedIn } from '@feature/user';

import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function HomeTabStack() {
  return (
    <RootStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="AllEventsScreen" component={AllEventsScreen} />
      <RootStack.Screen name="JoinEventScreen" component={JoinEventScreen} options={{ title: 'Join Event' }} />
      <RootStack.Screen name="EventScreen" component={EventScreen} />
    </RootStack.Navigator>
  );
}

function AccountTabStack() {
  return (
    <RootStack.Navigator initialRouteName="AccountScreen">
      <RootStack.Screen name="AccountScreen" component={AccountScreen} />
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
        component={AccountTabStack}
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

            {/* Users should be able to join and view events without being authenticated. */}
            <RootStack.Screen name="JoinEventScreen" component={JoinEventScreen} options={{ title: 'Join Event' }} />
            <RootStack.Screen name="EventScreen" component={EventScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
