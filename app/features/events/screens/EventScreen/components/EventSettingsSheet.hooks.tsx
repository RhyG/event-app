import Clipboard from '@react-native-clipboard/clipboard';

import { getEventInvite } from '@feature/events/services/EventService';

import { useToastContext } from '@core/providers/ToastProvider';

function copyEventInviteToClipboard(eventName: string, eventAccessCode: string) {
  const invite = getEventInvite(eventName, eventAccessCode);
  Clipboard.setString(invite);
}

function copyEventAccessCodeToClipboard(eventAccessCode: string) {
  Clipboard.setString(eventAccessCode);
}

export function useEventSettingsSheet(closeSheet: () => void) {
  const { showToast } = useToastContext();

  function copyEventInvite(eventName: string, eventAccessCode: string) {
    copyEventInviteToClipboard(eventName, eventAccessCode);
    closeSheet();

    showToast({ message: 'Event invite copied to clipboard', type: 'SUCCESS' });
  }

  function copyEventAccessCode(eventAccessCode: string) {
    copyEventAccessCodeToClipboard(eventAccessCode);
    closeSheet();

    showToast({ message: 'Event access code copied to clipboard', type: 'SUCCESS' });
  }

  return { copyEventInvite, copyEventAccessCode };
}
