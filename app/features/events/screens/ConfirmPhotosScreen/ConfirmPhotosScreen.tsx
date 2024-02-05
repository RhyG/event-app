import { Feather } from '@expo/vector-icons';
import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { ScreenProp } from '@app/navigation/types';

import { uploadPhotos } from '@feature/photo-management/services/PhotoService';

import { useHeaderOptions } from '@core/hooks/useHeaderOptions';

import { Screen } from '@ui/components/Screen';

import { Gallery } from '../../components/Gallery';

export function ConfirmPhotosScreen({ route }: ScreenProp<'ConfirmPhotosScreen'>) {
  const { photos, eventId } = route.params;

  const photosToDisplay = useMemo(() => photos.map(photo => photo.uri), [photos]);

  function onPress() {
    // Can't get to this point without at least one photo.
    const photosToUpload = photos.map(photo => photo.base64) as [string, ...string[]]; // This feels like business logic and shouldn't live here.
    uploadPhotos(eventId, photosToUpload);
  }

  useHeaderOptions({
    headerRight: () => (
      <TouchableOpacity onPress={onPress}>
        <Feather name="save" size={24} color="black" />
      </TouchableOpacity>
    ),
  });

  return (
    <Screen>
      <Gallery photos={photosToDisplay} />
    </Screen>
  );
}
