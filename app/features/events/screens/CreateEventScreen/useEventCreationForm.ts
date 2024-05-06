import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUserContext } from '@feature/account';

import { createEvent } from '@core/domains/events/services/EventService';
import { queryClient } from '@core/providers/QueryClientProvider';
import { useToastContext } from '@core/providers/ToastProvider';

import { EventScreenName } from '../EventScreen/EventScreen';

const CreateEventSchema = z.object({
  name: z.string(),
  date: z.date(),
  description: z.string().optional(), // TODO - enforce max length
  password: z.string().optional(),
});

type CreateEventForm = z.infer<typeof CreateEventSchema>;

export function useEventCreationForm() {
  const navigation = useNavigation();
  const { showToast } = useToastContext();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const { handleSubmit, ...rest } = useForm<CreateEventForm>({
    resolver: zodResolver(CreateEventSchema),
  });

  const { user } = useUserContext();

  async function _submitNewEvent(eventData: CreateEventForm) {
    try {
      setIsCreatingEvent(true);
      if (!user?.id) {
        return;
      }

      const data = await createEvent(eventData, user?.id);

      queryClient.refetchQueries({ queryKey: ['events'], type: 'active', exact: true });

      navigation.navigate(EventScreenName, { id: data.id, name: data.event_name, shouldPreventBack: true });
    } catch (error) {
      showToast({ message: 'Something went wrong creating the event.', type: 'ERROR' });
    } finally {
      setIsCreatingEvent(false);
    }
  }

  const submitNewEvent = handleSubmit(_submitNewEvent);

  return { submitNewEvent, isCreatingEvent, ...rest };
}
