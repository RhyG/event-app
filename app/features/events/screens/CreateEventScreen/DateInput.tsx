import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Text } from '@ui/components/Text';
import { VBox } from '@ui/components/layout/Box';
import { Theme } from '@ui/theme';
import { useThemedStyles } from '@ui/theme/useThemedStyles';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

// Date input styled to look like the regular text input component (almost bang on but can't be stuffed at the moment)
// TODO: Be stuffed to get it ridgy didge
export function DateInput({ defaultDate, onChangeDate }: { defaultDate: string; onChangeDate: (date: Date) => void }) {
  const { styles, theme } = useThemedStyles(stylesFn);

  const [date, setDate] = useState<Date | undefined>(() => (defaultDate ? new Date(defaultDate) : undefined));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    onChangeDate(date);
    hideDatePicker();
  };

  const value = date ? formatDate(date) : undefined;

  return (
    <VBox gap="tiny">
      <Text preset="formLabel">Date</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
        <Text colour={date ? theme.colours.textPrimary : '#c8c8c8'} style={{ fontSize: 13 }}>
          {value ?? 'Select a date'}
        </Text>
        <Feather name="calendar" size={20} color={theme.icon.primaryColour} style={{ marginLeft: 'auto' }} />
      </TouchableOpacity>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker} display="inline" />
    </VBox>
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
