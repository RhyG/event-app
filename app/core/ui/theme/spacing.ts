/**
  Use these spacings for margins/paddings and other whitespace throughout the app.
 */
export const spacing = {
  micro: 2,
  tiny: 5,
  extraSmall: 8,
  small: 10,
  medium: 14,
  base: 20,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
  ginormous: 78,
} as const;

export type Spacing = keyof typeof spacing;
