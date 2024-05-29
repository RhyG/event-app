import { useQuery } from '@tanstack/react-query';

import { getPhoto } from '@core/domains/photo-management/services/PhotoService';

export const eventPreviewQueryKey = (photoURL: string) => ['eventPreview', photoURL] as const;

export function useEventPreviewImageQuery({ photoURL, enabled }: { photoURL: string; enabled: boolean }) {
  return useQuery({
    queryKey: eventPreviewQueryKey(photoURL),
    queryFn: () => getPhoto(photoURL),
    // queryFn: () => PhotoAPI.getSignedUrlForEventPhoto(photoURL),
    enabled,
  });
}
