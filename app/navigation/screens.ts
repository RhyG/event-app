import type { RootStackParamList } from './types';

export const Screens: { [K in keyof RootStackParamList]: K } = {
  TabNavigator: 'TabNavigator',
  CreateEventNavigator: 'CreateEventNavigator',

  WelcomeNavigator: 'WelcomeNavigator',
  WelcomeScreen: 'WelcomeScreen',
  EmailLoginScreen: 'EmailLoginScreen',
  EmailSignUpScreen: 'EmailSignUpScreen',
  ResetPasswordScreen: 'ResetPasswordScreen',

  HomeScreen: 'HomeScreen',
  JoinEventScreen: 'JoinEventScreen',
  CreateEventScreen: 'CreateEventScreen',
  EventScreen: 'EventScreen',
  QRCodeScannerScreen: 'QRCodeScannerScreen',
  AccountScreen: 'AccountScreen',
  ConfirmPhotosScreen: 'ConfirmPhotosScreen',
  EditEventScreen: 'EditEventScreen',
  PhotoCarouselScreen: 'PhotoCarouselScreen',
} as const;

export type Screen = keyof typeof Screens;
