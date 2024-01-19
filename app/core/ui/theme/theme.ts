import colours from './colours';
import { layout } from './layout';
import { spacing } from './spacing';
import { timing } from './timing';
import { typography } from './typography';

export const theme = {
  palette: colours,
  typography,
  spacing,
  layout,
  timing,
  colours: {
    button: {
      primaryBackground: colours.grey['100'],
      primaryText: colours.white,
      secondaryBackground: colours.grey['500'],
      secondaryText: colours.grey['500'],
      borderRadius: 4,
      padding: spacing.medium,
    },
    input: {
      background: colours.white,
      // borderColor: colours.grey['300'], // TODO these colours when I need this component
      // textColor: colours.grey['900'],
      borderRadius: 4,
      padding: spacing.small,
    },
  },
};

export type Theme = typeof theme;
