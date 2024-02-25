import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { useEventDetailsQuery } from '@feature/events/api/useEventQuery';
import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { DateInput } from '../CreateEventScreen/DateInput';
import { useEventCreationForm } from '../CreateEventScreen/useEventCreationForm';
import { usePromptBeforeBack } from './usePromptBeforeBack';

export function EditEventScreen({ route }: ScreenProp<typeof EditEventScreenName>) {
  const { id } = route.params;

  const { data } = useEventDetailsQuery(id);

  const { submitNewEvent, setDetail } = useEventCreationForm();

  if (!data) {
    console.log('No data found for event with id: ', id);
    return null;
  }

  return (
    <WelcomeFlowScreen heading={I18n.t('editEventScreen.heading')}>
      <VBox gap="small">
        <InputWithLabel
          label={I18n.t('createEventScreen.nameInputLabel')}
          placeholder={I18n.t('createEventScreen.nameInputPlaceholder')}
          onChangeText={value => setDetail('name', value)}
          defaultValue={data.event_name}
        />

        <DateInput onChangeDate={value => setDetail('date', value)} defaultDate={data.event_date} />
        <InputWithLabel
          label={I18n.t('createEventScreen.descriptionInputLabel')}
          placeholder={I18n.t('createEventScreen.descriptionInputPlaceholder')}
          onChangeText={value => setDetail('description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
          defaultValue={data.event_description ?? ''}
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

export const EditEventScreenName = 'EditEventScreen' as const;
