import { formatTimestamp, isToday } from '@core/lib/date';

import { useEventPreviewImageQuery } from '../api/useEventPreviewQuery';
import { Event } from '../types';

export function useEventCard(preview_url: Event['preview_url'], event_date: string) {
  const { data } = useEventPreviewImageQuery({ photoURL: preview_url, enabled: !!preview_url });
  const previewImage = { signedUrl: data };

  return {
    previewImage,
    formattedDate: isToday(event_date) ? 'Today' : formatTimestamp(event_date),
  } as const;
}
