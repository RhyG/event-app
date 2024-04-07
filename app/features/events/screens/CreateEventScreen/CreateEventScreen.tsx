import I18n from 'i18n-js';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { PasswordInput } from '@feature/onboarding/components/PasswordInput';
import { WelcomeFlowScreen } from '@feature/onboarding/components/WelcomeFlowScreen';

import { ButtonWithLoading } from '@ui/components/ButtonWithLoading';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';

import { DateInput } from './DateInput';
import { useEventCreationForm } from './useEventCreationForm';

export function CreateEventScreen() {
  const {
    submitNewEvent,
    formState: { errors },
    control,
    isCreatingEvent,
  } = useEventCreationForm();

  return (
    <WelcomeFlowScreen heading={I18n.t('createEventScreen.heading')}>
      <VBox gap="medium">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              label={I18n.t('eventCommon.name')}
              placeholder={I18n.t('createEventScreen.nameInputPlaceholder')}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              error={errors.name?.message}
            />
          )}
          name="name"
        />

        <Controller control={control} render={({ field: { onChange } }) => <DateInput onChangeDate={onChange} error={errors.date?.message} />} name="date" />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputWithLabel
              label={I18n.t('eventCommon.description')}
              placeholder={I18n.t('createEventScreen.descriptionInputPlaceholder')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.description?.message}
              inputStyle={styles.descriptionInput}
              multiline
              maxLength={120}
            />
          )}
          name="description"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput onBlur={onBlur} onChangeText={onChange} value={value} error={errors.password?.message} optional />
          )}
          name="password"
        />

        <ButtonWithLoading onPress={submitNewEvent} label={I18n.t('createEventScreen.createEvent')} loading={isCreatingEvent} />
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
