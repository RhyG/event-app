import { createClient } from '@supabase/supabase-js';
import { PutObjectCommand, S3Client } from 'https://deno.land/x/aws_api/client_s3/mod.ts';

const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY');
const S3_BUCKET_NAME = '<Your-S3-Bucket-Name>';
const AWS_REGION = '<Your-AWS-Region>';

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

Deno.serve(async req => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded.', { status: 400 });
  }

  const fileStream = file.stream();

  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: file.name, // TODO: Update to match `eventId/photoId` naming convention
    Body: fileStream,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));

    return new Response(JSON.stringify({ message: 'File uploaded successfully.' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('S3 upload error:', error);
    return new Response(JSON.stringify({ message: 'Failed to upload file.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});
