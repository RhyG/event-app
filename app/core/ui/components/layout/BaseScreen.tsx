import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type BaseScreenProps = PropsWithChildren<{
  padding?: number;
  style?: ViewStyle;
}>;

export function BaseScreen({ children, padding, style }: BaseScreenProps) {
  const combinedStyles = StyleSheet.flatten([styles.screen, style, padding && { padding }]) as ViewStyle;

  return <View style={combinedStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20, // TODO use theme padding
    backgroundColor: '#fff',
  },
});
