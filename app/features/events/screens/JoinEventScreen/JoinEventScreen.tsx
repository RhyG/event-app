import { StyleSheet, View } from 'react-native';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Text } from '@ui/components/Text';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useJoinEvent } from './useJoinEvent';

export function JoinEventScreen({ navigation }: ScreenProp<'JoinEventScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.secondaryBackground },
  });

  const { handleFormChange, submitJoin, eventRequiresPassword, submitJoinWithPassword } = useJoinEvent();

  return (
    <WelcomeFlowScreen heading="Join an Event">
      <View>
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
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    joinEventButton: {
      marginTop: theme.spacing.small,
    },
    scanContainer: {
      marginTop: theme.spacing.extraLarge,
      gap: theme.spacing.small,
    },
  });
