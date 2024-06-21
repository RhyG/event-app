import { HeaderBackButton } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import { ScrollView, StyleSheet } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { useEventPreviewImageQuery } from '@feature/events/api/useEventPreviewQuery';
import { useEventDetailsQuery, useEventPhotosQuery } from '@feature/events/api/useEventQuery';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { useRenderAfterInteractions } from '@core/hooks/useRenderAfterInteractions';
import { formatTimestamp } from '@core/lib/date';

import { Text } from '@ui/components/Text';
import { HBox, VBox } from '@ui/components/layout/Box';
import { theme } from '@ui/theme/theme';

import { Gallery } from '../../components/Gallery/Gallery';
import { ConfirmPhotosScreenName } from '../ConfirmPhotosScreen/ConfirmPhotosScreen';
import { PhotoCarouselScreenName } from '../PhotoCarouselScreen/PhotoCarouselScreen';
import { AddPhotosFAB } from './components/AddPhotosFAB';
import { EventScreenHeader } from './components/EventScreenHeader';
import { EventSettingsSheet } from './components/EventSettingsSheet';
import { EventTags } from './components/EventTags';
import { ShareButton } from './components/ShareButton';
import { useImagePicker } from './useImagePicker';
import { usePopulatePhotoURLs } from './usePopulatePhotoURLs';

function InterimStateWrapper({ text }: { text: string }) {
  return (
    <VBox flex={1} justifyContent="center" alignItems="center">
      <Text>{text}</Text>
    </VBox>
  );
}

export function EventScreen(props: ScreenProp<typeof EventScreenName>) {
  const { shouldPreventBack } = props.route.params;

  // When coming straight from creating an event the user should not be able to go back.
  useHeaderOptions({
    title: '',
    ...(shouldPreventBack ? { headerBackVisible: false, gestureEnabled: false } : {}),
    headerTransparent: true,
    headerBackground: () => <BlurView tint="dark" intensity={10} style={[StyleSheet.absoluteFill]} />,
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: () => <HeaderBackButton tintColor="white" accessibilityLabel="back button" labelVisible={false} onPress={() => props.navigation.goBack()} />,
  });

  const shouldRender = useRenderAfterInteractions();

  return shouldRender ? <_EventScreen {...props} /> : null;
}

export function _EventScreen({ route, navigation }: ScreenProp<typeof EventScreenName>) {
  const { id } = route.params;

  usePopulatePhotoURLs(id);

  const { pickImages } = useImagePicker({
    onSuccess: photos => navigation.navigate(ConfirmPhotosScreenName, { photos, eventId: id }),
  });

  const { data: event, isLoading, isError } = useEventDetailsQuery(id);
  const { data: photos = [] } = useEventPhotosQuery(id);

  const { data: signedUrl } = useEventPreviewImageQuery({
    photoURL: event?.preview_url ?? '',
    enabled: !!event,
  });

  function onImagePress(index: number) {
    navigation.navigate(PhotoCarouselScreenName, { initialIndex: index, eventId: id });
  }

  if (isLoading) {
    return <InterimStateWrapper text="Loading" />;
  }

  if (isError) {
    return <InterimStateWrapper text="Error" />;
  }

  if (!event) return null;

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {signedUrl ? <EventScreenHeader previewImage={signedUrl} photoCount={photos.length} /> : null}

        <VBox ph="small" mt="base" gap="small">
          <HBox justifyContent="space-between" alignItems="center">
            <VBox>
              <Text preset="heading">{event.event_name}</Text>
              <Text colour={theme.colours.textSubdued}>{formatTimestamp(event.event_date)}</Text>
              {!!event.event_description ? <Text>{event.event_description}</Text> : null}
            </VBox>

            <ShareButton eventAccessCode={event.access_code} eventName={event.event_name} />
          </HBox>

          <EventTags eventId={id} />

          <Gallery photos={photos} onImagePress={onImagePress} />
        </VBox>
      </ScrollView>

      <EventSettingsSheet accessCode={event.access_code} eventName={event.event_name} eventId={event.id} />
      <AddPhotosFAB onPress={pickImages} buttonVisible={true} />
    </>
  );
}

export const EventScreenName = 'EventScreen' as const;
export type EventScreenParams = { id: string; name: string; shouldPreventBack?: boolean };
