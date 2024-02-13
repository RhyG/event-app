import { decode } from 'base64-arraybuffer';

import { PhotoAPI } from '../api/PhotoAPI';
import { PhotoFile } from '../types';

export function decodeFromBase64(base64Image: string) {
  return decode(base64Image);
}

/**
 * Takes a Base64 string and uploads it to the event.
 * @param eventId ID of the event to upload the photo to.
 * @param file a Base64 string for the photo to upload.
 * @returns a signed URL for the image.
 */
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

/**
 * Iterates over an array of photo files and uploads them to the event.
 * @param eventId ID of the event to upload photos to.
 * @param files an array of URI & Base64 strings for the photos to upload.
 * @returns an array of signed URLs to the uploaded photos.
 */
export async function uploadPhotos(eventId: string, files: PhotoFile[]) {
  const uploaded = await Promise.allSettled(files.map(file => uploadPhoto(eventId, file.base64)));

  return uploaded
    .filter((response): response is PromiseFulfilledResult<{ signedUrl: string }> => response.status === 'fulfilled')
    .map(response => response.value.signedUrl);
}

/**
 * Gets a single photo with a path.
 * @param url the URL of the photo to get.
 * @returns signed URL for the photo.
 */
export async function getPhoto(url: string) {
  try {
    const data = await PhotoAPI.getSignedUrlForEventPhoto(url);
    return data.signedUrl;
  } catch (error) {
    console.log('Error getting photo:', error);
    return;
  }
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
