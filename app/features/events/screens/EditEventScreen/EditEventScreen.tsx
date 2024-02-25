import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { DateInput } from '../CreateEventScreen/DateInput';
import { useEventCreationForm } from '../CreateEventScreen/useEventCreationForm';
import { useEditEventDetails } from './useEditEventDetails';

export function EditEventScreen({ route }: ScreenProp<typeof EditEventScreenName>) {
  const { id } = route.params;

  const { data } = useEditEventDetails(id);

  const { submitNewEvent, setDetail } = useEventCreationForm();

  if (!data) {
    console.log('No data found for event with id: ', id);
    return null;
  }

  const { event_name, event_description, event_date, eventIsInPast } = data;

  return (
    <WelcomeFlowScreen heading={I18n.t('editEventScreen.heading')}>
      <VBox gap="small">
        <InputWithLabel
          label={I18n.t('createEventScreen.nameInputLabel')}
          placeholder={I18n.t('createEventScreen.nameInputPlaceholder')}
          onChangeText={value => setDetail('name', value)}
          defaultValue={event_name}
        />

        {!eventIsInPast ? <DateInput onChangeDate={value => setDetail('date', value)} defaultDate={event_date} /> : null}
        <InputWithLabel
          label={I18n.t('createEventScreen.descriptionInputLabel')}
          placeholder={I18n.t('createEventScreen.descriptionInputPlaceholder')}
          onChangeText={value => setDetail('description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
          defaultValue={event_description ?? ''}
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
