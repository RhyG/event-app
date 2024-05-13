import Clipboard from '@react-native-clipboard/clipboard';

import { useToastContext } from '@core/context/ToastContext';
import { getEventInvite } from '@core/domains/events/services/EventService';

function copyEventInviteToClipboard(eventName: string, eventAccessCode: string) {
  const invite = getEventInvite(eventName, eventAccessCode);
  Clipboard.setString(invite);
}

export function useCopyEventInvite() {
  const { showToast } = useToastContext();

  function copyEventInvite(eventName: string, eventAccessCode: string) {
    copyEventInviteToClipboard(eventName, eventAccessCode);

    showToast({ message: 'Event invite copied to clipboard', type: 'SUCCESS' });
  }

  return copyEventInvite;
}
