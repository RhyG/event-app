import { supabase } from '@core/lib/supabase';

import { PhotosModule } from '../modules/PhotosModule';

export const PhotoAPI = {
  async uploadPhoto({ eventId, photoId, file }: { eventId: string; photoId: string; file: ArrayBuffer }) {
    const response = await PhotosModule.uploadPhoto({ eventId, photoId, file });

    if (response.error) {
      console.log(response.error);
      throw new Error('Upload failed');
    }

    return response;
  },
  async savePhotoDetails(eventId: string) {
    const { data, error } = await supabase
      .from('Photos')
      .insert([{ event_id: eventId }])
      .select('id');

    if (error) throw error;

    return data[0];
  },
  async savePhotoStorageURL(url: string, id: string) {
    const { data, error } = await supabase.from('Photos').update({ storage_url: url }).eq('id', id).select();

    if (error) throw error;

    return data[0];
  },
  async getPhotosForEvent(eventId: string) {
    const { data, error } = await supabase.from('Photos').select('id,storage_url').eq('event_id', eventId);

    if (error) throw error;

    return data as { id: string; storage_url: string }[];
  },
  async downloadPhoto(path: string) {
    const { data, error } = await supabase.storage.from('photos').download(path);

    if (error) throw error;

    return data;
  },
  async getURLsForEventPhotos(paths: Array<string>) {
    const { data, error } = await supabase.storage.from('photos').createSignedUrls(paths, 60);

    if (error) {
      throw error;
    }

    return data;
  },
};
