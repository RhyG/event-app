import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeNavigator } from '@feature/auth/navigation/WelcomeNavigator';
import { CreateEventScreen, JoinEventScreen } from '@feature/events';
import { AllEventsScreen } from '@feature/events/screens/AllEventsScreen/AllEventsScreen';
import { ConfirmPhotosScreen } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import { EditEventScreen } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import { EventScreen } from '@feature/events/screens/EventScreen/EventScreen';
import { PhotoCarouselScreen } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { AccountScreen, useIsLoggedIn } from '@feature/user';

import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';
import { Screens } from './screens';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function HomeTabStack() {
  return (
    <RootStack.Navigator initialRouteName={Screens.HomeScreen} screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
      <RootStack.Screen name={Screens.HomeScreen} component={HomeScreen} />
      <RootStack.Screen name={Screens.AllEventsScreen} component={AllEventsScreen} />
      <RootStack.Screen name={Screens.JoinEventScreen} component={JoinEventScreen} options={{ title: 'Join Event' }} />
      <RootStack.Screen name={Screens.EventScreen} component={EventScreen} />
      <RootStack.Screen name={Screens.ConfirmPhotosScreen} component={ConfirmPhotosScreen} />
      <RootStack.Screen name={Screens.EditEventScreen} component={EditEventScreen} />
      <RootStack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade' }}>
        <RootStack.Screen name={Screens.PhotoCarouselScreen} component={PhotoCarouselScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

function AccountTabStack() {
  return (
    <RootStack.Navigator initialRouteName={Screens.AccountScreen}>
      <RootStack.Screen name={Screens.AccountScreen} component={AccountScreen} />
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
      <RootStack.Navigator id="RootStack" initialRouteName={Screens.TabNavigator} screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
        {isLoggedIn ? (
          <>
            {/* Event creation screens - render above tabs */}
            <RootStack.Group>
              <RootStack.Screen name={Screens.CreateEventScreen} component={CreateEventScreen} options={{ title: 'Create Event' }} />
            </RootStack.Group>

            <RootStack.Screen name={Screens.TabNavigator} component={TabNavigator} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <RootStack.Screen name={Screens.WelcomeNavigator} component={WelcomeNavigator} options={{ headerShown: false }} />

            {/* Users should be able to join and view events without being authenticated. */}
            <RootStack.Screen name={Screens.JoinEventScreen} component={JoinEventScreen} options={{ title: 'Join Event' }} />
            <RootStack.Screen name={Screens.EventScreen} component={EventScreen} />
            <RootStack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade' }}>
              <RootStack.Screen name={Screens.PhotoCarouselScreen} component={PhotoCarouselScreen} />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
