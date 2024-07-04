import { supabase } from '@core/lib/supabase';

export const PhotoAPI = {
  async uploadPhoto({ eventId, photoId, file }: { eventId: string; photoId: string; file: ArrayBuffer }) {
    const response = await supabase.storage.from('photos').upload(`${eventId}/${photoId}.jpg`, file, { contentType: 'image/jpg' });

    if (response.error) {
      console.log('Error in PhotoAPI upload:', response.error);
      throw new Error('Upload failed');
    }

    return response;
  },
  async uploadPhotoToS3(formData: FormData) {
    const { data, error } = await supabase.functions.invoke('upload-photos', {
      body: formData,
    });

    if (error) {
      console.log('ERROR UPLOADING TO S3:', error);
      throw error;
    }

    return data;
  },
  async savePhotoDetails(eventId: string) {
    const { data, error } = await supabase
      .from('Photos')
      .insert([{ event_id: eventId }])
      .select('id');

    if (error) {
      console.log('Error saving photo details:', error);
      throw error;
    }

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
    const { data, error } = await supabase.storage.from('photos').createSignedUrls(paths, 86400);

    if (error) {
      throw error;
    }

    return data;
  },
  async getSignedUrlForEventPhoto(path: string, transform?: { height?: number; width?: number }) {
    const { data, error } = await supabase.storage.from('photos').createSignedUrl(path, 86400, { transform });

    if (error) {
      throw error;
    }

    return data;
  },
};
