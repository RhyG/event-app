import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

type Props = PropsWithChildren<{
  heading: string;
  subheading?: string;
}>;

export function WelcomeFlowScreen({ heading, subheading, children }: Props) {
  const { styles, theme } = useThemedStyles(stylesFn);

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
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.large,
      paddingTop: theme.spacing.ginormous * 1.5,
    },
    headerContainer: {
      marginBottom: theme.spacing.large,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
  });
