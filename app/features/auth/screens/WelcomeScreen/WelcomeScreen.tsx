import { StyleSheet, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

import { useEmailLogin } from './useEmailLogin';

export function WelcomeScreen({ navigation }: ScreenProp<'WelcomeScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.secondaryBackground },
  });

  const { changeLoginDetails, login } = useEmailLogin();

  return (
    <Screen backgroundColor={theme.colours.secondaryBackground} preset="fixed">
      <View style={styles.container}>
        <View>
          {/* TODO: Add a big ol app logo or some sort of illustration here to make it POP */}
          <Text preset="heading" align="center" style={styles.heading}>
            Welcome
          </Text>
          <Text align="center" colour={theme.colours.textSubdued}>
            Sign in to create an event, or join one that already exists.
          </Text>
        </View>

        <View style={styles.enterCodeContainer}>
          <InputWithLabel placeholder="Enter email" label="Email" onChangeText={value => changeLoginDetails('email', value)} />
          <InputWithLabel placeholder="Enter password" label="Password" onChangeText={value => changeLoginDetails('password', value)} />
          <Button onPress={login} label="Sign in" />
          <Button preset="secondary" onPress={() => navigation.navigate(Screens.CreateAccountScreen)} label="Create account" />
        </View>

        <View style={styles.dividers}>
          <View style={styles.divider} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.divider} />
        </View>

        <View>
          <Button onPress={() => navigation.navigate(Screens.JoinEventScreen)} label="Join event" />
        </View>
      </View>
    </Screen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.large,
      paddingBottom: 120,
    },
    input: {
      padding: theme.input.padding,
      backgroundColor: theme.input.background,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.input.borderColour,
      borderRadius: theme.input.borderRadius,
      marginTop: 5,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
    or: { marginHorizontal: 10 },
    enterCodeContainer: {
      marginTop: theme.spacing.small,
      gap: theme.spacing.small,
    },
    dividers: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: theme.spacing.large,
    },
    divider: {
      borderWidth: StyleSheet.hairlineWidth,
      flex: 1,
      borderColor: theme.colours.borderColour,
    },
  });
