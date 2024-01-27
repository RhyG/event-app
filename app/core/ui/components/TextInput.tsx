import { TextInput as RNTextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { HBox } from './layout/Box';

interface InputProps extends TextInputProps {
  inputStyle?: ViewStyle;
  RightAccessory?: React.ComponentType;
}

export function TextInput({ placeholder, inputStyle, RightAccessory, ...rest }: InputProps) {
  const { styles } = useThemedStyles(stylesFn);

  return (
    <HBox p="small" style={styles.container}>
      <RNTextInput placeholder={placeholder} style={[styles.input, inputStyle, { paddingRight: !!RightAccessory ? 10 : 0 }]} {...rest} />
      {!!RightAccessory && <RightAccessory />}
    </HBox>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.input.background,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.input.borderColour,
      borderRadius: theme.input.borderRadius,
    },
    input: {
      flex: 1,
    },
  });
