import palette from './colours';
import { layout } from './layout';
import { spacing } from './spacing';
import { timing } from './timing';
import { typography } from './typography';

const colours = {
  palette,
  textPrimary: palette.grey['800'],
  textSecondary: palette.grey['400'],
  textSubdued: palette.grey['500'],
  background: palette.white,
  secondaryBackground: palette.grey['50'],

  borderColour: palette.grey['200'],

  black: palette.black,
  white: palette.white,
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

    secondaryBackground: palette.white,
    secondaryText: colours.textPrimary,
    secondaryBorderColor: colours.palette.grey['200'],

    disabledBackground: palette.slate['200'],
    disabledText: colours.textPrimary,

    borderWidth: 1,
    borderRadius: 14,
    padding: spacing.medium,
  },
  input: {
    background: palette.white,
    // borderColor: colours.grey['300'], // TODO these colours when I need this component
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
