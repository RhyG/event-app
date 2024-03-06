import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createEvent } from '@feature/events/services/EventService';
import { useUserContext } from '@feature/user';

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

  const { handleSubmit, ...rest } = useForm<CreateEventForm>({
    resolver: zodResolver(CreateEventSchema),
  });

  const { user } = useUserContext();

  async function _submitNewEvent(eventData: CreateEventForm) {
    if (!user?.id) {
      return;
    }

    try {
      const data = await createEvent(eventData, user?.id);

      queryClient.refetchQueries({ queryKey: ['events'], type: 'active', exact: true });

      navigation.navigate(EventScreenName, { id: data.id, name: data.event_name, shouldPreventBack: true });
    } catch (error) {
      showToast({ message: 'Something went wrong creating the event.', type: 'ERROR' });
    }
  }

  const submitNewEvent = handleSubmit(_submitNewEvent);

  return { submitNewEvent, ...rest };
}
