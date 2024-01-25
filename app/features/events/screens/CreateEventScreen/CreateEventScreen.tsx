import { StyleSheet } from 'react-native';

import { WelcomeFlowScreen } from '@feature/auth/components/WelcomeFlowScreen';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

import { useEventCreationForm } from './useEventCreationForm';

export function CreateEventScreen() {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.palette.grey['50'] },
  });

  const { submitNewEvent, setDetail } = useEventCreationForm();

  return (
    <WelcomeFlowScreen heading="Create an Event">
      <VBox gap="small">
        <InputWithLabel label="Name" placeholder="Enter event name" onChangeText={value => setDetail('name', value)} />

        <InputWithLabel label="Date" placeholder="Pick a date" onChangeText={value => setDetail('date', value)} />

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
  });
