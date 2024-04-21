const S3_BUCKET_NAME = 'event-app-photos';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async req => {
  const { id } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'No id passed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: id,
    Expires: 60,
  };

  try {
    return new Response(JSON.stringify({}), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
