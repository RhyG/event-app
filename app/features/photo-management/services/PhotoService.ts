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
  // console.log(base64Image.includes('base64,'));
  const base64Str = base64Image.includes('base64,') ? base64Image.substring(base64Image.indexOf('base64,') + 'base64,'.length) : base64Image;
  return decode(base64Str);
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
      console.error('[uploadToSupabase] ArrayBuffer is null');
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
