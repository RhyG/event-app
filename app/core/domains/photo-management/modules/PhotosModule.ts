import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

import { S3Client } from '@core/lib/aws';
import { supabase } from '@core/lib/supabase';

/**
 * Facade around whatever stores the images. Created because I see this potentially changing in the future.
 * TODO: Implement this.
 */
export const PhotosModule = {
  async uploadPhoto({ eventId, photoId, file }: { eventId: string; photoId: string; file: ArrayBuffer }) {
    return await supabase.storage.from('photos').upload(`${eventId}/${photoId}.jpg`, file, { contentType: 'image/jpg' });
  },
  async uploadFile(photoId: string, eventId: string, file: Blob) {
    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: 'event-app-photos',
        Key: `${eventId}/${photoId}.jpeg`,
        Body: file,
        ContentType: 'image/jpeg',
      };

      const res = await S3Client.send(new PutObjectCommand(uploadParams));
      console.log({ res });
    } catch (error) {
      console.log('Error uploading to S3:', error);
    }
  },
};
