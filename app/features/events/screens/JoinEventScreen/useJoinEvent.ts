import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';

import { Screens } from '@app/navigation/screens';

import { EventsAPI } from '@feature/events/api/EventsAPI';

interface FormValues {
  code: string;
  password: string;
}

export function useJoinEvent() {
  const navigation = useNavigation();

  const [eventRequiresPassword, setEventRequiresPassword] = useState(false);

  const formValues = useRef<FormValues>({
    code: '',
    password: '',
  });

  function navigateToEvent(id: string, name: string) {
    navigation.navigate(Screens.EventScreen, { id, name, shouldPreventBack: true });
  }

  function handleFormChange(key: keyof typeof formValues.current, value: string) {
    formValues.current = { ...formValues.current, [key]: value };
  }

  async function submitJoin() {
    const eventData = await EventsAPI.getJoinDetails(formValues.current.code);

    // TODO - Handle event not existing, maybe with a toast or something.
    if (!eventData) return;

    if (eventData.is_private) {
      setEventRequiresPassword(true);
      return;
    }

    navigateToEvent(eventData.id, eventData.event_name);
  }

  async function submitJoinWithPassword() {
    const { code, password } = formValues.current;

    try {
      const eventData = await EventsAPI.authenticateEventPassword(code, password);
      navigateToEvent(eventData.id, eventData.event_name);
    } catch (error) {
      if (error === 'Incorrect password') {
        // TODO - Handle incorrect password.
        console.log('Incorrect password');
        return;
      } else {
        console.log('Unknown error');
        // TODO - Handle other errors.
        return;
      }
    }
  }

  return {
    handleFormChange,
    submitJoin,
    submitJoinWithPassword,
    eventRequiresPassword,
  };
}
