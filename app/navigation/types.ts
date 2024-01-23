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
  WelcomeScreen: { name: string };
  SignUpScreen: undefined;
  LoginScreen: undefined;
  CreateAccountScreen: undefined;

  AccountScreen: undefined;

  // App Screens
  HomeScreen: undefined;
  JoinEventScreen: undefined;
  CreateEventScreen: undefined;
  EventScreen: { id: string; name: string; shouldPreventBack?: boolean };
  AllEventsScreen: undefined;

  QRCodeScannerScreen: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
