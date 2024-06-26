import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountScreen, AccountScreenName } from '@feature/account';
import { QRCodeScannerScreen, QRCodeScannerScreenName } from '@feature/code-scanning/screens/QRCodeScannerScreen/QRCodeScannerScreen';
import { CreateEventScreen, CreateEventScreenName, JoinEventScreen, JoinEventScreenName } from '@feature/events';
import { ConfirmPhotosScreen, ConfirmPhotosScreenName } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import { EditEventScreen, EditEventScreenName } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import { EventScreen, EventScreenName } from '@feature/events/screens/EventScreen/EventScreen';
import { PhotoCarouselScreen, PhotoCarouselScreenName } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import { HomeScreen, HomeScreenName } from '@feature/home/screens/HomeScreen/HomeScreen';
import { WelcomeNavigator } from '@feature/onboarding/navigation/WelcomeNavigator';

import { useIsLoggedIn } from '@core/context/UserContext';

import { TabBarIcon } from './TabBarIcon';
import { TabBarLabel } from './TabBarLabel';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function HomeTabStack() {
  return (
    <RootStack.Navigator initialRouteName={HomeScreenName} screenOptions={{ headerBackTitleVisible: false, headerShadowVisible: false }}>
      <RootStack.Screen name={HomeScreenName} component={HomeScreen} />
      <RootStack.Screen name={JoinEventScreenName} component={JoinEventScreen} options={{ title: 'Join Event' }} />
      <RootStack.Screen name={EventScreenName} component={EventScreen} />
      <RootStack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }}>
        <RootStack.Screen name={QRCodeScannerScreenName} component={QRCodeScannerScreen} />
        <RootStack.Screen name={PhotoCarouselScreenName} component={PhotoCarouselScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

function AccountTabStack() {
  return (
    <RootStack.Navigator initialRouteName={AccountScreenName}>
      <RootStack.Screen name={AccountScreenName} component={AccountScreen} />
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
              <RootStack.Screen name={CreateEventScreenName} component={CreateEventScreen} options={{ title: 'Create Event' }} />
            </RootStack.Group>

            {/* Event screens that should be rendered above the tabs */}
            <RootStack.Group>
              <RootStack.Screen name={EditEventScreenName} component={EditEventScreen} />
              <RootStack.Screen name={ConfirmPhotosScreenName} component={ConfirmPhotosScreen} />
            </RootStack.Group>

            <RootStack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <RootStack.Screen name="WelcomeNavigator" component={WelcomeNavigator} options={{ headerShown: false }} />

            {/* Users should be able to join and view events without being authenticated. */}
            <RootStack.Screen name={JoinEventScreenName} component={JoinEventScreen} options={{ title: 'Join Event' }} />
            <RootStack.Screen name={EventScreenName} component={EventScreen} />
            <RootStack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }}>
              <RootStack.Screen name={PhotoCarouselScreenName} component={PhotoCarouselScreen} />
            </RootStack.Group>
            <RootStack.Screen
              name={QRCodeScannerScreenName}
              component={QRCodeScannerScreen}
              options={{ presentation: 'transparentModal', animation: 'fade', headerShown: false }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
