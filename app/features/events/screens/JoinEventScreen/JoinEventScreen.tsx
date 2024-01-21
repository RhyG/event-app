import { StyleSheet, TextInput, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

export function JoinEventScreen({ navigation }: ScreenProp<'JoinEventScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.palette.grey['50'] },
  });

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
          <Text size="xs">Event Code</Text>
          <TextInput placeholder="Enter event code" style={styles.input} />
          <Button style={styles.joinEventButton} onPress={() => console.log('')} label="Join Event" />
        </View>

        <View style={styles.scanContainer}>
          <Text align="center" colour={theme.colours.textSubdued}>
            Or scan a QR code
          </Text>
          <Button preset="secondary" onPress={() => navigation.navigate(Screens.QRCodeScannerScreen)} style={styles.openCameraButton} label="Open Camera" />
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
    openCameraButton: {
      width: '100%',
      marginTop: 10,
    },
    joinEventButton: {
      marginTop: 10,
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
    scanContainer: {
      marginTop: theme.spacing.extraLarge,
    },
    enterCodeContainer: {
      marginTop: theme.spacing.small,
    },
  });
