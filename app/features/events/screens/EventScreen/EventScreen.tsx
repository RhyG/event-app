import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { useEventDetailsQuery, useEventPhotosQuery } from '@feature/events/api/useEventQuery';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { useRenderAfterInteractions } from '@core/hooks/useRenderAfterInteractions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

import { Gallery } from '../../components/Gallery';
import { AddPhotosFAB } from './components/AddPhotosFAB';
import { EventSettingsSheet } from './components/EventSettingsSheet';
import { useImagePicker } from './useImagePicker';
import { usePopulatePhotoURLs } from './usePopulatePhotoURLs';

export function EventScreen(props: ScreenProp<'EventScreen'>) {
  const { name, shouldPreventBack } = props.route.params;

  // When coming straight from creating an event the user should not be able to go back.
  useHeaderOptions({
    title: name,
    ...(shouldPreventBack ? { headerBackVisible: false, gestureEnabled: false } : {}),
  });

  const shouldRender = useRenderAfterInteractions();

  return shouldRender ? <_EventScreen {...props} /> : null;
}

export function _EventScreen({ route, navigation }: ScreenProp<'EventScreen'>) {
  const { id } = route.params;

  usePopulatePhotoURLs(id);

  const { pickImages } = useImagePicker({
    onSuccess: photos => navigation.navigate(Screens.ConfirmPhotosScreen, { photos, eventId: id }),
  });

  const { data: event, isLoading, isError } = useEventDetailsQuery(id);
  const { data: photos = [] } = useEventPhotosQuery(id);

  function onImagePress(index: number) {
    navigation.navigate(Screens.PhotoCarouselScreen, { initialIndex: index, eventId: id });
  }

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!event) return null;

  return (
    <>
      <Screen scrollViewProps={{ contentContainerStyle: { flex: 1 } }}>
        <Text>{event.event_description}</Text>
        <Gallery photos={photos} onImagePress={onImagePress} />
      </Screen>

      <EventSettingsSheet accessCode={event.access_code} eventName={event.event_name} eventId={event.id} />
      <AddPhotosFAB onPress={pickImages} buttonVisible={true} />
    </>
  );
}
