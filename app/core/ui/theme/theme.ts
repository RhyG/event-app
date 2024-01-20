import palette from './colours';
import { layout } from './layout';
import { spacing } from './spacing';
import { timing } from './timing';
import { typography } from './typography';

const colours = {
  palette,
  textPrimary: palette.grey['900'],
  textSecondary: palette.grey['400'],
};

export const theme = {
  typography,
  spacing,
  layout,
  timing,
  colours,
  button: {
    primaryBackground: palette.grey['100'],
    primaryText: palette.white,
    secondaryBackground: palette.grey['500'],
    secondaryText: palette.grey['500'],
    borderRadius: 14,
    padding: spacing.medium,
  },
  input: {
    background: palette.white,
    // borderColor: colours.grey['300'], // TODO these colours when I need this component
    // textColor: colours.grey['900'],
    borderRadius: 4,
    padding: spacing.small,
  },
  card: {
    borderRadius: 14,
  },
};

export type Theme = typeof theme;
