import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { Screens } from '@app/navigation/screens';

import { useToastContext } from '@core/context/ToastContext';
import { eventDetailsQueryKey } from '@core/domains/events/api//queries/query-keys';
import { EventsAPI } from '@core/domains/events/api/EventsAPI';
import { useEventDetailsQuery } from '@core/domains/events/api/queries/useEventQuery';
import { Event } from '@core/domains/events/types';
import { EventById } from '@core/domains/events/types';

export function useEditEventForm(currentDetails: Pick<Event, 'event_name' | 'event_description' | 'event_date'>, eventId: string) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { showToast } = useToastContext();

  const details = useRef<typeof currentDetails>(currentDetails);

  function setDetail(key: keyof typeof details.current, value: string | Date) {
    details.current = { ...details.current, [key]: value };
  }

  async function updateEvent() {
    const { event_name, event_description, event_date } = details.current;

    try {
      await EventsAPI.updateEventDetails(eventId, { event_name, event_description, event_date });

      queryClient.invalidateQueries({ queryKey: eventDetailsQueryKey(eventId) });

      showToast({ type: 'SUCCESS', message: 'Event updated successfully' });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return { setDetail, updateEvent };
}

export function useDeleteEvent(id: string) {
  const navigation = useNavigation();
  const { showToast } = useToastContext();

  const queryClient = useQueryClient();

  return async function () {
    try {
      await EventsAPI.deleteEvent(id);

      queryClient.removeQueries({ queryKey: eventDetailsQueryKey(id) });

      showToast({ type: 'SUCCESS', message: 'Event deleted successfully' });

      navigation.navigate(Screens.HomeScreen);
    } catch (error) {
      console.log(error);
    }
  };
}

function selector(data: EventById) {
  const { event_name, event_description, event_date } = data;

  const eventIsInPast = new Date(event_date) < new Date();

  return {
    event_name,
    event_description,
    event_date,
    eventIsInPast,
  };
}

export function useEditEventDetails(id: string) {
  return useEventDetailsQuery(id, selector);
}
