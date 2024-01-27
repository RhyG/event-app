import { StyleSheet } from 'react-native';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { DateInput } from './DateInput';
import { useEventCreationForm } from './useEventCreationForm';

export function CreateEventScreen() {
  const { styles } = useThemedStyles(stylesFn);

  const { submitNewEvent, setDetail } = useEventCreationForm();

  return (
    <WelcomeFlowScreen heading="Create an Event">
      <VBox gap="small">
        <InputWithLabel label="Name" placeholder="Enter event name" onChangeText={value => setDetail('name', value)} />

        <DateInput onChangeDate={value => setDetail('description', value)} />
        <InputWithLabel
          label="Description (optional)"
          placeholder="Enter event description"
          onChangeText={value => setDetail('description', value)}
          inputStyle={styles.descriptionInput}
          multiline
          maxLength={120}
        />

        <InputWithLabel label="Password (optional)" placeholder="Enter event password" onChangeText={value => setDetail('password', value)} />

        <Button onPress={submitNewEvent} label="Create Event" />
      </VBox>
    </WelcomeFlowScreen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    scanContainer: {
      marginTop: theme.spacing.extraLarge,
    },
    descriptionInput: {
      minHeight: 80,
    },
    dateInput: {
      backgroundColor: theme.input.background,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.input.borderColour,
      borderRadius: theme.input.borderRadius,
      paddingHorizontal: 10,
      paddingVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
