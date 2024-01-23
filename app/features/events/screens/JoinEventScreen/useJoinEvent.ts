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

    navigation.navigate(Screens.EventScreen, { id: eventData.id, name: eventData.event_name });
  }

  async function submitJoinWithPassword() {
    const { code, password } = formValues.current;

    try {
      const eventData = await EventsAPI.authenticateEventPassword(code, password);
      navigation.navigate(Screens.EventScreen, { id: eventData.id, name: eventData.event_name });
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        // TODO - Handle incorrect password.
        return;
      } else {
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
