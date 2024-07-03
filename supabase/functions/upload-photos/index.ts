import { createClient } from '@supabase/supabase-js';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from 'npm:@aws-sdk/client-s3';

const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY');
const S3_BUCKET_NAME = 'event-app-photos';
const AWS_REGION = 'ap-southeast-2';

Deno.serve(async req => {
  console.log('Request received:', { req, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY });
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header passed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { Authorization: authHeader } },
    });

    const { eventId } = await req.json();

    const { data, error } = await supabaseClient
      .from('Photos')
      .insert([{ event_id: eventId }])
      .select('id');

    if (error) {
      return new Response(JSON.stringify({ error: 'Failed to save photo details.' }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    return new Response('AWS credentials not found.', { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file uploaded.', { status: 400 });
  }

  const fileStream = file.stream();

  const { eventId, photoId } = await req.json();

  const uploadParams: PutObjectCommandInput = {
    Bucket: S3_BUCKET_NAME,
    Key: `${eventId}/${photoId}.jpeg`,
    Body: fileStream,
    ContentType: 'image/jpeg',
  };

  try {
    const config = {
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      region: AWS_REGION,
    };

    const client = new S3Client(config);

    await client.send(new PutObjectCommand(uploadParams));

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
