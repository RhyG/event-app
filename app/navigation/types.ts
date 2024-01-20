import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  CreateEventNavigator: undefined;

  // Auth Screens
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
  LoginScreen: undefined;

  // App Screens
  HomeScreen: undefined;
  JoinEventScreen: undefined;
  CreateEventScreen: undefined;

  QRCodeScannerScreen: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
