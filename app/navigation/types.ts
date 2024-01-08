import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: NavigatorScreenParams<{}>;
  Account: NavigatorScreenParams<{}>;
};

export type RootStackParamList = {
  TabNavigator: BottomTabScreenProps<TabParamList>;
};
