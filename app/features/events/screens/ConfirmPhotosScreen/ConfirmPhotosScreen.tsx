import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ScreenProp } from '@app/navigation/types';

import { eventImagesQueryKey } from '@feature/events/api/useEventQuery';
import { uploadPhotos } from '@feature/photo-management/services/PhotoService';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';
import { queryClient } from '@core/providers/QueryClientProvider';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';

import { Gallery } from '../../components/Gallery';

export function ConfirmPhotosScreen({ route, navigation }: ScreenProp<'ConfirmPhotosScreen'>) {
  const { photos, eventId } = route.params;
  const numberOfPhotos = photos.length;

  useHeaderOptions({
    headerTitle: `Uploading ${numberOfPhotos} photo${numberOfPhotos > 1 ? 's' : ''}`,
  });

  const [uploading, setUploading] = useState(false);

  const photosToDisplay = useMemo(() => photos.map(photo => photo.uri), [photos]);

  async function onPress() {
    setUploading(true);
    // Can't get to this point without at least one photo.
    const photosToUpload = photos.map(photo => photo.base64) as [string, ...string[]]; // This feels like business logic and shouldn't live here.
    await uploadPhotos(eventId, photosToUpload);

    queryClient.invalidateQueries({ queryKey: eventImagesQueryKey(eventId) });
    setUploading(false);
    navigation.goBack();
  }

  useHeaderOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onPress}>
        <Feather name="save" size={24} color="black" />
      </TouchableOpacity>
    ),
  });

  return (
    <>
      <Screen>
        <Gallery photos={photosToDisplay} />
      </Screen>
      {uploading ? <LoadingCover /> : null}
    </>
  );
}

function LoadingCover() {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(function fadeInComponent() {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle, { backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      <Text>LOADING</Text>
    </Animated.View>
  );
}
