import { createClient } from '@supabase/supabase-js';

// Reemplaza estas variables una vez que tengas tu cuenta en Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'TU_SUPABASE_URL_AQUI';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
