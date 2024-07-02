import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AccountScreenName } from '@feature/account';
import { CreateEventScreenName } from '@feature/events';
import type { ConfirmPhotosScreenName, ConfirmPhotosScreenParams } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import type { EditEventScreenName, EditEventScreenParams } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import type { EventScreenName, EventScreenParams } from '@feature/events/screens/EventScreen/EventScreen';
import type { JoinEventScreenName } from '@feature/events/screens/JoinEventScreen/JoinEventScreen';
import type { PhotoCarouselScreenName, PhotoCarouselScreenParams } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import type { HomeScreenName } from '@feature/home/screens/HomeScreen/HomeScreen';
import type { EmailLoginScreenName } from '@feature/onboarding/screens/EmailLoginScreen/EmailLoginScreen';
import type { EmailSignUpScreenName } from '@feature/onboarding/screens/EmailSignUpScreen/EmailSignUpScreen';
import type { ResetPasswordScreenName } from '@feature/onboarding/screens/ResetPasswordScreen/ResetPasswordScreen';
import type { WelcomeScreenName } from '@feature/onboarding/screens/WelcomeScreen/WelcomeScreen';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  CreateEventNavigator: undefined;

  // Auth Screens
  WelcomeNavigator: undefined;
  [WelcomeScreenName]: undefined;
  [EmailLoginScreenName]: undefined;
  [EmailSignUpScreenName]: undefined;
  [ResetPasswordScreenName]: undefined;

  [AccountScreenName]: undefined;

  // App Screens
  [HomeScreenName]: undefined;
  [JoinEventScreenName]: undefined;
  [CreateEventScreenName]: undefined;
  [EventScreenName]: EventScreenParams;
  [ConfirmPhotosScreenName]: ConfirmPhotosScreenParams;
  [EditEventScreenName]: EditEventScreenParams;
  [PhotoCarouselScreenName]: PhotoCarouselScreenParams;

  QRCodeScannerScreen: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
