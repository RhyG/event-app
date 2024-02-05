import { supabase } from '@core/lib/supabase';

import { PhotosModule } from '../modules/PhotosModule';

export const PhotoAPI = {
  async uploadPhoto({ eventId, photoId, file }: { eventId: string; photoId: string; file: ArrayBuffer }) {
    const response = await PhotosModule.uploadPhoto({ eventId, photoId, file });
    console.log('Upload response', response);
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
};
