import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

import { colours, typography } from '@ui/theme';

type Sizes = keyof typeof sizeStyles;
type Weights = keyof typeof typography.weights;
type Presets = keyof typeof presets;

export type TextProps = {
  /**
   * Text to be rendered.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the defined text presets.
   */
  preset?: Presets;
  /**
   * An optional override for the text colour.
   */
  colour?: string;
  /**
   * Optional override for the text weight.
   */
  weight?: Weights;
  /**
   * Optional override for the text size.
   */
  size?: Sizes;
  /**
   * Child components - this allows either a string or nested components.
   */
  children?: React.ReactNode;
} & RNTextProps;

export function Text(props: TextProps) {
  const { weight, size, text, colour, children, style: styleOverride, ...rest } = props;

  // Prioritise the `text` prop.
  const content = text || children;

  const preset: Presets = props.preset ?? 'default';
  const color = { color: colour ?? colours.text };
  // @ts-expect-error - I want to use `undefined` as an index so that it returns undefined
  const styles = [presets[preset], fontWeightStyles[weight], sizeStyles[size], color, styleOverride];

  return (
    <RNText {...rest} style={styles}>
      {content}
    </RNText>
  );
}

const sizeStyles = {
  xxxl: { fontSize: typography.sizes.xxxl, lineHeight: 48 } as TextStyle,
  xxl: { fontSize: typography.sizes.xxl, lineHeight: 44 } as TextStyle,
  xl: { fontSize: typography.sizes.xl, lineHeight: 34 } as TextStyle,
  lg: { fontSize: typography.sizes.lg, lineHeight: 32 } as TextStyle,
  md: { fontSize: typography.sizes.md, lineHeight: 26 } as TextStyle,
  sm: { fontSize: typography.sizes.sm, lineHeight: 24 } as TextStyle,
  xs: { fontSize: typography.sizes.xs, lineHeight: 21 } as TextStyle,
  xxs: { fontSize: typography.sizes.xxs, lineHeight: 18 } as TextStyle,
};

const fontWeightStyles = Object.entries(typography.weights).reduce((acc, [typeWeight, weight]) => {
  return { ...acc, [typeWeight]: { fontWeight: String(weight) } };
}, {}) as Record<Weights, TextStyle>;

const baseStyle: StyleProp<TextStyle> = [sizeStyles.sm, fontWeightStyles.medium, { color: colours.black }];

const presets = {
  default: baseStyle,
  bold: [baseStyle, fontWeightStyles.bold] as StyleProp<TextStyle>,
  heading: [baseStyle, sizeStyles.xl, fontWeightStyles.semiBold] as StyleProp<TextStyle>,
  subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium] as StyleProp<TextStyle>,
  formLabel: [baseStyle, fontWeightStyles.medium] as StyleProp<TextStyle>,
  formHelper: [baseStyle, sizeStyles.sm, fontWeightStyles.medium] as StyleProp<TextStyle>,
};
