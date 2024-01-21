import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from './screens';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type ParamsList = {
  TabNavigator: undefined;
  CreateEventNavigator: undefined;

  // Auth Screens
  WelcomeScreen: { name: string };
  SignUpScreen: undefined;
  LoginScreen: undefined;

  AccountScreen: undefined;

  // App Screens
  HomeScreen: undefined;
  JoinEventScreen: undefined;
  CreateEventScreen: undefined;
  EventScreen: { eventId: string };

  QRCodeScannerScreen: undefined;
};

type ScreenParams = {
  [K in Screen]: Record<string, unknown> | undefined;
};

export type RootStackParamList = ScreenParams & ParamsList;

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
