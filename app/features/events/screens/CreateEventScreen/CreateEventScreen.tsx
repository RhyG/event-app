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
    <WelcomeFlowScreen heading="Create an Event">
      <VBox gap="small">
        <InputWithLabel label="Name" placeholder="Enter event name" onChangeText={value => setDetail('name', value)} />

        <DateInput onChangeDate={value => setDetail('date', value)} />
        <InputWithLabel
          label="Description (optional)"
          placeholder="Enter event description"
          onChangeText={value => setDetail('description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
        />

        <PasswordInput onChangeText={value => setDetail('password', value)} optional />

        <Button onPress={submitNewEvent} label="Create Event" />
      </VBox>
    </WelcomeFlowScreen>
  );
}

const styles = StyleSheet.create({
  descriptionInput: {
    minHeight: 80,
  },
});
