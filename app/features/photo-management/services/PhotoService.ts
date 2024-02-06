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
  } catch (error) {
    console.log('Error uploading photo:', error);
  }
}

export async function uploadPhotos(eventId: string, files: string[]) {
  await Promise.allSettled(files.map(file => uploadPhoto(eventId, file)));
  console.log('Finished!');
}

/**
 * Generates photo paths for a folder in storage.
 * @param eventId used for the folder name within the bucket.
 * @param photoIDs an array of photo IDs to generate paths for.
 * @returns an array of photo paths e.g. ['123/456.jpg'].
 */
function generatePhotoPathsForEvent(eventId: string, photoIDs: Array<string>) {
  return photoIDs.map(photoId => `${eventId}/${photoId}.jpg`);
}

/**
 * Gets photos for an event from storage.
 * @param eventId ID of the event to get photos for.
 * @returns an array or signed URLs for all photos for the event.
 */
export async function getEventPhotos(eventId: string) {
  const eventPhotos = await PhotoAPI.getPhotosForEvent(eventId);

  const photoIDs = eventPhotos.map(photo => photo.id);

  const photoPaths = generatePhotoPathsForEvent(eventId, photoIDs);
  const urls = await PhotoAPI.getURLsForEventPhotos(photoPaths);
  return urls.map(url => url.signedUrl);
}
