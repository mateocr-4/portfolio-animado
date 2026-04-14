import { createClient } from '@supabase/supabase-js';

// SECURITY: Never use fallback strings for credentials.
// If these env vars are missing the app must fail loudly, not expose keys in the bundle.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[Security] Missing Supabase environment variables. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local and in Vercel Dashboard → Settings → Environment Variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
