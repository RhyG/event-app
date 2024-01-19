const weights = {
  light: 100,
  semiLight: 300,
  medium: 500,
  semiBold: 700,
  bold: 800,
} as const;

const sizes = {
  xxxxl: 42,
  xxxl: 36,
  xxl: 30,
  xl: 24,
  lg: 20,
  md: 18,
  sm: 16,
  xs: 14,
  xxs: 12,
  xxxs: 10,
  xxxxs: 8,
} as const;

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  weights,
  sizes,
};
