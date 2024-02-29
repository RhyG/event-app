import I18n from 'i18n-js';
import { StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { DateInput } from '../CreateEventScreen/DateInput';
import { useEditEventForm } from './EditEventScreen.hooks';
import { useEditEventDetails } from './useEditEventDetails';

export function EditEventScreen({ route }: ScreenProp<typeof EditEventScreenName>) {
  const { id } = route.params;

  const { data } = useEditEventDetails(id);

  // TODO: Narrow in hook, but we can safely assume data is defined.
  const { setDetail, updateEvent } = useEditEventForm(data!, id);

  if (!data) {
    return null;
  }

  const { event_name, event_description, event_date, eventIsInPast } = data;

  return (
    <WelcomeFlowScreen heading={'Edit ' + data.event_name}>
      <VBox gap="small">
        <InputWithLabel
          label={I18n.t('eventCommon.name')}
          placeholder={I18n.t('createEventScreen.nameInputPlaceholder')}
          onChangeText={value => setDetail('event_name', value)}
          defaultValue={event_name}
        />

        {!eventIsInPast ? <DateInput onChangeDate={value => setDetail('event_date', value)} defaultDate={event_date} /> : null}
        <InputWithLabel
          label={I18n.t('eventCommon.description')}
          placeholder={I18n.t('createEventScreen.descriptionInputPlaceholder')}
          onChangeText={value => setDetail('event_description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
          defaultValue={event_description ?? ''}
        />

        {/* TODO: Allow for changing event passwords - probably post V1 */}
        {/* <PasswordInput onChangeText={value => setDetail('password', value)} optional /> */}

        <Button onPress={updateEvent} label={I18n.t('editEventScreen.updateButton')} />
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
export type EditEventScreenParams = { id: string };
