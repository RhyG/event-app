import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

interface InputProps extends TextInputProps {
  inputStyle?: ViewStyle;
}

export function Input({ placeholder, inputStyle, ...rest }: InputProps) {
  const { styles } = useThemedStyles(stylesFn);

  return <TextInput placeholder={placeholder} style={[styles.input, inputStyle]} {...rest} />;
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    input: {
      padding: theme.input.padding,
      backgroundColor: theme.input.background,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.input.borderColour,
      borderRadius: theme.input.borderRadius,
    },
  });
