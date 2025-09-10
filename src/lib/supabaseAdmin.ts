import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // you can use NEXT_PUBLIC or SUPABASE_URL env
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);
