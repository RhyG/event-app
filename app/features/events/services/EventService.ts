import Clipboard from '@react-native-clipboard/clipboard';

interface EventDetails {
  name: string;
  date: Date;
  description: string | null;
  password: string | null;
}

export function prepareEventData(event: EventDetails, userId: string) {
  const isPrivateEvent = !!event.password && event.password.length > 0;

  const newEvent = {
    event_date: event.date.toISOString(),
    event_description: event.description ?? null,
    event_name: event.name,
    host_id: userId,
    password: event.password ?? null,
    is_private: isPrivateEvent,
  };

  return newEvent;
}

export function copyEventInvite(eventName: string, eventAccessCode: string) {
  const invite = `Share your photos from ${eventName} on CrowdLens by following this link: https://crowdlens.app/event/${eventAccessCode}`;
  Clipboard.setString(invite);
}

export function copyEventAccessCode(eventAccessCode: string) {
  Clipboard.setString(eventAccessCode);
}
