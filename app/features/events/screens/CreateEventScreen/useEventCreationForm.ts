import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { prepareEventData } from '@feature/events/services/EventService';
import { useUserContext } from '@feature/user';

import { queryClient } from '@core/providers/QueryClientProvider';
import { useToastContext } from '@core/providers/ToastProvider';

import { EventsAPI } from '../../api/EventsAPI';
import { EventScreenName } from '../EventScreen/EventScreen';

const CreateEventSchema = z.object({
  name: z.string(),
  date: z.date(),
  description: z.string().optional(),
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

  async function _submitNewEvent({ name, date, ...rest }: CreateEventForm) {
    if (!user?.id) {
      return;
    }

    const newEvent = prepareEventData({ name, date, ...rest }, user.id);

    try {
      const data = await EventsAPI.createEvent(newEvent);

      if (!data) throw new Error();

      queryClient.refetchQueries({ queryKey: ['events'], type: 'active', exact: true });

      navigation.navigate(EventScreenName, { id: data.id, name: data.event_name, shouldPreventBack: true });
    } catch (error) {
      showToast({ message: 'Something went wrong creating the event.', type: 'ERROR' });
    }
  }

  const submitNewEvent = handleSubmit(_submitNewEvent);

  return { submitNewEvent, ...rest };
}
