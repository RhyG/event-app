import { Screens } from '@app/navigation/screens';
import { ScreenProp } from '@app/navigation/types';

import { useEventDetailsQuery, useEventImagesQuery } from '@feature/events/api/useEventQuery';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { useRenderAfterInteractions } from '@core/hooks/useRenderAfterInteractions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

import { Gallery } from '../../components/Gallery';
import { AddPhotosFAB } from './components/AddPhotosFAB';
import { EventSettingsSheet } from './components/EventSettingsSheet';
import { useImagePicker } from './useImagePicker';

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

  const { pickImages } = useImagePicker({
    onSuccess: photos => navigation.navigate(Screens.ConfirmPhotosScreen, { photos, eventId: id }),
  });

  const { data: event, isLoading, isError } = useEventDetailsQuery(id);
  const { data: photos = [] } = useEventImagesQuery(id);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!event) return null;

  return (
    <>
      <Screen>
        <Text>{event.event_description}</Text>
        <Gallery photos={[...photos, ...dummy_images]} />
      </Screen>

      <EventSettingsSheet accessCode={event.access_code} eventName={event.event_name} eventId={event.id} />
      <AddPhotosFAB onPress={pickImages} buttonVisible={true} />
    </>
  );
}

const dummy_images = [
  'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1668376545856-ad0314a8479e?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684629279389-8fc4beb3236f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1668376545856-ad0314a8479e?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1591243315780-978fd00ff9db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1684629279389-8fc4beb3236f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
