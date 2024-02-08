import { decode } from 'base64-arraybuffer';

import { PhotoAPI } from '../api/PhotoAPI';
import { PhotoFile } from '../types';

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
  console.log('Uploading');
  try {
    const savedPhoto = await PhotoAPI.savePhotoDetails(eventId);
    console.log('Saved');

    if (!savedPhoto) {
      console.log('Failed to save photo details');
      return;
    }

    const toSave = decodeFromBase64(file);

    if (!(toSave.byteLength > 0)) {
      throw new Error('ArrayBuffer is null');
    }

    console.log('Uploading');
    const { data, error } = await PhotoAPI.uploadPhoto({ eventId, photoId: savedPhoto.id, file: toSave });
    console.log('Uploaded');

    if (error) throw error;

    void PhotoAPI.savePhotoStorageURL(data.path, savedPhoto.id);

    const end = performance.now();
    console.log('Finished upload in', `${end - start}ms`);

    return await PhotoAPI.getSignedUrlForEventPhoto(data.path, { height: 200 });
  } catch (error) {
    console.log('Error uploading photo:', error);
    throw error;
  }
}

export async function uploadPhotos(eventId: string, files: PhotoFile[]) {
  const uploaded = await Promise.allSettled(files.map(file => uploadPhoto(eventId, file.base64)));

  return uploaded
    .filter((response): response is PromiseFulfilledResult<{ signedUrl: string }> => response.status === 'fulfilled')
    .map(response => response.value.signedUrl);
}

/**
 * Gets photos for an event from storage.
 * @param eventId ID of the event to get photos for.
 * @returns an array or signed URLs for all photos for the event.
 */
export async function getEventPhotos(eventId: string): Promise<string[]> {
  const eventPhotos = await PhotoAPI.getPhotosForEvent(eventId);

  const promises = eventPhotos.map(photo => PhotoAPI.getSignedUrlForEventPhoto(photo.storage_url, { height: 200 }));

  const photos = (await Promise.allSettled(promises)).filter((photo): photo is PromiseFulfilledResult<{ signedUrl: string }> => photo.status === 'fulfilled');

  return photos.map(photo => photo.value.signedUrl);
}
