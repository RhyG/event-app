import { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BaseScreenProps = PropsWithChildren<{
  padding?: number;
  style?: ViewStyle;
}>;

export function BaseScreen({ children, padding, style }: BaseScreenProps) {
  const combinedStyles = StyleSheet.flatten([styles.screen, style, padding && { padding }]) as ViewStyle;

  return <SafeAreaView style={combinedStyles}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10, // TODO use theme padding
  },
});
