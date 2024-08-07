import { useQueryClient } from '@tanstack/react-query';

import { eventPhotosQueryKey } from '@core/domains/events/api/queries/query-keys';
import { _uploadPhoto } from '@core/domains/photo-management/services/PhotoService';
import { PhotoFile } from '@core/domains/photo-management/types';

export function useUploadPhotos(eventId: string, photos: PhotoFile[]) {
  const queryClient = useQueryClient();

  return async function () {
    await _uploadPhoto(eventId, photos[0]!.uri!);

    // queryClient.setQueriesData({ queryKey: eventPhotosQueryKey(eventId) }, (previous: string[] | undefined) => [...uploadedPhotos, ...(previous ?? [])]);
  };
  // return async function () {
  //   const uploadedPhotos = await uploadPhotos(eventId, photos);

  //   queryClient.setQueriesData({ queryKey: eventPhotosQueryKey(eventId) }, (previous: string[] | undefined) => [...uploadedPhotos, ...(previous ?? [])]);
  // };
}
