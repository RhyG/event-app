import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { PasswordInput } from '@feature/auth/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { DateInput } from './DateInput';
import { useEventCreationForm } from './useEventCreationForm';

export function CreateEventScreen() {
  const { submitNewEvent, setDetail } = useEventCreationForm();

  return (
    <WelcomeFlowScreen heading={I18n.t('createEventScreen.heading')}>
      <VBox gap="small">
        <InputWithLabel
          label={I18n.t('createEventScreen.nameInputLabel')}
          placeholder={I18n.t('createEventScreen.nameInputPlaceholder')}
          onChangeText={value => setDetail('name', value)}
        />

        <DateInput onChangeDate={value => setDetail('date', value)} />
        <InputWithLabel
          label={I18n.t('createEventScreen.descriptionInputLabel')}
          placeholder={I18n.t('createEventScreen.descriptionInputPlaceholder')}
          onChangeText={value => setDetail('description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
        />

        <PasswordInput onChangeText={value => setDetail('password', value)} optional />

        <Button onPress={submitNewEvent} label={I18n.t('createEventScreen.createEvent')} />
      </VBox>
    </WelcomeFlowScreen>
  );
}

const styles = StyleSheet.create({
  descriptionInput: {
    minHeight: 80,
  },
});

export const CreateEventScreenName = 'CreateEventScreen' as const;
