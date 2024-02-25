import { useQuery } from '@tanstack/react-query';

import { PhotoAPI } from '@feature/photo-management/api/PhotoAPI';

export const eventPreviewQueryKey = (photoURL: string) => ['eventPreview', photoURL] as const;

export function useEventPreviewImageQuery({ photoURL, enabled }: { photoURL: string; enabled: boolean }) {
  return useQuery({
    queryKey: eventPreviewQueryKey(photoURL),
    queryFn: () => PhotoAPI.getSignedUrlForEventPhoto(photoURL),
    enabled,
  });
}
