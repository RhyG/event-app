import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import { Screens } from '@app/navigation/screens';

import { useUserContext } from '@feature/user';

import EventsAPI from '../../api/EventsAPI';

// Temp for testing purposes
function getFutureTimestampTz(): string {
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const year = threeDaysLater.getUTCFullYear();
  const month = String(threeDaysLater.getUTCMonth() + 1).padStart(2, '0');
  const day = String(threeDaysLater.getUTCDate()).padStart(2, '0');
  const hours = String(threeDaysLater.getUTCHours()).padStart(2, '0');
  const minutes = String(threeDaysLater.getUTCMinutes()).padStart(2, '0');
  const seconds = String(threeDaysLater.getUTCSeconds()).padStart(2, '0');
  const timezoneOffset = -threeDaysLater.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const offsetSign = timezoneOffset > 0 ? '+' : '-';

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

interface FormFields {
  name: string | null;
  date: string | null;
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

  function setDetail(key: keyof typeof details.current, value: string) {
    details.current = { ...details.current, [key]: value };
  }

  async function submitNewEvent() {
    const event = details.current;

    // TODO: Properly validate fields
    if (!event.name || !event.date || !user?.id) {
      return;
    }

    const isPrivateEvent = !!event.password && event.password.length > 0;

    const newEvent = {
      event_date: getFutureTimestampTz(),
      event_description: event.description ?? null,
      event_name: event.name,
      host_id: user.id,
      password: event.password ?? null,
      is_private: isPrivateEvent,
    };

    try {
      const data = await EventsAPI.createEvent(newEvent);

      if (!data) throw new Error('Event creation failed');

      navigation.navigate(Screens.EventScreen, { id: data.id, name: data.event_name, shouldPreventBack: true });
    } catch (error) {
      console.log(error);
    }
  }

  return { submitNewEvent, setDetail };
}
