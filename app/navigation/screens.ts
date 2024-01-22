import type { RootStackParamList } from './types';

// Avoids string literals for screen navigation, while forcing it to match the type.
// Could this be better? Define screens in their feature folder? Maintaining these and param list type is annoying too.
export const Screens: { [K in keyof RootStackParamList]: string } = {
  TabNavigator: 'TabNavigator',
  CreateEventNavigator: 'CreateEventNavigator',

  WelcomeScreen: 'WelcomeScreen',
  SignUpScreen: 'SignUpScreen',
  LoginScreen: 'LoginScreen',
  CreateAccountScreen: 'CreateAccountScreen',
  HomeScreen: 'HomeScreen',
  JoinEventScreen: 'JoinEventScreen',
  CreateEventScreen: 'CreateEventScreen',
  EventScreen: 'EventScreen',
  QRCodeScannerScreen: 'QRCodeScannerScreen',
  AccountScreen: 'AccountScreen',
  AllEventsScreen: 'AllEventsScreen',
} as const;

export type Screen = keyof typeof Screens;
