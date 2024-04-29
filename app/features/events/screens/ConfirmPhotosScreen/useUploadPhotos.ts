import { useQueryClient } from '@tanstack/react-query';

import { eventPhotosQueryKey } from '@feature/events/api/query-keys';
import { PhotosModule } from '@feature/photo-management/modules/PhotosModule';
import { uploadPhotoToS3, uploadPhotos } from '@feature/photo-management/services/PhotoService';
import { PhotoFile } from '@feature/photo-management/types';

export function useUploadPhotos(eventId: string, photos: PhotoFile[]) {
  const queryClient = useQueryClient();

  return async function () {
    // const uploadedPhotos = await uploadPhotoToS3(eventId, photos[0]?.uri!);
    await PhotosModule.uploadFile(eventId, photos[0]?.uri);

    // queryClient.setQueriesData({ queryKey: eventPhotosQueryKey(eventId) }, (previous: string[] | undefined) => [...uploadedPhotos, ...(previous ?? [])]);
  };
  // return async function () {
  //   const uploadedPhotos = await uploadPhotos(eventId, photos);

  //   queryClient.setQueriesData({ queryKey: eventPhotosQueryKey(eventId) }, (previous: string[] | undefined) => [...uploadedPhotos, ...(previous ?? [])]);
  // };
}
