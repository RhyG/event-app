import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generates the access code for an event.
function generateRandomCode(): string {
  const codeLength = 10;
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  let result = '';

  const charactersLength = characters.length;

  for (let i = 0; i < codeLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function hashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization')!;

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header passed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { Authorization: authHeader } },
    });

    const { event } = await req.json();

    /**
     * Ensures event access codes are unique by creating one, checking if it exists, and trying again if it does.
     * Probably not optimal but keeps codes relatively simple.
     */
    let unique = false;
    let accessCode = '';
    while (!unique) {
      accessCode = generateRandomCode();
      const { data, error } = await supabaseClient.from('Events').select('access_code').eq('access_code', accessCode);
      if (error) {
        throw new Error('Error checking code uniqueness');
      }
      unique = data.length === 0;
    }

    event.access_code = accessCode;

    if (event.is_private && event.password) {
      const pass = await hashPassword(event.password);
      event.password = pass;
    }

    const { data, error } = await supabaseClient.from('Events').insert([event]).select('event_date,id,event_description,event_name,host_id,access_code');

    if (error) throw error;

    const newEvent = data[0];

    if (!newEvent) {
      return new Response(JSON.stringify({ error: 'Error getting new event details' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    console.log('Creating bucket', newEvent.id);

    const { data: bucketData, error: bucketError } = await supabaseClient.storage.createBucket(newEvent.id, { public: false });

    if (bucketError) console.log('Bucket error:', bucketError);

    console.log('Bucket data:', bucketData);

    return new Response(JSON.stringify(newEvent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-event' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
// Deno.serve(async req => {
//   const { name } = await req.json();
//   const data = {
//     message: `Hello ${name}!`,
//   };

//   return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
// });
