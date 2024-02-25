import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useJoinEvent } from './useJoinEvent';

export function JoinEventScreen({ navigation }: ScreenProp<'JoinEventScreen'>) {
  const { styles, theme } = useThemedStyles(stylesFn);

  const { handleFormChange, submitJoin, eventRequiresPassword, submitJoinWithPassword } = useJoinEvent();

  return (
    <WelcomeFlowScreen heading={I18n.t('joinEventScreen.heading')}>
      <VBox gap="small">
        <InputWithLabel
          label={I18n.t('joinEventScreen.eventCodeInputLabel')}
          placeholder={I18n.t('joinEventScreen.eventCodeInputPlaceholder')}
          onChangeText={val => handleFormChange('code', val)}
        />
        {eventRequiresPassword ? <PasswordInput onChangeText={val => handleFormChange('password', val)} /> : null}
      </VBox>
      <Button
        style={styles.joinEventButton}
        onPress={eventRequiresPassword ? submitJoinWithPassword : submitJoin}
        label={I18n.t('joinEventScreen.joinEvent')}
      />

      <VBox mt="extraLarge" gap="small">
        <Text align="center" colour={theme.colours.textSubdued}>
          {I18n.t('joinEventScreen.scanQrCode')}
        </Text>
        <Button preset="secondary" onPress={() => navigation.navigate('QRCodeScannerScreen')} label={I18n.t('joinEventScreen.openCamera')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    joinEventButton: {
      marginTop: theme.spacing.small,
    },
  });

export const JoinEventScreenName = 'JoinEventScreen' as const;
