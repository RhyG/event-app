import { EmailSignUpScreen, WelcomeScreen } from '@feature/auth';
import { EmailLoginScreen } from '@feature/auth/screens/EmailLoginScreen/EmailLoginScreen';
import { ResetPasswordScreen } from '@feature/auth/screens/ResetPasswordScreen/ResetPasswordScreen';
import { CreateEventScreen, JoinEventScreen } from '@feature/events';
import { AllEventsScreen } from '@feature/events/screens/AllEventsScreen/AllEventsScreen';
import { ConfirmPhotosScreen } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import { EditEventScreen } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import { EventScreen } from '@feature/events/screens/EventScreen/EventScreen';
import { PhotoCarouselScreen } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import { HomeScreen } from '@feature/home/screens/HomeScreen';
import { AccountScreen } from '@feature/user';

import type { RootStackParamList } from './types';

// Avoids string literals for screen navigation, while forcing it to match the type.
// Could this be better? Define screens in their feature folder? Maintaining these and param list type is annoying too.
export const Screens: { [K in keyof RootStackParamList]: K } = {
  TabNavigator: 'TabNavigator',
  CreateEventNavigator: 'CreateEventNavigator',

  WelcomeNavigator: 'WelcomeNavigator',
  WelcomeScreen: WelcomeScreen.screenName,
  EmailLoginScreen: EmailLoginScreen.screenName,
  EmailSignUpScreen: EmailSignUpScreen.screenName,
  ResetPasswordScreen: ResetPasswordScreen.screenName,

  HomeScreen: HomeScreen.screenName,
  JoinEventScreen: JoinEventScreen.screenName,
  CreateEventScreen: CreateEventScreen.screenName,
  EventScreen: EventScreen.screenName,
  QRCodeScannerScreen: 'QRCodeScannerScreen',
  AccountScreen: AccountScreen.screenName,
  AllEventsScreen: AllEventsScreen.screenName,
  ConfirmPhotosScreen: ConfirmPhotosScreen.screenName,
  EditEventScreen: EditEventScreen.screenName,
  PhotoCarouselScreen: PhotoCarouselScreen.screenName,
} as const;

export type Screen = keyof typeof Screens;
