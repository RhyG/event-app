import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Spacing, spacing } from '@ui/theme';

type Margins = {
  m?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  mh?: Spacing;
  mv?: Spacing;
};

type Paddings = {
  p?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  ph?: Spacing;
  pv?: Spacing;
};

type MarginAndPaddingKey = keyof Margins & keyof Paddings;

type BoxProps = PropsWithChildren<
  {
    flex?: number;
    justifyContent?: ViewStyle['justifyContent'];
    alignItems?: ViewStyle['alignItems'];
    gap?: Spacing;
    style?: StyleProp<ViewStyle>;
  } & Margins &
    Paddings
>;

const getSpacingStyle = (spacingKey: Spacing, property: string) => {
  const value = spacing[spacingKey];
  switch (property) {
    case 'm':
      return { margin: value };
    case 'mt':
      return { marginTop: value };
    case 'mb':
      return { marginBottom: value };
    case 'ml':
      return { marginLeft: value };
    case 'mr':
      return { marginRight: value };
    case 'mh':
      return { marginHorizontal: value };
    case 'mv':
      return { marginVertical: value };
    case 'p':
      return { padding: value };
    case 'pt':
      return { paddingTop: value };
    case 'pb':
      return { paddingBottom: value };
    case 'pl':
      return { paddingLeft: value };
    case 'pr':
      return { paddingRight: value };
    case 'ph':
      return { paddingHorizontal: value };
    case 'pv':
      return { paddingVertical: value };
    default:
      return {};
  }
};
/**
 * I had created a base Box component, then built HBox and VBox on that just passing the flexDirection to determine which to render,
 * but in a profiling test done by rendering 1000 VBox components render time was around ~20% slower than what I've done here.
 * This might be due to the additional layer of React component resolution, but honestly not sure the exact cause.
 * All I know is this approach with its small amount of duped code is faster and so I'm going with it.
 */

export function HBox({ children, flex, justifyContent, alignItems, gap, style, ...rest }: BoxProps) {
  const spacingStyles = Object.keys(rest).map(key => getSpacingStyle(rest[key as MarginAndPaddingKey], key));
  const gapValue = gap !== undefined ? spacing[gap] : undefined;
  return <View style={[{ flexDirection: 'row', flex, justifyContent, alignItems, gap: gapValue }, spacingStyles, style]}>{children}</View>;
}

export function VBox({ children, flex, justifyContent, alignItems, gap, style, ...rest }: BoxProps) {
  const spacingStyles = Object.keys(rest).map(key => getSpacingStyle(rest[key as MarginAndPaddingKey], key));
  const gapValue = gap !== undefined ? spacing[gap] : undefined;
  return <View style={[{ flexDirection: 'column', flex, justifyContent, alignItems, gap: gapValue }, spacingStyles, style]}>{children}</View>;
}
