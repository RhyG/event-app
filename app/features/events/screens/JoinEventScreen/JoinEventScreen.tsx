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

import { useJoinEvent } from './useJoinEvent';

export function JoinEventScreen({ navigation }: ScreenProp<'JoinEventScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.palette.grey['50'] },
  });

  const { handleFormChange, submitJoin, eventRequiresPassword, submitJoinWithPassword } = useJoinEvent();

  return (
    <Screen backgroundColor={theme.colours.palette.grey['50']} preset="fixed">
      <View style={styles.container}>
        <View>
          <Text preset="heading" align="center" style={styles.heading}>
            Join an Event
          </Text>
          <Text align="center" colour={theme.colours.textSubdued}>
            Enter an event code or scan a QR code to join an event.
          </Text>
        </View>

        <View style={styles.enterCodeContainer}>
          <InputWithLabel label="Event Code" placeholder="Enter event code" onChangeText={val => handleFormChange('code', val)} />
          {eventRequiresPassword ? (
            <InputWithLabel label="Event Password" placeholder="Enter event password" onChangeText={val => handleFormChange('password', val)} />
          ) : null}
          <Button style={styles.joinEventButton} onPress={eventRequiresPassword ? submitJoinWithPassword : submitJoin} label="Join Event" />
        </View>

        <View style={styles.scanContainer}>
          <Text align="center" colour={theme.colours.textSubdued}>
            Or scan a QR code
          </Text>
          <Button preset="secondary" onPress={() => navigation.navigate(Screens.QRCodeScannerScreen)} label="Open Camera" />
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
    joinEventButton: {
      marginTop: theme.spacing.small,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
    scanContainer: {
      marginTop: theme.spacing.extraLarge,
      gap: theme.spacing.small,
    },
    enterCodeContainer: {
      marginTop: theme.spacing.small,
    },
  });
