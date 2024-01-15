import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type RootStackParamList = {
  TabNavigator: undefined;

  // Auth Screens
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
  LoginScreen: undefined;

  // App Screens
  JoinEventScreen: undefined;
};
