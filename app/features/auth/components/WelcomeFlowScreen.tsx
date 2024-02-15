import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

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
    <Screen backgroundColor={theme.colours.secondaryBackground} preset="fixed" style={styles.container}>
      <View style={{ marginBottom: !!subheading ? theme.spacing.large : 0 }}>
        {/* TODO: Add a big ol app logo or some sort of illustration here to make it POP */}
        <Text preset="heading" align="center" style={styles.heading}>
          {heading}
        </Text>
        {!!subheading && (
          <Text align="center" colour={theme.colours.textSubdued}>
            Sign in to create an event, or join one that already exists.
          </Text>
        )}
      </View>
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
    headerContainer: {
      marginBottom: theme.spacing.large,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
  });
