import I18n from 'i18n-js';
import { Controller } from 'react-hook-form';

import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { useTheme } from '@ui/hooks/useTheme';

import { useJoinEventForm } from './JoinEventScreen.hooks';

export function JoinEventScreen({ navigation }: ScreenProp<typeof JoinEventScreenName>) {
  const theme = useTheme();

  const {
    control,
    submitJoin,
    submitJoinWithPassword,
    eventRequiresPassword,
    formState: { errors },
  } = useJoinEventForm();

  return (
    <WelcomeFlowScreen heading={I18n.t('joinEventScreen.heading')}>
      <VBox gap="medium">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              label={I18n.t('joinEventScreen.eventCodeInputLabel')}
              placeholder={I18n.t('joinEventScreen.eventCodeInputPlaceholder')}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              error={errors.code?.message}
            />
          )}
          name="code"
        />
        {eventRequiresPassword ? (
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput onBlur={onBlur} onChangeText={onChange} value={value} error={errors.password?.message} />
            )}
            name="password"
          />
        ) : null}
        <Button onPress={eventRequiresPassword ? submitJoinWithPassword : submitJoin} label={I18n.t('joinEventScreen.joinEvent')} />
      </VBox>

      <VBox mt="extraLarge" gap="small">
        <Text align="center" colour={theme.colours.textSubdued}>
          {I18n.t('joinEventScreen.scanQrCode')}
        </Text>
        <Button preset="outlined" onPress={() => navigation.navigate(Screens.QRCodeScannerScreen)} label={I18n.t('joinEventScreen.openCamera')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

export const JoinEventScreenName = 'JoinEventScreen' as const;
