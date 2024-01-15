import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  HomeTab: NavigatorScreenParams<Record<string, never>>;
  AccountTab: NavigatorScreenParams<Record<string, never>>;
};

export type RootStackParamList = {
  TabNavigator: BottomTabScreenProps<TabParamList>;
  WelcomeScreen: undefined;
};
