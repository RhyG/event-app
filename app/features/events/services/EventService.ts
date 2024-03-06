import { EventsAPI } from '../api/EventsAPI';

interface EventDetails {
  name: string;
  date: Date;
  description?: string;
  password?: string;
}

/**
 * Transforms the event data into the format expected by the API.
 * @param eventData the event details.
 * @param userId
 * @returns event formatted for the API.
 */
export function prepareEventData(eventData: EventDetails, userId: string) {
  const isPrivateEvent = !!eventData.password && eventData.password.length > 0;

  const newEvent = {
    event_date: eventData.date.toISOString(),
    event_description: eventData.description ?? null,
    event_name: eventData.name,
    host_id: userId,
    password: eventData.password ?? null,
    is_private: isPrivateEvent,
  };

  return newEvent;
}

/**
 * Creates a new event by calling the API.
 * @param eventData the event details.
 * @param userId
 * @returns the event created by the API.
 */
export async function createEvent(eventData: EventDetails, userId: string) {
  const newEvent = prepareEventData(eventData, userId);

  try {
    const data = await EventsAPI.createEvent(newEvent);

    if (!data) throw new Error();

    return data;
  } catch (error) {
    throw new Error('Something went wrong creating the event.');
  }
}

/**
 * Gets the invite message for the event.
 * @param eventName name of the event
 * @param eventAccessCode access code for the event
 * @returns the invite message.
 */
export function getEventInvite(eventName: string, eventAccessCode: string) {
  return `Share your photos from ${eventName} on CrowdLens by following this link: https://crowdlens.app/event/${eventAccessCode}`;
}
