import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EventsAPI } from '@feature/events/api/EventsAPI';

import { useToastContext } from '@core/providers/ToastProvider';

import { EventScreenName } from '../EventScreen/EventScreen';

const JoinEventSchema = z.object({
  code: z.string(),
  password: z.string().optional(),
});

type JoinEventFormValues = z.infer<typeof JoinEventSchema>;

export function useJoinEventForm() {
  const navigation = useNavigation();
  const { showToast } = useToastContext();

  const [eventRequiresPassword, setEventRequiresPassword] = useState(false);

  const { handleSubmit, ...rest } = useForm<JoinEventFormValues>({
    resolver: zodResolver(JoinEventSchema),
  });

  function navigateToEvent(id: string, name: string) {
    navigation.navigate(EventScreenName, { id, name, shouldPreventBack: true });
  }

  async function _submitJoin({ code }: JoinEventFormValues) {
    const eventData = await EventsAPI.getJoinDetails(code);

    if (!eventData) {
      showToast({ message: 'Event not found', type: 'ERROR' });
      return;
    }

    if (eventData.is_private) {
      setEventRequiresPassword(true);
      return;
    }

    navigateToEvent(eventData.id, eventData.event_name);
  }

  async function _submitJoinWithPassword({ code, password }: JoinEventFormValues) {
    if (!password) return;

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

  const submitJoinWithPassword = handleSubmit(_submitJoinWithPassword);
  const submitJoin = handleSubmit(_submitJoin);

  return {
    submitJoin,
    submitJoinWithPassword,
    eventRequiresPassword,
    ...rest,
  };
}
