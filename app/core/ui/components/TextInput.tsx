import { TextInput as RNTextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { HBox } from './layout/Box';

interface InputProps extends TextInputProps {
  inputStyle?: ViewStyle;
  RightAccessory?: React.ComponentType;
  hasError: boolean;
}

export function TextInput({ placeholder, inputStyle, RightAccessory, hasError, ...rest }: InputProps) {
  const { styles, theme } = useThemedStyles(stylesFn);

  return (
    <HBox p="small" alignItems="center" style={[styles.container, { borderColor: hasError ? theme.colours.angry : theme.input.borderColour }]}>
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
      borderRadius: theme.input.borderRadius,
    },
    input: {
      flex: 1,
    },
  });
