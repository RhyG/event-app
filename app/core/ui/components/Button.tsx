import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { theme } from '@ui/theme';

import { Text } from './Text';

interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text rendered by the button if not using children.
   */
  label?: string;
  /**
   * Preset to apply to button.
   * @default primary
   */
  preset?: ButtonPreset;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Children rendered within the button.
   */
  children?: React.ReactNode;
  /**
   * Optional element rendered left of the button text.
   */
  LeftAccessory?: React.ComponentType;
  /**
   * Optional element rendered right of the button text.
   */
  RightAccessory?: React.ComponentType;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
}

export function Button(props: ButtonProps) {
  const { LeftAccessory, RightAccessory, label, children, disabled, style: styleOverride, ...rest } = props;

  const selectedPreset = props.preset ?? 'primary';

  const buttonStyle = [presets[selectedPreset], disabled && presets.disabled, !!styleOverride && styleOverride];
  const textStyle = [baseTextStyles, textPresets[selectedPreset], disabled && textPresets.disabled];

  return (
    <TouchableOpacity style={buttonStyle} accessibilityRole="button" accessibilityState={{ disabled: !!disabled }} {...rest}>
      {!!LeftAccessory && <LeftAccessory />}

      {/* Supports buttons that provide a label prop, a string to render or children components. */}
      {!!children && typeof children !== 'string' ? children : <Text style={textStyle}>{label ?? children}</Text>}

      {!!RightAccessory && <RightAccessory />}
    </TouchableOpacity>
  );
}

const baseStyles = {
  borderRadius: theme.button.borderRadius,
  flexDirection: 'row',
  ...theme.layout.fullyCentred,
  gap: 5,
  paddingVertical: theme.spacing.extraSmall,
  overflow: 'hidden',
} as const;

const baseTextStyles = {
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
};

const textPresets = {
  primary: {
    color: theme.colours.palette.white,
  },
  secondary: {
    color: theme.colours.textPrimary,
  },
  disabled: {},
};

const presets = StyleSheet.create({
  primary: {
    ...baseStyles,
    backgroundColor: theme.button.primaryBackground,
  },
  secondary: {
    ...baseStyles,
    backgroundColor: theme.button.secondaryBackground,
    borderWidth: theme.button.borderWidth,
    borderColor: theme.button.secondaryBorderColor,
  },
  disabled: {
    ...baseStyles,
    backgroundColor: theme.button.disabledBackground,
  },
});

type ButtonPreset = keyof typeof presets;
