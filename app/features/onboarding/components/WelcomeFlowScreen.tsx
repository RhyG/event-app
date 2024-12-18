import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

type Props = PropsWithChildren<{
  heading: string;
  subheading?: string;
}>;

export function WelcomeFlowScreen({ heading, subheading, children }: Props) {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.secondaryBackground },
  });

  return (
    <Screen backgroundColor={theme.colours.secondaryBackground} preset="fixed" contentContainerStyle={styles.container} safeAreaEdges={['bottom']}>
      <VBox mb={!!subheading ? 'large' : 0}>
        {/* TODO: Add a big ol app logo or some sort of illustration here to make it POP */}
        <Text preset="heading" align="center" style={styles.heading} numberOfLines={2}>
          {heading}
        </Text>
        {!!subheading && (
          <Text align="center" colour={theme.colours.textSubdued}>
            {subheading}
          </Text>
        )}
      </VBox>
      {children}
    </Screen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.large,
      paddingTop: theme.spacing.ginormous * 1.2,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
  });
