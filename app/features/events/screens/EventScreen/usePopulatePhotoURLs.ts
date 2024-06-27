import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { eventPhotosPathsQueryKey } from '@core/domains/events/api/queries/query-keys';
import { PhotoAPI } from '@core/domains/photo-management/api/PhotoAPI';

/**
 * Used to fetch all the photo urls for an event and populate the query cache with them.
 * @param eventId
 */
export function usePopulatePhotoURLs(eventId: string) {
  const queryClient = useQueryClient();

  useEffect(function fetchPhotoStoragePaths() {
    (async function () {
      const photos = await PhotoAPI.getPhotosForEvent(eventId).catch(error => {
        console.log('Error fetching photos for event:', error);
      });

      if (photos) {
        const urls = photos.map(photo => photo.storage_url);

        if (urls) {
          queryClient.setQueryData(eventPhotosPathsQueryKey(eventId), urls);
        }
      }
    })();
  }, []);
}
