import { decode } from 'base64-arraybuffer';

import { PhotoAPI } from '../api/PhotoAPI';
import { PhotosModule } from '../modules/PhotosModule';
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
  console.log('Saving initial details');
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

    if (error) {
      console.log('Upload error', error);
      throw error;
    }

    console.log('Uploaded');

    void PhotoAPI.savePhotoStorageURL(data.path, savedPhoto.id);

    const end = performance.now();
    console.log('Finished upload in', `${end - start}ms`);

    const test = await PhotoAPI.getSignedUrlForEventPhoto(data.path, { height: 200 });
    return test;
  } catch (error) {
    console.log('Error uploading photo:', error);
    throw error;
  }
}

export async function _uploadPhoto(eventId: string, file: string) {
  try {
    const savedPhoto = await PhotoAPI.savePhotoDetails(eventId);

    if (!savedPhoto) {
      console.log('Failed to save photo details');
      return;
    }

    const response = await fetch(file);
    const blob = await response.blob();

    await PhotosModule.uploadFile(savedPhoto.id, eventId, blob);
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
  const uploaded = await Promise.allSettled(files.map(file => uploadPhoto(eventId, file.uri)));

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
    // const data = await PhotoAPI.getSignedUrlForEventPhoto(url);

    // Temporary because I keep maxing out free tier for Supabase storage egress limits in dev.
    return getRandomPlaceholderPhoto();
    // return data.signedUrl;
  } catch (error) {
    console.log(`Error getting photo for ${url}:`, error);
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

  // const promises = eventPhotos.map(photo => PhotoAPI.getSignedUrlForEventPhoto(photo.storage_url, { height: 200 }));

  // const photos = (await Promise.allSettled(promises)).filter((photo): photo is PromiseFulfilledResult<{ signedUrl: string }> => photo.status === 'fulfilled');

  return [...new Set(placeholder_photos)];
  // return photos.map(photo => photo.value.signedUrl);
}

function getEightRandomPhotos() {
  let randomPhotos = [];
  for (let i = 0; i < 11; i++) {
    randomPhotos.push(getRandomPlaceholderPhoto());
  }
  return randomPhotos;
}

function getRandomPlaceholderPhoto(): string {
  const randomIndex = Math.floor(Math.random() * placeholder_photos.length);
  return placeholder_photos[randomIndex]!;
}

const placeholder_photos = [
  'https://plus.unsplash.com/premium_photo-1666184130709-f3709060899a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682681906306-357b0ec8bc06?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543168256-8133cc8e3ee4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682295740507-305c16980a02?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1501238295340-c810d3c156d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1687826541778-3f2bf4c03bc3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1568006818649-e888e736fc1c?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1698529232838-bf2cc8bd35ff?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1543191219-92c8ed3d8cfd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
