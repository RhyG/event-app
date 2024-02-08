import { decode } from 'base64-arraybuffer';
import { atob } from 'react-native-quick-base64';

import { PhotoAPI } from '../api/PhotoAPI';

export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function encodeToBase64() {}

export function decodeFromBase64(base64Image: string) {
  return decode(base64Image);
}

export async function fetchImageFromUri(uri: string) {
  const response = await fetch(uri);
  const buffer = await response.arrayBuffer();
  return buffer;
}

export async function uploadPhoto(eventId: string, file: string) {
  const start = performance.now();
  try {
    const savedPhoto = await PhotoAPI.savePhotoDetails(eventId);

    if (!savedPhoto) {
      console.log('Failed to save photo details');
      return;
    }

    const toSave = decodeFromBase64(file);

    if (!(toSave.byteLength > 0)) {
      console.error('ArrayBuffer is null');
      return;
    }

    const response = await PhotoAPI.uploadPhoto({ eventId, photoId: savedPhoto.id, file: toSave });

    void PhotoAPI.savePhotoStorageURL(response.data.path, savedPhoto.id);
    const end = performance.now();
    console.log('Uploaded photo in', `${end - start}ms`);
  } catch (error) {
    console.log('Error uploading photo:', error);
  }
}

export async function uploadPhotos(eventId: string, files: string[]) {
  await Promise.allSettled(files.map(file => uploadPhoto(eventId, file)));
  console.log('Finished!');
}

/**
 * Gets photos for an event from storage.
 * @param eventId ID of the event to get photos for.
 * @returns an array or signed URLs for all photos for the event.
 */
export async function getEventPhotos(eventId: string) {
  const eventPhotos = await PhotoAPI.getPhotosForEvent(eventId);

  const promises = eventPhotos.map(photo => PhotoAPI.getSignedUrlsForEventPhotos(photo.storage_url, { height: 200 }));

  const photos = (await Promise.allSettled(promises)).filter(photo => photo.status === 'fulfilled');

  // @ts-expect-error this works fine but TS thinks value isn't a valid property.
  return photos.map(photo => photo.value.signedUrl);
}
