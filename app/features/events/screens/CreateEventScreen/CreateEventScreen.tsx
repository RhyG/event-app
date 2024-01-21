import { StyleSheet, View } from 'react-native';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Button } from '@ui/components/Button';
import { InputWithLabel } from '@ui/components/InputWithLabel';
import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useThemedStyles } from '@ui/hooks/useThemedStyles';
import { Theme } from '@ui/theme';

import { useEventCreationForm } from './useEventCreationForm';

export function CreateEventScreen() {
  const { styles, theme } = useThemedStyles(stylesFn);

  useHeaderOptions({
    headerTitle: '',
    headerStyle: { backgroundColor: theme.colours.palette.grey['50'] },
  });

  const { submitNewEvent, setDetail } = useEventCreationForm();

  return (
    <Screen backgroundColor={theme.colours.palette.grey['50']} preset="fixed">
      <View style={styles.container}>
        <View>
          <Text preset="heading" align="center" style={styles.heading}>
            Create an Event
          </Text>
        </View>

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

        <Button style={styles.joinEventButton} onPress={submitNewEvent} label="Create Event" />
      </View>
    </Screen>
  );
}

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 160,
      gap: theme.spacing.medium,
    },
    openCameraButton: {
      width: '100%',
      marginTop: 10,
    },
    joinEventButton: {
      marginTop: 10,
    },
    input: {
      padding: theme.input.padding,
      backgroundColor: theme.input.background,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.input.borderColour,
      borderRadius: theme.input.borderRadius,
      marginTop: 5,
    },
    heading: {
      marginBottom: theme.spacing.medium,
    },
    scanContainer: {
      marginTop: theme.spacing.extraLarge,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    descriptionInput: { minHeight: 80 },
  });
