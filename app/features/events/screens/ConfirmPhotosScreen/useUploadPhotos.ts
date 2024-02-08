import { useQueryClient } from '@tanstack/react-query';

import { eventPhotosQueryKey } from '@feature/events/api/useEventQuery';
import { uploadPhotos } from '@feature/photo-management/services/PhotoService';
import { PhotoFile } from '@feature/photo-management/types';

export function useUploadPhotos(eventId: string, photos: PhotoFile[]) {
  const queryClient = useQueryClient();

  return async function () {
    const uploadedPhotos = await uploadPhotos(eventId, photos);

    queryClient.setQueriesData({ queryKey: eventPhotosQueryKey(eventId) }, (previous: string[] | undefined) => [...uploadedPhotos, ...(previous ?? [])]);
  };
}
