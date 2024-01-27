import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import { Screens } from '@app/navigation/screens';

import { prepareEventData } from '@feature/events/services/EventService';
import { useUserContext } from '@feature/user';

import { queryClient } from '@core/providers/QueryClientProvider';

import { EventsAPI } from '../../api/EventsAPI';

interface FormFields {
  name: string | null;
  date: Date | null;
  description: string | null;
  password: string | null;
}

export function useEventCreationForm() {
  const navigation = useNavigation();

  const { user } = useUserContext();

  const details = useRef<FormFields>({
    name: null,
    date: null,
    description: null,
    password: null,
  });

  function setDetail(key: keyof typeof details.current, value: string | Date) {
    details.current = { ...details.current, [key]: value };
  }

  async function submitNewEvent() {
    const event = details.current;

    const { name, date, ...rest } = event;

    // TODO: Properly validate fields
    if (!name || !date || !user?.id) {
      return;
    }

    const newEvent = prepareEventData({ name, date, ...rest }, user.id);

    try {
      const data = await EventsAPI.createEvent(newEvent);

      if (!data) throw new Error('Event creation failed');

      queryClient.refetchQueries({ queryKey: ['events'], type: 'active', exact: true });

      navigation.navigate(Screens.EventScreen, { id: data.id, name: data.event_name, shouldPreventBack: true });
    } catch (error) {
      console.log(error);
    }
  }

  return { submitNewEvent, setDetail };
}
