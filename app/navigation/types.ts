import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PhotoFile } from '@feature/photo-management/types';

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
  EventScreen: { id: string; name: string; shouldPreventBack?: boolean };
  AllEventsScreen: undefined;
  ConfirmPhotosScreen: { photos: Array<PhotoFile>; eventId: string };
  EditEventScreen: { id: string };

  QRCodeScannerScreen: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
