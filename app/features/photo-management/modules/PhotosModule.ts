import { supabase } from '@core/lib/supabase';

/**
 * Facade around whatever stores the images. Created because I see this potentially changing in the future.
 * TODO: Implement this.
 */
export const PhotosModule = {
  async uploadPhoto({ eventId, photoId, file }: { eventId: string; photoId: string; file: ArrayBuffer }) {
    return await supabase.storage.from('photos').upload(`${eventId}/${photoId}.jpg`, file, { contentType: 'image/jpg' });
  },
};
