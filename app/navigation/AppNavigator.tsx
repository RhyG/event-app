import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <></>
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator id="RootStack" initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        {/* <RootStack.Screen name="WelcomeScreen" component={() => <></>} /> */}

        {/* <RootStack.Screen name="OpenEventScreen" component={() => <></>} /> */}

        {/* Auth screens */}
        {/* <RootStack.Screen name="SignUpScreen" component={() => <></>} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
        {/* <RootStack.Screen name="LoginScreen" component={() => <></>} options={{ headerShown: true, headerBackTitleVisible: false }} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
