import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ConfirmPhotosScreenParams } from '@feature/events/screens/ConfirmPhotosScreen/ConfirmPhotosScreen';
import type { EditEventScreenParams } from '@feature/events/screens/EditEventScreen/EditEventScreen';
import type { EventScreenParams } from '@feature/events/screens/EventScreen/EventScreen';
import type { PhotoCarouselScreenParams } from '@feature/events/screens/PhotoCarouselScreen/PhotoCarouselScreen';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  CreateEventNavigator: undefined;

  // Auth Screens
  WelcomeNavigator: undefined;
  WelcomeScreen: undefined;
  EmailLoginScreen: undefined;
  EmailSignUpScreen: undefined;
  ResetPasswordScreen: undefined;

  AccountScreen: undefined;

  // App Screens
  HomeScreen: undefined;
  JoinEventScreen: undefined;
  CreateEventScreen: undefined;
  EventScreen: EventScreenParams;
  AllEventsScreen: undefined;
  ConfirmPhotosScreen: ConfirmPhotosScreenParams;
  EditEventScreen: EditEventScreenParams;
  PhotoCarouselScreen: PhotoCarouselScreenParams;

  QRCodeScannerScreen: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
