import { AccountScreenName } from '@feature/account/screens/AccountScreen';
import { QRCodeScannerScreenName } from '@feature/code-scanning/screens/QRCodeScannerScreen/QRCodeScannerScreen';
import { ConfirmPhotosScreenName } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import { CreateEventScreenName } from '@feature/events/screens/CreateEventScreen/CreateEventScreen';
import { EditEventScreenName } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import { EventScreenName } from '@feature/events/screens/EventScreen/EventScreen';
import { JoinEventScreenName } from '@feature/events/screens/JoinEventScreen/JoinEventScreen';
import { PhotoCarouselScreenName } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import { HomeScreenName } from '@feature/home/screens/HomeScreen/HomeScreen';
import { EmailLoginScreenName } from '@feature/onboarding/screens/EmailLoginScreen/EmailLoginScreen';
import { EmailSignUpScreenName } from '@feature/onboarding/screens/EmailSignUpScreen/EmailSignUpScreen';
import { ResetPasswordScreenName } from '@feature/onboarding/screens/ResetPasswordScreen/ResetPasswordScreen';
import { WelcomeScreenName } from '@feature/onboarding/screens/WelcomeScreen/WelcomeScreen';

import type { RootStackParamList } from './types';

export const Screens: { [K in keyof RootStackParamList]: K } = {
  TabNavigator: 'TabNavigator',
  CreateEventNavigator: 'CreateEventNavigator',

  WelcomeNavigator: 'WelcomeNavigator',
  WelcomeScreen: WelcomeScreenName,
  EmailLoginScreen: EmailLoginScreenName,
  EmailSignUpScreen: EmailSignUpScreenName,
  ResetPasswordScreen: ResetPasswordScreenName,

  HomeScreen: HomeScreenName,
  JoinEventScreen: JoinEventScreenName,
  CreateEventScreen: CreateEventScreenName,
  EventScreen: EventScreenName,
  QRCodeScannerScreen: QRCodeScannerScreenName,
  AccountScreen: AccountScreenName,
  ConfirmPhotosScreen: ConfirmPhotosScreenName,
  EditEventScreen: EditEventScreenName,
  PhotoCarouselScreen: PhotoCarouselScreenName,
} as const;

export type Screen = keyof typeof Screens;
