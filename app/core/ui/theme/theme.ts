import palette from './colours';
import { layout } from './layout';
import { spacing } from './spacing';
import { timing } from './timing';
import { typography } from './typography';

const colours = {
  palette,
  textPrimary: palette.stone['800'],
  textSecondary: palette.grey['400'],
  textSubdued: palette.grey['500'],
  background: palette.white,
  secondaryBackground: palette.grey['50'],

  borderColour: palette.grey['200'],

  black: palette.black,
  white: palette.white,

  angry: palette.red['500'],
  success: palette.green['500'],
} as const;

export const theme = {
  typography,
  spacing,
  layout,
  timing,
  colours,
  button: {
    primaryBackground: palette.sky['500'],
    primaryText: palette.white,

    secondaryBackground: palette.grey['200'],
    secondaryText: colours.textPrimary,
    secondaryBorderColour: colours.palette.grey['200'],

    outlinedBackground: palette.white,
    outlinedText: colours.textPrimary,
    outlinedBorderColour: colours.palette.grey['200'],

    disabledBackground: palette.slate['200'],
    disabledText: colours.textPrimary,

    dangerBorderColour: palette.red['500'],
    dangerText: palette.red['500'],

    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.medium,
  },
  input: {
    background: palette.white,
    // borderColour: colours.grey['300'], // TODO these colours when I need this component
    // textColor: colours.grey['900'],
    borderRadius: 14,
    padding: spacing.small,
    borderColour: colours.palette.grey['200'],
  } as const,
  card: {
    borderRadius: 14,
  },
  icon: {
    primaryColour: palette.grey['800'],
  },
} as const;

export type Theme = typeof theme;
