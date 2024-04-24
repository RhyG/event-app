import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { EmailSignUpScreenName, WelcomeScreenName } from '@feature/auth';
import { CreateEventScreenName } from '@feature/events';
import { AllEventsScreenName } from '@feature/events/screens/AllEventsScreen/AllEventsScreen';
import type { ConfirmPhotosScreenName, ConfirmPhotosScreenParams } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import type { EditEventScreenName, EditEventScreenParams } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import type { EventScreenName, EventScreenParams } from '@feature/events/screens/EventScreen/EventScreen';
import { JoinEventScreenName } from '@feature/events/screens/JoinEventScreen/JoinEventScreen';
import type { PhotoCarouselScreenName, PhotoCarouselScreenParams } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';
import { HomeScreenName } from '@feature/home/screens/HomeScreen/HomeScreen';
import { EmailLoginScreenName } from '@feature/onboarding/screens/EmailLoginScreen/EmailLoginScreen';
import { ResetPasswordScreenName } from '@feature/onboarding/screens/ResetPasswordScreen/ResetPasswordScreen';
import { AccountScreenName } from '@feature/user';

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
  [AllEventsScreenName]: undefined;
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
