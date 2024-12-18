import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ScreenProp } from '@app/navigation/types';

import { PhotoFile } from '@core/domains/photo-management/types';
import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';
import { Text } from '@ui/components/Text';
import { useTheme } from '@ui/hooks/useTheme';

import { Gallery } from '../../components/Gallery/Gallery';
import { useUploadPhotos } from './useUploadPhotos';

export function ConfirmPhotosScreen({ route, navigation }: ScreenProp<typeof ConfirmPhotosScreenName>) {
  const { photos, eventId } = route.params;
  const numberOfPhotos = photos.length;

  const theme = useTheme();

  const [uploading, setUploading] = useState(false);

  const photosToDisplay = useMemo(() => photos.map(photo => photo.uri), [photos]);

  const uploadPhotos = useUploadPhotos(eventId, photos);

  async function onPress() {
    setUploading(true);
    await uploadPhotos();
    setUploading(false);
    navigation.goBack();
  }

  useHeaderOptions({
    headerTitle: `Uploading ${numberOfPhotos} photo${numberOfPhotos > 1 ? 's' : ''}`,
    headerRight: () => (
      <TouchableOpacity onPress={onPress} accessibilityRole="button">
        {/* TODO: Update to match platform header buttons */}
        <Text colour={theme.colours.palette.sky['700']} size="lg">
          Done
        </Text>
      </TouchableOpacity>
    ),
  });

  return (
    <>
      <Screen>
        <Gallery photos={photosToDisplay} onImagePress={() => {}} />
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

export const ConfirmPhotosScreenName = 'ConfirmPhotosScreen' as const;
export type ConfirmPhotosScreenParams = { photos: Array<PhotoFile>; eventId: string };
