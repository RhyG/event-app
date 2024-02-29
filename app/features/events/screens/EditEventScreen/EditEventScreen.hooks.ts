import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { EventsAPI } from '@feature/events/api/EventsAPI';
import { eventDetailsQueryKey } from '@feature/events/api/query-keys';
import { Event } from '@feature/events/types';

export function useEditEventForm(currentDetails: Pick<Event, 'event_name' | 'event_description' | 'event_date'>, eventId: string) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const details = useRef<typeof currentDetails>(currentDetails);

  function setDetail(key: keyof typeof details.current, value: string | Date) {
    details.current = { ...details.current, [key]: value };
  }

  async function updateEvent() {
    const { event_name, event_description, event_date } = details.current;

    try {
      await EventsAPI.updateEventDetails(eventId, { event_name, event_description, event_date });

      queryClient.invalidateQueries({ queryKey: eventDetailsQueryKey(eventId) });

      // TODO: Show success toast here.
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return { setDetail, updateEvent };
}
